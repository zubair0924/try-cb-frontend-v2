import unittest, time, datetime, requests, random, hashlib, re

BASE_URL = "http://localhost:8080/api/"

class TestTravelSample(unittest.TestCase):
    def setUp(self):
        self.testUser = "test::" + str(time.time())
        password = "password" + str(random.randint(100,999))
        h = hashlib.md5()
        h.update(bytes(password, 'latin1'))
        self.pw_hash = h.hexdigest();

    def test_register(self):
        # Check the user doesn't already exist
        response = requests.post(BASE_URL + "user/login", json={
            'user': self.testUser,
            'password': self.pw_hash
        })

        self.assertEqual(response.status_code, 401, "Wrong status code for login to non-existent user")
        self.assertIn('failure', response.json(), "Failed login did not return 'failure' message")

        # Create the user
        response = requests.post(BASE_URL + "user/signup", json={
            'user': self.testUser,
            'password': self.pw_hash
        })
        
        self.assertTrue(response.status_code // 100 == 2, "Signup request failed")
        self.assertTrue('data' in response.json() and 'token' in response.json()['data'])
        self.assertIsNotNone(response.json()['data']['token'], "Token was not returned")

        # Check we can now log in as the user
        response = requests.post(BASE_URL + "user/login", json={
            'user': self.testUser,
            'password': self.pw_hash
        })

        self.assertEqual(response.status_code, 200, "Login to new user failed")
        self.assertIsNotNone(response.json()['data']['token'], "Token was not returned")

        # Check we can't overwrite the existing user
        response = requests.post(BASE_URL + "user/signup", json={
            'user': self.testUser,
            'password': self.pw_hash
        })
        
        self.assertEqual(response.status_code, 409, "Conflict not prevented - wrong status code")
        self.assertIn('failure', response.json(), "Failure message was not present")

    def _searchAirports(self, query):
        return requests.get(BASE_URL + "airports?search=" + query)

    def test_airport_text_title(self):
        response = self._searchAirports("Manch")
        self.assertIn('data', response.json(), "Data attribute is missing from response")
        self.assertEqual(len(response.json()['data']), 3, "Wrong number of results searching for 'Manch'")
    
    def test_airport_text_lower(self):
        response = self._searchAirports("manch")
        self.assertIn('data', response.json(), "Data attribute is missing from response")
        self.assertEqual(len(response.json()['data']), 3, "Wrong number of results searching for 'manch'")

    def test_airport_icao_upper(self):
        response = self._searchAirports("EGLL")
        self.assertIn('data', response.json(), "Data attribute is missing from response")
        self.assertGreater(len(response.json()['data']), 0, "No results were returned for search 'EGLL'")
        self.assertEqual(response.json()['data'][0]['airportname'], 'Heathrow', 
            "'EGLL' iaco code doesn't return Heathrow as first result")

    def test_airport_icao_lower(self):
        response = self._searchAirports("egll")
        self.assertIn('data', response.json(), "Data attribute is missing from response")
        self.assertGreater(len(response.json()['data']), 0, "No results were returned for search 'egll'")
        self.assertEqual(response.json()['data'][0]['airportname'], 'Heathrow', 
            "'egll' iaco code doesn't return Heathrow as first result")

    def test_airport_faa_upper(self):
        response = self._searchAirports("MAN")
        self.assertIn('data', response.json(), "Data attribute is missing from response")
        self.assertGreater(len(response.json()['data']), 0, "No results were returned for search 'MAN'")
        self.assertEqual(response.json()['data'][0]['airportname'], 'Manchester', "'MAN' faa code doesn't return manchester as first result")

    def test_airport_faa_lower(self):
        response = self._searchAirports("man")
        self.assertIn('data', response.json(), "Data attribute is missing from response")
        self.assertGreater(len(response.json()['data']), 0, "No results were returned for search 'man'")
        self.assertEqual(response.json()['data'][0]['airportname'], 'Manchester', "'man' faa code doesn't return manchester as first result")

    def _searchFlights(self, src, dst, date):
        return requests.get(BASE_URL + "flightPaths/{}/{}?leave={}".format(src, dst, date))

    def test_search_flights(self):
        response = self._searchFlights("Manchester","Heathrow","08/08/2020")
        self.assertEqual(response.status_code, 200, "Flights search failed")
        flights = response.json()['data']
        self.assertGreater(len(flights), 0, "No flights were returned for route MAN -> LHR")
        # TODO: add more assertions

CONSISTENT_FIELDS = ['name','flight','sourceairport','destinationairport','price']
TESTFLIGHT = {
    'name': "Test Flights",
    'flight': "TS123",
    'sourceairport': "MAN",
    'destinationairport': 'LHR',
    'price': 123.45,
    'utc': None
}

class TestTravelSampleAuthenticated(unittest.TestCase):
    def setUp(self):
        response = requests.post(BASE_URL + "user/login", json = {
            'user': 'tester',
            'password': 'cc03e747a6afbbcbf8be7668acfebee5' # hash of test123
        })
        self.token = response.json()['data']['token']

    def test_book_flight(self):
        _time = datetime.datetime.now().strftime("%H:%M:%S")
        TESTFLIGHT['utc'] = _time
        response = requests.post(BASE_URL + "user/tester/flights",
            headers = {
                "Authorization" : "Bearer " + self.token
            },
            json = {"flights" : [TESTFLIGHT]}
        )
        self.assertEqual(response.status_code, 200, "Flight booking failed")
        booked = response.json()["data"]["added"][0]
        self.assertTrue(all(TESTFLIGHT[k] == booked[k] for k in CONSISTENT_FIELDS))
    
    def test_view_flight(self):
        response = requests.get(BASE_URL + "user/tester/flights",
            headers = {
                "Authorization" : "Bearer " + self.token
            }
        )
        booked = response.json()["data"]
        self.assertTrue(any(flight["name"] == "Test Flights" for flight in booked))

class TestTravelSampleHotels(unittest.TestCase):
    def setUp(self):
        pass

    def _checkLoc(self, hotel, loc):
        return any(loc.lower() in hotel[field].lower() for field in ['address', 'city', 'country', 'state'])
    
    def _checkTerm(self, hotel, term):
        return any(term.lower() in hotel[field].lower() for field in ['description', 'name'])
    
    def test_location(self):
        response = requests.get(BASE_URL + "hotel/*/London/")
        self.assertEqual(response.status_code, 200, "Hotel Search Failed")
        hotels = response.json()["data"]
        self.assertTrue(all(self._checkLoc(hotel, "london") for hotel in hotels), "Not all results matched location query")

    def test_search_term(self):
        response = requests.get(BASE_URL + "hotel/Spacious/*/")
        self.assertEqual(response.status_code, 200, "Hotel Search Failed")
        hotels = response.json()["data"]
        self.assertTrue(all(self._checkTerm(hotel, "spacious") for hotel in hotels), "Not all results matched search term query")


    def test_both(self):
        response = requests.get(BASE_URL + "hotel/Spacious/London/")
        self.assertEqual(response.status_code, 200, "Hotel Search Failed")
        hotels = response.json()["data"]
        self.assertTrue(all(self._checkLoc(hotel, "london") for hotel in hotels), "Not all results matched location query")
        self.assertTrue(all(self._checkTerm(hotel, "spacious") for hotel in hotels), "Not all results matched search term query")
    
    def test_neither(self):
        response = requests.get(BASE_URL + "hotel/*/*/")
        self.assertEqual(response.status_code, 200, "Hotel Search Failed")
        hotels = response.json()["data"]
        self.assertGreater(len(hotels), 0, "Got no results for match any search")

if __name__ == '__main__':
    unittest.main()

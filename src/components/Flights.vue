<template>
  <div class="container flights">
    <div class="row mt-3">
      <!-- Flight from location -->
      <div class="input-group col-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">From</span>
        </div>
        <input v-model="from_airport"
               @input="from_update"
               type="text"
               list="from_airports"
               class="form-control"
               placeholder="E.g. San Francisco Intl, SFO"
               aria-describedby="basic-addon1">
        <!-- Dynamic autocompletions from couchbase query -->
        <datalist id="from_airports">
          <option v-for="(airport, index) in from_suggest" :key="index" :value="airport">
            <!-- Force a match for 3 or 4 letter searches - these are airport codes not text matches -->
            {{ isAirportCode(from_airport) ? from_airport.toUpperCase() : '' }}
          </option>
        </datalist>
      </div>
      <!-- Flight to destination -->
      <div class="input-group col-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon2">To</span>
        </div>
        <input v-model="to_airport"
               @input="to_update"
               type="text"
               list="to_airports"
               class="form-control"
               placeholder="E.g. Los Angeles Intl, LAX"
               aria-describedby="basic-addon2">
        <!-- Dynamic autocompletions from couchbase query -->
        <datalist id="to_airports">
          <option v-for="(airport, index) in to_suggest" :key="index" :value="airport">
            <!-- Force a match for 3 or 4 letter searches - these are airport codes not text matches -->
            {{ isAirportCode(to_airport) ? to_airport.toUpperCase() : '' }}
          </option>
        </datalist>
      </div>
    </div>

    <div class="row mt-3">
      <!-- Flight leave date -->
      <div class="input-group col-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Leave</span>
        </div>
        <input id="leave" v-model="leave_date" type="date" class="form-control" aria-describedby="basic-addon1">
      </div>
      <!-- Flight return date -->
      <div class="input-group col-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Return</span>
        </div>
        <input id="return" v-model="return_date" type="date" class="form-control" aria-describedby="basic-addon1">
      </div>
    </div>

    <div class="row mt-3">
      <!-- Search Button -->
      <div class="col">
        <p class="text-danger" :class="{'d-none': !!$attrs.user.token}">You must log in to be able to book flights!</p>
      </div>
      <div class="col">
        <b-button class="float-right" variant="primary" @click="search_flights">Search</b-button>
      </div>
    </div>

    <!-- Results -->
    <h3>Outbound Flights</h3>
    <b-table class="mt-3" :items="out_results" :fields="fields">
      <!-- Composite field to show flightpath as one item -->
      <template v-slot:cell(flightpath)="data">
        {{data.item.sourceairport}} -> {{data.item.destinationairport}}
      </template>
      <!-- Embed HTML in the table row for book buttons -->
      <template v-slot:cell(actions)="row">
        <button class="btn btn-primary btn-sm mr-3"
                @click="addToCart(row.index, out_results, 'outBtn-' + row.index)"
                :disabled="!$attrs.user.token || isInCart('outBtn-' + row.index)">
          <strong>Add to cart</strong>
        </button>
      </template>
    </b-table>

    <h3>Returning Flights</h3>
    <b-table class="mt-3" :items="in_results" :fields="fields">
      <!-- Composite field to show flightpath as one item -->
      <template v-slot:cell(flightpath)="data">
        {{data.item.sourceairport}} -> {{data.item.destinationairport}}
      </template>
      <!-- Embed HTML in the table row for book buttons -->
      <template v-slot:cell(actions)="row">
        <button class="btn btn-primary btn-sm mr-3"
                @click="addToCart(row.index, in_results, 'rtnBtn-' + row.index)"
                :disabled="!$attrs.user.token || isInCart('rtnBtn-' + row.index)">
          <strong>Add to cart</strong>
        </button>
      </template>
    </b-table>

  </div>
</template>

<script>

let from_suggest = []
let to_suggest = []
let out_results = []
let in_results = []

// Gets all airports matching the user input and puts them in the supplied autocompletion section
function getAirports(fromTo, resultList, vm){
  let query = vm[fromTo]
  resultList.length = 0
  if(query == ""){
    return
  }
  vm.API.callShared('GET', `airports?search=${ query }`)
    .then(response => {
      // Emit an event to log the request's context to the context component
      vm.$emit('logCtx',[`Searched for airports matching "${query}"`, ...response.data.context])

      // Unless the search term has already changed...
      if (vm[fromTo] != query) return

      // Replace the content of the supplied list with the result
      resultList.length = 0
      let results = response.data.data.slice(0,10);
      results.map(r => resultList.push(r.airportname))
    })
    .catch(err => {})
}

// Converts from ISO date from the HTML input to US date used by the internal API
function US_date(ISO_Date){
  let parts = ISO_Date.split("-")
  let year = parts.shift()
  parts.push(year)
  return parts.join("/")
}

// Gets displays search results
function searchFlights(from, to, leave, rturn, vm) {
  out_results.length = 0
  in_results.length = 0
  vm.booked.length = 0
  console.log(vm.booked)
  // If there's a leave date, query the API for flights
  if (!leave) return

  vm.API.callShared('GET', `flightPaths/${ from }/${ to }?leave=${ US_date(leave)}`)
    .then(response => {
      // Add the date to all the flights
      let flights = response.data.data
      flights.forEach((v,i,l) => l[i].date = US_date(leave))
      out_results.push(...flights)
      // Emit an event to log the request's context to the context component
      vm.$emit('logCtx',["Queried for outbound flights", ...response.data.context])
    })

  // If there's also a return date, query the API again for return flights
  if(!rturn) return

  vm.API.callShared('GET', `flightPaths/${ to }/${ from }?leave=${ US_date(rturn) }`)
    .then(response => {
      let flights = response.data.data
      flights.forEach((v,i,l) => l[i].date = US_date(rturn))
      in_results.push(...flights)
      // Emit an event to log the request's context to the context component
      vm.$emit('logCtx', ["Queried for inbound flights", ...response.data.context])
    })
}

export default {
  name: "flights",
  inject: ['API'],
  data() {
    return {
      // Text input values
      from_airport : '',
      to_airport : '',
      leave_date: '',
      return_date: '',
      // Airport search autocompletions
      from_suggest,
      to_suggest,
      // Outbound and return flight results
      out_results,
      in_results,
      // User booked flights
      booked: [],
      // Fields for results tables
      fields: ["name", "flight", "utc", "flightpath", "price", "actions"]
    }
  },
  methods: {
    // Updates search autocompletions for the from input
    from_update: function() {
      getAirports("from_airport", this.from_suggest, this)
    },
    // Updates search autocompletions for the to input
    to_update: function() {
      getAirports("to_airport", this.to_suggest, this)
    },
    // Gets and displays the search results
    search_flights: function() {
      searchFlights(this.from_airport, this.to_airport, this.leave_date, this.return_date, this)
    },
    addToCart: function(index, list, ref) {
      let flight = list[index]
      this.$attrs.cart.push(flight)
      this.booked.push(ref)
      console.log(this.booked)
      this.$emit('logCtx', ["Added flight to cart", "Frontend data managed by Vue"])
    },
    isInCart: function(classRef) {
      return this.booked.indexOf(classRef) > -1
    },
    isAirportCode: function(term) {
      // Checks only format, not if a code has an associated airport
      return (term.toLowerCase() == term || term.toUpperCase() == term) && (term.length == 3 || term.length == 4)
    }
  }
}
</script>
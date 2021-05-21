# try-cb-frontend-v2

This is a sample application for getting started with Couchbase Server and our SDKs.
The application runs a single page web UI for demonstrating SQL for Documents (N1QL), Sub-document requests and Full Text Search (FTS) querying capabilities. y
It uses Couchbase Server together with a server backend using one of our SDKs, and Vue and Bootstrap on the front end.

The application is a flight planner that allows the user to search for and select a flight route (including the return flight) based on airports and dates. Airport selection is done dynamically using an angular autocomplete box bound to N1QL queries on the server side. After selecting a date, it then searches for applicable air flight routes from a previously populated database. An additional page allows users to search for Hotels using less structured keywords.

## How to run

### Quickstart: via backend

We recommend running from the perspective of one of the backends: this will build the backend code,
couchbase database, and the frontend.
The following backends are currently available, we intend to provide one for each SDK:

 * [Python](https://github.com/couchbaselabs/try-cb-python/)

 ### Build with docker

Alternatively, if you're interested in modifying the frontend code, with
[Docker and docker-compose](https://docs.docker.com/compose/install/) installed, simply.

    docker-compose up
    # now open http://localhost:8081/

### Update the frontend code

After modifying the frontend code, you could rebuild it in docker with:

    docker-compose build frontend

This process is rather heavyweight, so you may prefer to run the frontend separately with node.

    # Build dependencies
    npm install

    # Run just the backend and database in one terminal
    docker-compose up backend db

    Run the frontend server locally. This will auto-restart when you modify the code.
    npm run serve

If you prefer not to use docker, you can run the backend and/or couchbase server separately.
One useful case is running the db locally, and passing its IP address directly to the backend:

    # example only, use the IP address of your locally running db server
    CB_HOST=10.144.211.101 docker-compose up backend


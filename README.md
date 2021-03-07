# Trade API

[![Build Status](https://travis-ci.org/kati18/jsramverk-backend-project.svg?branch=master)](https://travis-ci.org/kati18/jsramverk-backend-project)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/kati18/jsramverk-backend-project/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/kati18/jsramverk-backend-project/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/kati18/jsramverk-backend-project/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/kati18/jsramverk-backend-project/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/kati18/jsramverk-backend-project/badges/build.png?b=master)](https://scrutinizer-ci.com/g/kati18/jsramverk-backend-project/build-status/master)

## The project

This project, backend RESTful API and SQLite database for fetching and storing data, is released as a project assignment and a part of a University course [DV1612 JavaScript-baserade webbramverk](https://jsramverk.se/) at BTH(Blekinge Institute of Technology) 2020-2021.

## Installations/dependencies

    - bcryptjs
    - cors
    - express
    - jwtwebtoken
    - morgan
    - sqlite3

## Development server

Run `npm start` for a dev server. Server starts up at `http://localhost:1337/`.

## Production server

Run `npm run production` for a prod server. Server starts up at `https://me-api-project.ktibe.me/`.

## Further help and information

Available routes in the RESTful API are:

    - GET / - presents start i.e. information about theís fake trading site
    - GET /trade - presents a form for trading mushrooms using the authenticated user´s account
    - GET /accounts/:email - presents liquid assets and holdings in the authenticated user´s account
    - GET /loggs/:email - presents transaction loggs in the authenticated user´s account
    - POST /accounts - deposits money to the authenticated user´s account
    - POST /trades/buy - adds mushrooms to and withdraws money from the authenticated user´s account
    - POST /trades/sell - subtracts mushrooms from and deposits money to the authenticated user´s account
    - POST /register - adds/registers a specific user account
    - POST /login - authenticates/logs in a registered user account

Passwords are saved encrypted and user authentication is handled with JSON Web Tokens. Tokens are passed in on header key authorization.

## GitHub

The course repository for the Trade API is available at [My Github repo Trade API](https://github.com/kati18/jsramverk-backend-project.git)<br>
A frontend SPA developed in Angular is available at [My GitHub repo](https://github.com/kati18/jsramverk-frontend-project.git)

## Implementation

För implementationen av backenden har jag använt mig av samma tekniker och verktyg som i övriga kursmoment d v s en SQLite databas, en Express-server, Node.js, src-filer som kommunicerar med databasen och route-filer som tar emot och svarar på anrop från frontenden i sin tur anropar src-filerna. För kryptering/dekryptering av lösenord och autentisering har jag använt mig av modulen bcrypt och JSON Web Token(JWT). Anledningen till att jag valde alla ovan nämnda tekniker och verktyg är jag är hyfsat bekant med dem och tycker att de har fungerat bra i både tidigare kursmoment och kurser.

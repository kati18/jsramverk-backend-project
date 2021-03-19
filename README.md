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

Run `npm run production` for a prod server. Server starts up at `https://trade-api.ktibe.me/`.

## Further help and information

Available routes in the RESTful API are:

    - GET / - presents start i.e. information about the fake trading site
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
A realtime price server is available at [My Github repo Realtime price server](https://github.com/kati18/jsramverk-socket-server-project.git)<br>
A frontend SPA developed in Angular is available at [My GitHub repo Trade Angular](https://github.com/kati18/jsramverk-frontend-project.git)

## Implementation

För implementationen av backenden har jag använt mig av samma tekniker och verktyg som i övriga kursmoment d v s en SQLite databas, en Express-server, Node.js, route-filer som tar emot och svarar på anrop från frontenden och anropar src-filerna som i sin tur kommunicerar med databasen. API:t tar, som nämnts ovan, emot formulär-data i fyra olika request bodies. Datan valideras och kontrolleras mot datan i databasen och relevant response genereras. För kryptering/dekryptering av lösenord och autentisering har jag använt mig av modulen bcrypt och JSON Web Token(JWT).
Anledningen till att jag valde alla ovan nämnda tekniker och verktyg är jag är hyfsat bekant med dem och tycker att de har fungerat bra i både tidigare kursmoment och kurser.

## Tester backend

För att testa backenden har jag gjort och tänkt på samma sätt som jag gjorde i kmom04 d v s jag har en CI-kedja där jag kör integrationstester med hjälp av mocha, chai och chai-http och använder mig av verktygen Travis och Scrutinizer som byggtjänster och för kodtäckning och kodkvalitet. Denna gången har det fungerat betydligt bättre med byggverktygen då de konsekvent gått fel eller rätt och inte som i kmom04 lite random gick fel eller rätt. Anledningen till att jag valde de här verktygen igen är dels för att jag som sagt är lite bekant med dem sedan tidigare men också för att de, framför allt Travis, strulade så mycket förra gången jag använde dem och därför kände att jag ville lära mig dem bättre. Då jag har fått 9.82 i kodkvalitet och 87% i kodtäckning känner jag mig nöjd med mina betyg och tycker inte att det var svårt att få god kodtäckning på applikationen. Jag känner också att jag har fått lite större förtroende för verktygen då de som sagt betedde sig betydligt mer konsekvent denna gången.

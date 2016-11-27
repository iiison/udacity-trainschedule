# Why are we here?
Welcome to [@noahedwardhall's](https://twitter.com/noahedwardhall) Udacity Train Schedule

This application is based on [this boilerplate project](https://github.com/noahehall/react-f-your-starterkit.git)

# Quick start
  - $ npm install #install all required npm modules
  - $ npm run dev #start app on http://localhost:3000,
  - $ npm run prod #make product build in /dist, with server running on https://localhost:3000/
  - $ npm run test #test all test.js files within src/*
  - $ npm run eslint-unused #see all eslint rules not defined in .eslintrc
  - $ npm run eslint #run eslint on all .js files within /src*

# CI
  - [![Build Status](https://api.travis-ci.org/noahehall/udacity-trainschedule.svg?branch=master)

# Requirements
  - You must build an application that allows users to select a departure and arrival train station.
  - The user will then see information about the two stations.
  - The information you provide may include connected stations on the path, arrival & departure times, or any other information you deem important for the user.
  - Initially, the application should load a default train schedule, this can be a general schedule, a live schedule, or simply a transit map - many public transportation agencies offer this information via an API, as a GTFS file (for example, CalTrain or the My511.org transit data feed), or as an image.
  - When the application is online the user should be able to see up to date information from the transit authority of choice.
  - When offline the user should be able to continue to interact with the site in some capacity (e.g. The user has full access to the general schedule or the user is able to see route information they have accessed while online.)

# movie_api
myFlix API
Description
A REST API for an application called “myFlix” that interacts with a database that stores data about different movies.

This is a he server-side component of a “movies” web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

The main purpose of this app is to present how I create a REST API architecture.

This site was built using Heroku GitHub Deploys.

LIVE DEMO

Getting started
Prerequisites
Install nodejs LTS or the latest version.

Setup a mongodb database.

Installation
Clone the repository:

git clone https://github.com/kal40/movie-api.git
cd movie-api
Create a file and name it .env.development.local for environment variables and add the next content:

CONNECTION_URI="your mongo DB connection string"
PORT=your port number
HOST="your host name with the used http protocol together"
JWT_SECRET="your super secret code"
then run the next commands:

npm install
npm run dev
Testing
The endpoints can be tested directly from the documentation or the openapi definitions can be imported to Postman from this link

Key Features
Express library for endpoint routing
Uses MongoDB noSQL database deployed on MongoDB Atlas
Basic HTTP auth for first login then JWT (token-based) authentication for further API calls.
User's password hashing
Dependencies
See package.json

Known Issues
at some endpoints the documentation needs to be updated to show the correct responses

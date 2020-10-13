# Flight_details
A website that shows the flight available details

# What it does
It shows a webpage with a searchbar and search button, which maybe used to query flight details.
On query success, fight details is displayed along with a button to toggle tracking of the flight. If unsuccessful, message is shown.
When tracking is enabled,tracked latitude and longitude of flight is shown.

# Requirements
1. Linux
2. npm
3. Internet connection to install npm dependencies

# How to use it
1. Clone the repo
2. Run 'npm install --save' to install all dependencies mentioned in package.json
3. Run 'npm run build' to build the client-side javascript
4. Run 'nodemon index.js' to launch the app

# Additional info
1. The app will run on the port 3000
2. A socket server will run on port 3080
3. The website is present at '/' route.
4. The API to fetch flight details may be queried at route '/:flight_id' (replace 'flight_id' by the actual flight id to be queried) with a get request.

# Database requirements
1. The app uses mongodb.
2. It expects a mongobd server running at 'mongodb://127.0.0.1:27017'
3. The cluster name should be 'flight'
4. There should be a collection of name 'all_flights' having the following schema :
          fid : String,
          origin : String,
          destination : String,
          dep_time : String
5. This is the same schema of the response of the API.

Right now, the tracking is purely representational. It does not fetch data from sources external to the server.

Is it a bird? Is it a superman? No thats a plane, thank you.

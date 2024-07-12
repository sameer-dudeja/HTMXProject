const express = require('express')

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Import the routes
const userRoute = require('./routes/user')
const weatherRoute = require('./routes/weather')
const converterRoute = require('./routes/converter')
const searchRoute = require('./routes/search')



//Handle get request to fetch users
app.use("/users", userRoute)


//handle post request for temperature converter
app.use("/convert", converterRoute)

//Handle GET request for temperature Api
app.use("/get-temperature", weatherRoute)

//handle POST request for search user 
app.use("/search", searchRoute)


//Run the app
app.listen(3000, () => {
    console.log("Server is running on Port 3000")
})
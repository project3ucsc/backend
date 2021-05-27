const express = require("express")
require('dotenv/config')
const app = express()
const mongoose = require("mongoose")
// const jwt = require('./helpers/jwt')
const bodyparser = require('body-parser')
app.use(bodyparser.json())

// app.use(jwt())

// Route import
const userRoute = require('./routes/user')
const movieRoute = require('./routes/movie')


app.use('/login', loginRoute)
app.use('/user', userRoute)
app.use('/movie', movieRoute)



// ROUTES
app.get('/', (req,res) => {
    res.send("Hello this is movie API")
})



mongoose.connect( process.env.DB_CONNECTION,
    {useNewUrlParser: true ,useUnifiedTopology: true} , 
    ()=>{console.log("conncted to db");}
)
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//SERVER
app.listen(3001)
console.log("server listening at port 3001")




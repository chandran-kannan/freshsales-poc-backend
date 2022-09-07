const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require("body-parser")
var cors = require('cors')
const accountsRoute = require('./api/routes/account')
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/account", accountsRoute);

app.use((req, res, next) => {
    res.header("Acces-Control-Allow-Origin", "*");
    res.header("Acces-Control-Allow-Headers", "Origin, x-requested-with, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", 'POST, PUT, PATCH, DELETE, GET, CREATE, UPDATE')
        return res.status(200).json({})
    }
    next(error)
})

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message,
            name: "invalid"
        }
    })
    next(error)
})

module.exports = app;
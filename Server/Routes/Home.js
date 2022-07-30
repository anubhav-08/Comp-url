const express = require('express')
const app = express()
const userRoute = require('./User')
const addressRoute = require('./Address')

app.use('/user', userRoute)
app.use('/', addressRoute)
module.exports = app;
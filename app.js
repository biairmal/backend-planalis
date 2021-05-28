require('dotenv').config()

const express = require('express')
const { sequelize, DataTypes } = require('sequelize')
const cors = require('cors')

var corsOptions = { origin: process.env.BASE_URL }

const app = express()
const models = require('./models')
const { response } = require('express')
const port = process.env.APP_PORT

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

require('./routes/auth.routes')(app)
require('./routes/garden.routes')(app)
require('./routes/plant.routes')(app)
require('./routes/task.routes')(app)
require('./routes/user.routes')(app)

app.listen(port, () => {
    console.log("Server up and running")
    console.log(process.env.BASE_URL)
    console.log(port)
})
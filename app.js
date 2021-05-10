const express = require('express')
const {
    sequelize,
    DataTypes
} = require('sequelize')
const cors = require('cors')
var corsOptions = {
    origin: "http://localhost:3000"
}

const app = express()
const models = require('./models')

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

require('./routes/auth.routes')(app)
require('./routes/garden.routes')(app)
require('./routes/plant.routes')(app)
require('./routes/task.routes')(app)
require('./routes/user.routes')(app)

app.listen(3000, () => {
    console.log("Server up and running")
})
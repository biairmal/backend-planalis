const {
    Sequelize
} = require('sequelize')

const sequelize = new Sequelize('db_planalis', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

async function start() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
start()
module.exports = sequelize
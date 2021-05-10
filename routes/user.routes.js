module.exports = app => {
    const controller = require('../controllers/user.controller')

    var {
        Router
    } = require('express')

    const router = Router()

    //Update user role
    router.put("/api/users/:id", controller.changeRole)

    //Delete user
    router.delete("/api/users/:id", controller.delete)

    app.use(router)
}
module.exports = app => {
    const controller = require('../controllers/garden.controller')

    var {
        Router
    } = require('express')

    const router = Router()

    //Create a new garden
    router.post("/api/gardens", controller.create)

    //Retrieve all gardens
    router.get("/api/gardens", controller.findAll)

    //Retrieve a single garden by id
    router.get("/api/gardens/:id", controller.findOne)

    //Update garden by id
    router.put("/api/gardens/:id", controller.update)

    //Delete single garden by id
    router.delete("/api/gardens/:id", controller.delete)

    //Detele all gardens
    router.delete("/api/gardens", controller.deleteAll)

    app.use(router)
}


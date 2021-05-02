module.exports = app => {
    const controller = require('../controllers/plant.controller')

    var {
        Router
    } = require('express')

    const router = Router()

    //Create a new plant
    router.post("/api/gardens/plants", controller.create)

    //Retrieve all plants in specific garden
    router.get("/api/gardens/:garden_id/plants/", controller.findAll)

    //Retrieve a single plant by id
    router.get("/api/gardens/plants/:id", controller.findOne)

    //Update plant by id
    router.put("/api/gardens/plants/:id", controller.update)

    //Delete single plant by id
    router.delete("/api/gardens/plants/:id", controller.delete)

    //Detele all plants in specific garden
    router.delete("/api/gardens/:garden_id/plants", controller.deleteAll)

    app.use(router)
}
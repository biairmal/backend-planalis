module.exports = app => {
    const controller = require('../controllers/task.controller')

    var {
        Router
    } = require('express')

    const router = Router()

    //Create a new task
    router.post("/api/tasks", controller.create)

    //Retrieve all tasks
    router.get("/api/tasks", controller.findAll)
    
    //Retrieve all tasks from specific garden
    router.get("/api/:garden_id/tasks", controller.findAllFromGarden)

    // Retrieve a single task by id
    router.get("/api/tasks/:id", controller.findOne)

    //Update tasks status by id
    router.put("/api/tasks/:id", controller.update)

    //Delete single task by id
    router.delete("/api/tasks/:id", controller.delete)

    app.use(router)
}
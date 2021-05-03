const models = require('../models')
const Task = models.tasks
const Garden = models.gardens

const Op = models.Sequelize.Op

Task.belongsTo(Garden, {
    foreignKey: "garden_id"
});
Garden.hasMany(Task, {
    foreignKey: "garden_id"
});

//create tasks
exports.create = (req, res) => {
    //validate request
    if (!req.body.garden_id) {
        res.status(400).send({
            meesage: "Content cannot be empty!"
        })
        return
    }

    const task = {
        garden_id: req.body.garden_id,
        task_type: req.body.task_type,
        treatment: req.body.treatment,
        annotation: req.body.annotation,
        status: "Assigned",
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        created_by: req.body.created_by
    }

    Task.create(task)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occured while creating task."
            })
        })
}

//retrieve all tasks
exports.findAll = (req, res) => {

    Garden.findAll({
            include: {
                model: Task
            }
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving tasks."
            })
        })
}

//retrieve all tasks from specific gagrden
exports.findAllFromGarden = (req, res) => {

    var condition = {
        garden_id: req.params.garden_id
    }
    Garden.findAll({
            where: condition,
            include: {
                model: Task
            }
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving tasks."
            })
        })
}

//find single task
exports.findOne = (req, res) => {
    const id = req.params.id

    Task.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Task with id=" + id
            })
        })
}

//update task status
exports.update = (req, res) => {
    const id = req.params.id

    var req_status = (req.body.status == 1) ? "Done" : "Assigned"
    const task = {
        status: req_status,
    }

    Task.update(task, {
            where: {
                task_id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Task was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

//delete task
exports.delete = (req, res) => {
    const id = req.params.id

    Task.destroy({
            where: {
                task_id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Task was deleted successfully!"
                })
            } else {
                res.send({
                    message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task with id=" + id
            })
        })
}
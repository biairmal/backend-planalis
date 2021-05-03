const models = require('../models')
const Plant = models.plants
const Garden = models.gardens

const Op = models.Sequelize.Op

Plant.belongsTo(Garden, {
    foreignKey: "garden_id"
});
Garden.hasMany(Plant, {
    foreignKey: "garden_id"
});

//create plant
exports.create = (req, res) => {
    //validate request
    if (!req.body.plant_code) {
        res.status(400).send({
            message: "Content cannot be empty!"
        })
        return
    }

    //Create a plant
    const plant = {
        plant_code: req.body.plant_code,
        height: req.body.height,
        width: req.body.width,
        plant_type: req.body.plant_type,
        garden_id: req.body.garden_id,
        created_by: req.body.created_by
    }

    Plant.create(plant)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occured while creating plant."
            })
        })
}

//retrieve all plant
exports.findAll = (req, res) => {

    var condition = {
        garden_id: req.params.garden_id
    }

    Garden.findAll({
            where: condition,
            include : Plant
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving plants."
            })
        })
}

//find single plant
exports.findOne = (req, res) => {
    const id = req.params.id

    Plant.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Plant with id=" + id
            })
        })
}

//update plant
exports.update = (req, res) => {
    const id = req.params.id

    Plant.update(req.body, {
            where: {
                plant_id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Plant was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update Plant with id=${id}. Maybe Plant was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

//delete plant
exports.delete = (req, res) => {
    const id = req.params.id

    Plant.destroy({
            where: {
                plant_id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Plant was deleted successfully!"
                })
            } else {
                res.send({
                    message: `Cannot delete Plant with id=${id}. Maybe Plant was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Plant with id=" + id
            })
        })
}

//delete all plant
exports.deleteAll = (req, res) => {

    var condition = {
        garden_id: req.params.garden_id
    }
    Plant.destroy({
            where: condition,
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Plants were deleted successfully!`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while removing all plants."
            })
        })
}
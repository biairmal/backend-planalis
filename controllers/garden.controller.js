const {
    sequelize
} = require('../models')
const models = require('../models')
const Garden = models.gardens
const Plant = models.plants

const Op = models.Sequelize.Op

Plant.belongsTo(Garden, {
    foreignKey: "garden_id"
});
Garden.hasMany(Plant, {
    foreignKey: "plant_id"
});

//create garden
exports.create = (req, res) => {
    //validate request
    if (!req.body.garden_name) {
        res.status(400).send({
            message: "Content cannot be empty!"
        })
        return
    }

    //Create a garden
    const garden = {
        garden_name: req.body.garden_name,
        location: req.body.location,
        size_m2: req.body.size_m2,
        created_by: req.body.created_by
    }

    Garden.create(garden)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occured while creating garden."
            })
        })
}

//retrieve all garden
exports.findAll = (req, res) => {
    const garden_name = req.query.garden_name
    var condition = garden_name ? {
        garden_name: {
            [Op.like]: `%{garden_name}%`
        }
    } : null

    Garden.findAll({
            where: condition,
            attributes: [
                'garden_id', 
                'garden_name', 
                'size_m2', 
                'location', 
                [sequelize.literal('COUNT(plant_id)'), 'plants_total'],
                [sequelize.literal(`COUNT(CASE status WHEN 'HEALTHY' THEN 1 ELSE null END)`), 'plants_healthy'],
                [sequelize.literal(`COUNT(CASE status WHEN 'SICK' THEN 1 ELSE null END)`), 'plants_sick'],
            ],
            include: {
                model: Plant,
                attributes: [],
            },
            group: ['Garden.garden_id'],
            raw: true,
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving gardens."
            })
        })
}

//find single garden
exports.findOne = (req, res) => {
    const id = req.params.id

    Garden.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Garden with id=" + id
            })
        })
}

//update garden
exports.update = (req, res) => {
    const id = req.params.id

    Garden.update(req.body, {
            where: {
                garden_id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Garden was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update Garden with id=${id}. Maybe Garden was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

//delete garden
exports.delete = (req, res) => {
    const id = req.params.id

    Garden.destroy({
            where: {
                garden_id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Garden was deleted successfully!"
                })
            } else {
                res.send({
                    message: `Cannot delete Garden with id=${id}. Maybe Garden was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Garden with id=" + id
            })
        })
}

//delete all garden
exports.deleteAll = (req, res) => {
    Garden.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Gardens were deleted successfully!`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while removing all gardens."
            })
        })
}
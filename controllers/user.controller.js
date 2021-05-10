const models = require('../models')
const User = models.users

const Op = models.Sequelize.Op

//create tasks
exports.changeRole = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        })
        return
    }

    //check if it is admin who manage the role
    const admin_role = req.body.admin_role

    if(admin_role != 1) {
        res.send({
            message : "You dont have access to manage the role"
        })
        return
    }

    //updating target user's role
    const target_role = req.body.target_role
    const target_id = req.params.id

    User.update({
            role_id: target_role
        }, {
            where: {
                user_id: target_id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

//delete user
exports.delete = (req, res) => {
    const id = req.params.id

    User.destroy({
            where: {
                user_id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                })
            } else {
                res.send({
                    message: `Cannot delete user with id=${id}. Maybe User was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user who have contributed in this farm, id=" + id 
            })
        })
}
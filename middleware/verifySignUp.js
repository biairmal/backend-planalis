const models = require('../models')
// const User = models.User
const User = models.users

checkDuplicateEmail = (req, res, next) => {
    console.log(req.body)
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: 'Failed! Email is already in use!'
            })
            return
        }
        next()
    })
}

const verifySignUp = {
    checkDuplicateEmail
}

module.exports = verifySignUp
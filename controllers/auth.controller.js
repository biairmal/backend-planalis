const models = require('../models')
const config = require('../config/auth.config')
const User = models.users

const Op = models.Sequelize.Op

var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

exports.signUp = (req, res) => {
    // save user to database
    User.create({
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8),
        role_id : 1
    }).then(
        res.send({message : 'User was registered successfully!'})
    ).catch(err => {
        res.status(500).send({ mfessage : err.message})
    })
}

exports.signIn = (req,res) => {
    User.findOne({
        where: {
            email : req.body.email
        }
    }).then(user=> {
        if(!user){
            return res.status(404).send({message : 'User Not Found!'})
        }
        
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken : null,
                message:'Invalid Password!'
            })
        }

        var token = jwt.sign({id : user.user_id}, config.secret, {
            expiresIn : 86400 //24 hours
        })

        res.status(200).send({
            id: user.user_id,
            email :user.email,
            roles : user.roles_id,
            accessToken :token
        })
    }).catch(err => {
        res.status(500).send({message : err.message})
    })
}

const {
  Sequelize,
  DataTypes
} = require('sequelize')
const sequelize = require('../config/database')
// const User = sequelize.define('users', {
//   user_id: {
//     autoIncrement: true,
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true
//   },
//   email: {
//     type: DataTypes.STRING(255),
//     allowNull: false
//   },
//   name: {
//     type: DataTypes.STRING(255),
//     allowNull: true
//   },
//   password: {
//     type: DataTypes.STRING(255),
//     allowNull: false
//   },
//   role_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   google_id: {
//     type: DataTypes.STRING(255),
//     allowNull: true
//   },
//   profile_photo_path: {
//     type: DataTypes.STRING(255),
//     allowNull: true
//   }
// }, {
//   sequelize,
//   tableName: 'users',
//   timestamps: true,
//   indexes: [{
//     name: "PRIMARY",
//     unique: true,
//     using: "BTREE",
//     fields: [{
//       name: "user_id"
//     }, ]
//   }, ]
// })

// module.exports = User

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    google_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    profile_photo_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    indexes: [{
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "user_id"
      }, ]
    }, ]
  })
}
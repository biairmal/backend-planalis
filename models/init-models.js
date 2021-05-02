var DataTypes = require("sequelize").DataTypes;
var _gardens = require("./gardens");
var _plants = require("./plants");
var _roles = require("./roles");
var _sequelizemeta = require("./sequelizemeta");
var _users = require("./users");

function initModels(sequelize) {
  var gardens = _gardens(sequelize, DataTypes);
  var plants = _plants(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    gardens,
    plants,
    roles,
    sequelizemeta,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
var DataTypes = require("sequelize").DataTypes;
var _gardens = require("./gardens");
var _plants = require("./plants");
var _roles = require("./roles");
var _sequelizemeta = require("./sequelizemeta");
var _tasks = require("./tasks");
var _users = require("./users");

function initModels(sequelize) {
  var gardens = _gardens(sequelize, DataTypes);
  var plants = _plants(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var tasks = _tasks(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  plants.belongsTo(gardens, { as: "garden", foreignKey: "garden_id"});
  gardens.hasMany(plants, { as: "plants", foreignKey: "garden_id"});
  tasks.belongsTo(gardens, { as: "garden", foreignKey: "garden_id"});
  gardens.hasMany(tasks, { as: "tasks", foreignKey: "garden_id"});
  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});
  gardens.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(gardens, { as: "gardens", foreignKey: "created_by"});
  plants.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(plants, { as: "plants", foreignKey: "created_by"});
  tasks.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(tasks, { as: "tasks", foreignKey: "created_by"});

  return {
    gardens,
    plants,
    roles,
    sequelizemeta,
    tasks,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

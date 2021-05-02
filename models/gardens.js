const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gardens', {
    garden_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement : true,
      primaryKey: true
    },
    garden_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    size_m2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'gardens',
    timestamps: false
  });
};

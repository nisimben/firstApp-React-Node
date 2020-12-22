const { Model, DataTypes } = require('sequelize');

class Post extends Model {}

/**
 * 
 * @param {Sequelize} sequelize - instance of sequelize
 */
function init(sequelize) {
  Post.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull:true,
      type: DataTypes.STRING,
    },
    text:{
       type: DataTypes.STRING,
    },

    mediaUrl: DataTypes.STRING,
    mediaDate: DataTypes.STRING
  }, { 
    sequelize, 
    modelName: "post",
    schema: "first_application",
    freezeTableName: true,
    timestamps: false
  });

  return Post;
}

module.exports = init;


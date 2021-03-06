'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.review.belongsTo(models.user)
    }
  };
  review.init({
    content: DataTypes.TEXT,
    movieId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    movieTitle: DataTypes.STRING,
    moviePoster: DataTypes.STRING
  },
  
 {
    sequelize,
    modelName: 'review',
  });
  return review;
};
// models/album.js
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
      },
    },
  });

  Album.associate = function(models) {
    Album.hasMany(models.Song, {
      foreignKey: 'albumId',
      as: 'songs',
    });
  };

  return Album;
};

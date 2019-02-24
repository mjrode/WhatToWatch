module.exports = (sequelize, DataTypes) => {
  const PlexLibrary = sequelize.define(
    'plexlibrary',
    {
      type: DataTypes.STRING,
      views: DataTypes.INTEGER,
      rating_key: DataTypes.INTEGER,
      metadata_path: DataTypes.STRING,
      summary: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      year: DataTypes.INTEGER,
      genre: DataTypes.STRING,
    },
    {},
  );
  // eslint-disable-next-line no-unused-vars
  PlexLibrary.associate = function(models) {
    // associations can be defined here
  };
  return PlexLibrary;
};

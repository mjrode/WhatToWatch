const plexLibrary = (sequelize, DataTypes) => {
  const plexLibrary = sequelize.define('plex_library', {
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    views: DataTypes.INTEGER,
    rating_key: DataTypes.INTEGER,
    metadata_path: DataTypes.STRING,
    summary: DataTypes.TEXT,
    rating: DataTypes.FLOAT,
    year: DataTypes.INTEGER,
    genre: DataTypes.STRING,
  });

  plexLibrary.associate = models => {
    plexLibrary.belongsTo(models.User);
  };

  return plexLibrary;
};

export default plexLibrary;

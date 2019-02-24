const model = (sequelize, DataTypes) => {
  const PlexLibrary = sequelize.define('plex_library', {
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
    type: DataTypes.STRING,
    views: DataTypes.INTEGER,
    rating_key: DataTypes.INTEGER,
    metadata_path: DataTypes.STRING,
    summary: DataTypes.TEXT,
    rating: DataTypes.FLOAT,
    year: DataTypes.INTEGER,
    genre: DataTypes.STRING,
  });

  return PlexLibrary;
};

export default model;

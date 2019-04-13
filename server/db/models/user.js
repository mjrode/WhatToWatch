module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      googleId: DataTypes.STRING,
      email: {type: DataTypes.STRING, unique: true},
      plexUrl: DataTypes.STRING,
      plexToken: DataTypes.STRING,
      sonarrUrl: DataTypes.STRING,
      sonarrApiKey: DataTypes.STRING,
    },
    {},
  );
  User.associate = function(models) {
    User.hasMany(models.PlexSection);
    User.hasMany(models.PlexLibrary);
  };
  return User;
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      googleId: DataTypes.STRING,
      email: {type: DataTypes.STRING, unique: true},
    },
    {},
  );
  User.associate = function(models) {
    User.hasMany(models.PlexSection);
    User.hasMany(models.PlexLibrary);
  };
  return User;
};

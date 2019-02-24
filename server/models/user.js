module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {},
  );
  User.associate = function(models) {
    User.hasMany(models.PlexSection);
    User.hasMany(models.PlexLibrary);
  };
  return User;
};

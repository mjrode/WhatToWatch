module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {},
  );
  User.associate = function(models) {
    User.hasMany(models.plexsection);
  };
  return User;
};

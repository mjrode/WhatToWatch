module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {type: DataTypes.STRING, unique: true},
      username: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      last_login: {
        type: DataTypes.DATE,
      },

      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
      },
    },
    {},
  );
  User.associate = function(models) {
    User.hasMany(models.PlexSection);
    User.hasMany(models.PlexLibrary);
  };
  return User;
};

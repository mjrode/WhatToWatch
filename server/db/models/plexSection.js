module.exports = (sequelize, DataTypes) => {
  const PlexSection = sequelize.define(
    'PlexSection',
    {
      title: DataTypes.STRING,
      type: DataTypes.STRING,
      key: DataTypes.INTEGER,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['title', 'UserId'],
        },
      ],
    },
  );
  PlexSection.associate = function(models) {
    PlexSection.belongsTo(models.User);
  };
  return PlexSection;
};

module.exports = (sequelize, DataTypes) => {
  const PlexSection = sequelize.define(
    'PlexSection',
    {
      title: {type: DataTypes.STRING, unique: true},
      type: DataTypes.STRING,
      key: DataTypes.INTEGER,
    },
    {},
  );
  PlexSection.associate = function(models) {
    PlexSection.belongsTo(models.User);
  };
  return PlexSection;
};

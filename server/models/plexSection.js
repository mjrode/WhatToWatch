module.exports = (sequelize, DataTypes) => {
  const PlexSection = sequelize.define(
    'plexsection',
    {
      title: DataTypes.STRING,
      type: DataTypes.STRING,
      key: DataTypes.INTEGER,
    },
    {},
  );
  PlexSection.associate = function(models) {
    console.log(models);
    PlexSection.belongsTo(models.user);
  };
  return PlexSection;
};

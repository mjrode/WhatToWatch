const plexSection = (sequelize, DataTypes) => {
  const plexSection = sequelize.define('plex_section', {
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    key: DataTypes.INTEGER,
  });

  plexSection.associate = models => {
    plexSection.belongsTo(models.User);
  };

  return plexSection;
};

export default plexSection;

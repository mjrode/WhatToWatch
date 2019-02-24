const model = (sequelize, DataTypes) => {
  const PlexSection = sequelize.define('plex_section', {
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    key: DataTypes.INTEGER,
  });

  return PlexSection;
};

export default model;


// model:create --name PlexSection --attributes title:string,type:string,key:integer

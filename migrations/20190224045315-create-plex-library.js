module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plexlibraries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      views: {
        type: Sequelize.INTEGER,
      },
      rating_key: {
        type: Sequelize.INTEGER,
      },
      metadata_path: {
        type: Sequelize.STRING,
      },
      summary: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.FLOAT,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      genre: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('plexlibraries');
  },
};

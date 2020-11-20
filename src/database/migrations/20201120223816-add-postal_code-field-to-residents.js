module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('residents', 'postal_code', {
      type: Sequelize.STRING,
      defaultValue: '00000000',
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('residents', 'postal_code');
  },
};

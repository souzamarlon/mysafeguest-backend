module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'mobile_number', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '000000000',
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'mobile_number');
  },
};

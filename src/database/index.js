import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

const models = [];

class Database {
  constructor() {
    // Using connection string URI:
    if (process.env.DATABASE_URL) {
      this.connection = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        define: {
          timestamps: true,
          underscored: true,
          underscoredALL: true,
        },
      });
    } else {
      // Use this connection if you are not using connection string URI
      this.connection = new Sequelize(databaseConfig);
    }

    this.init();
    this.associate();
  }

  init() {
    models.forEach((model) => model.init(this.connection));
  }

  associate() {
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();

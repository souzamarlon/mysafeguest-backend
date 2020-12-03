import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Resident extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        mobile: Sequelize.INTEGER,
        number: Sequelize.INTEGER,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'owner_id' });
    this.belongsTo(models.Address, { foreignKey: 'address_id' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Resident;

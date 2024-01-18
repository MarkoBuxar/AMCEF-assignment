import { DataTypes } from 'sequelize';
import { TableBuilder } from '../BaseClasses/TableClass';

export class User extends TableBuilder {
  public static order = 0;
  constructor(database, ref) {
    super(database, ref);
    this.name = 'User';
  }

  public override build = async function () {
    const User = await this.db.define(this.name, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      // Model attributes are defined here
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
    });

    return User;
  };
}

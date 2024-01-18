import { DataTypes } from 'sequelize';
import { TableBuilder } from '../BaseClasses/TableClass';

export class Users extends TableBuilder {
  public static order = 0;
  constructor(database) {
    super(database);
    this.name = 'users';
  }

  public override build = async function () {
    const User = await this.db.define(this.name, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        // allowNull defaults to true
      },
    });

    return User;
  };
}

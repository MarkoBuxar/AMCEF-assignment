import { DataTypes, Deferrable } from 'sequelize';
import { TableBuilder } from '../BaseClasses/TableClass';

export class Lists extends TableBuilder {
  public static order = 1;

  constructor(database) {
    super(database);
    this.name = 'lists';
  }

  public override build = async function () {
    const List = await this.db.define(this.name, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      owner: {
        type: DataTypes.INTEGER,

        references: {
          model: 'users',
          key: 'id',
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
    });

    return List;
  };
}

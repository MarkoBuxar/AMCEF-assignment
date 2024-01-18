import { DataTypes, Deferrable } from 'sequelize';
import { TableBuilder } from '../BaseClasses/TableClass';

export class ListAccess extends TableBuilder {
  public static order = 2;

  constructor(database) {
    super(database);
    this.name = 'list-access';
  }

  public override build = async function () {
    const ListAccess = await this.db.define(this.name, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      list: {
        type: DataTypes.INTEGER,
        references: {
          model: 'lists',
          key: 'id',
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      user: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
    });

    return ListAccess;
  };
}

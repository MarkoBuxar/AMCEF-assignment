import { DataTypes, Deferrable } from 'sequelize';
import { TableBuilder } from '../BaseClasses/TableClass';
import { ListItemFlags } from '../Enums/ListItemFlagsEnum';

export class ListItems extends TableBuilder {
  public static order = 3;

  constructor(database) {
    super(database);
    this.name = 'list-items';
  }

  public override build = async function () {
    const ListItems = await this.db.define(this.name, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      list: {
        type: DataTypes.INTEGER,

        references: {
          model: 'lists',
          key: 'id',
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      flag: {
        type: DataTypes.ENUM,
        values: Object.values(ListItemFlags),
      },
    });

    return ListItems;
  };
}

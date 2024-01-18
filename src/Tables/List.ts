import { DataTypes, Deferrable } from 'sequelize';
import { TableBuilder } from '../BaseClasses/TableClass';

export class List extends TableBuilder {
  public static order = 1;

  constructor(database, ref) {
    super(database, ref);
    this.name = 'List';
  }

  public override build = async function () {
    return;
    const List = await this.db.define(
      this.name,
      {
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
            model: 'User',
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE,
          },
        },
      },
      {
        // Other model options go here
      },
    );

    return List;
  };
}

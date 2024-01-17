import { DataTypes } from 'sequelize';

export function Users(database) {
  const User = database.define(
    'User',
    {
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
    },
    {
      // Other model options go here
    },
  );
}

import Path from 'path';
import { Database } from './Database';
import { Server } from './Server';
import { DataTypes } from 'sequelize';
import { Logger } from './Logger/Logger';

require('dotenv').config({ path: Path.join(__dirname, '../.env') });

const server = new Server();
const database = Database.Instance;

async function test() {
  const User = database.conn.define(
    'User',
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
    },
  );

  const users = await User.findAll({
    attributes: [
      ['firstName', 'Name'],
      ['lastName', 'Surname'],
    ],
  });

  console.log('All users:', JSON.stringify(users, null, 2));

  await User.update(
    { lastName: 'Doe' },
    {
      where: {
        lastName: null,
      },
    },
  );

  const newUsers = await User.findAll({
    attributes: [['lastName', 'surname']],
  });

  console.log('All users:', JSON.stringify(newUsers, null, 2));

  await User.destroy({
    where: {
      firstName: 'Jane',
    },
  });
}

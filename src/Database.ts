import { Logger } from './Logger/Logger';
import { Options, Sequelize } from 'sequelize';
import { DBInitHandler } from './Utils/DBInitHandler';

export class Database {
  public conn;
  private static _instance: Database;

  constructor() {
    this.conn = null;

    this.init();
  }

  public async init() {
    let connInfo: Options = {
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      dialect: 'mysql',
      logging: (msg) => Logger.Debug(msg),
    };

    this.conn = new Sequelize(
      connInfo.database,
      connInfo.username,
      connInfo.password,
      connInfo,
    );

    try {
      await this.conn.authenticate();
      Logger.Info('DB initiated');

      await new DBInitHandler().init(this.conn);
    } catch (error) {
      Logger.Error('Unable to connect to the database:', error);
    }
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

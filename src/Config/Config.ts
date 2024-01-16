import config from './config.json';
import path from 'path';
import fs from 'fs-extra';
import _ from 'lodash';
import { Logger } from '../Logger/Logger';

export class Config {
  private static _instance: Config;
  private confPath;
  private conf;
  public static dev = false;

  constructor() {
    this.confPath = './config.json';
    this.conf = config;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public Get(p: string): any {
    return _.get(this.conf, p);
  }

  public Set(p: string, value: any): object {
    _.set(this.conf, p, value);
    this.Save();
    return this.conf;
  }

  public Has(p: string): boolean {
    return _.has(this.conf, p);
  }

  public Remove(p: string) {
    _.unset(this.conf, p);
    this.Save();
  }


  private Save() {
    try {
      fs.writeFileSync(
        path.join(__dirname, this.confPath),
        JSON.stringify(this.conf, null, 2),
      );
    } catch (exp) {
      throw Logger.Error('Error saving to config');
    }
  }
}
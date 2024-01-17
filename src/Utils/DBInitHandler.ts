import fs from 'fs';
import Path from 'path';
import express, { Router } from 'express';
import { Logger } from '../Logger/Logger';

export const routes = express.Router();

export class DBInitHandler {
  public static endpointCont = [];

  constructor() {}

  public async init(database) {
    const tableDir = Path.join(__dirname, '..', 'Tables');

    const tableFiles = fs.readdirSync(tableDir).filter((file) => {
      return file.endsWith('.ts') || file.endsWith('.js');
    });

    tableFiles.forEach(async (file) => {
      const im = await import(Path.join(tableDir, file));

      for (const key in im) {
        Logger.Info('adding ' + key + ' table');

        const route = new im[key](database);
      }
    });

    await database.sync();
  }
}

import fs from 'fs';
import Path from 'path';
import express, { Router } from 'express';
import { Logger } from '../Logger/Logger';
import { Model } from 'sequelize';
import { Database } from '../Database';

export type Reference = {
  ref: Model;
};

export const routes = express.Router();

export class DBInitHandler {
  private operationQueue = [];

  constructor() {}

  public async init(database) {
    const tableDir = Path.join(__dirname, '..', 'Tables');

    const tableFiles = fs.readdirSync(tableDir).filter((file) => {
      return file.endsWith('.ts') || file.endsWith('.js');
    });

    await Promise.all(
      tableFiles.map(async (file) => {
        const im = await import(Path.join(tableDir, file));

        for (const key in im) {
          this.operationQueue.push({
            order: im[key].order,
            tableBuilder: im[key],
          });
        }

        this.operationQueue.sort((a, b) => {
          return a.order - b.order;
        });
      }),
    );

    Logger.Info(`Adding ${this.operationQueue.length} tables...`);

    await Promise.all(
      this.operationQueue.map(async (operation) => {
        const tb = new operation.tableBuilder(database);
        const table = await tb.build();

        Logger.Info('adding ' + tb.name + ' table');

        await table.sync();
        database.endpoints[tb.name] = table;
      }),
    );

    await database.conn.sync();
  }
}

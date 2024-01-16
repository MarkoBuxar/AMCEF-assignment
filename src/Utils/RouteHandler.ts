// runs commands out of sync, shelved until further notice

import fs from 'fs';
import Path from 'path';
import { Logger } from '../Logger/Logger';

export class RouteHandler {
  constructor() {}

  public async init(server) {
    const routeDir = Path.join(__dirname, "..", 'Routes');

    const routeFiles = fs.readdirSync(routeDir).filter((file) => {
      return file.endsWith('.ts') || file.endsWith('.js');
    });

    routeFiles.forEach(async (file) => {
      const im = await import(Path.join(routeDir, file));
      for (const key in im) {
        Logger.Info('adding ' + key + ' route');
        await im[key](server);
      }
    });
  }
}
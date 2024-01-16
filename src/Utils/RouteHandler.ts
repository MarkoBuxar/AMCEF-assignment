// runs commands out of sync, shelved until further notice

import fs from 'fs';
import Path from 'path';
import { Logger } from '../Logger/Logger';
import express, { Router } from "express";

export const routes = express.Router();



export class RouteHandler {
  public static endpointCont = [];

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

        const route = new im[key]();

        await server.use(route.baseRoute, route.router);

      }
    });
  }

}
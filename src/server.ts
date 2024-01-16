import express from 'express';
import * as path from 'path';
import { Logger } from './Logger/Logger';
import { Config } from './Config/Config';
import * as BodyParser from 'body-parser';
import { RouteHandler } from './Utils/RouteHandler';

const BASE_PATH = path.join(__dirname, '..');

export class Server {
  public static port = Config.Instance.Get('port');
  private server;

  constructor() {
    this.server = express();

    this.server.use(BodyParser.urlencoded({ extended: true }));
    this.server.use(BodyParser.json());

    this.init();
  }

  public async init() {
    Logger.Info('initiating routes...');

    await this.initRoutes();

    Logger.Info('adding fallback routes');
    this.server.get('*', (req, res) => {
      res.status(404).send("Invalid route");
    });

    this.server.listen(Server.port, () => {
      Logger.Success('Server started on port ' + Server.port);
    });
  }

  private async initRoutes() {
    //this.server.use(express.static(path.join(BASE_PATH, 'ui')));

    var rh = new RouteHandler();
    await rh.init(this.server);
  }

}
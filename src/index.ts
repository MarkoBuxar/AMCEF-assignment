import express  from "express";
import { Config } from "./Config/Config";
import { Logger } from "./Logger/Logger";

const port: Number = Config.Instance.Get("port");

const app = express();


app.listen(port, Logger.Info(`Server started at port ${port}`));
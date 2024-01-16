#!/usr/bin/env node

import { Logger } from "./Logger/Logger";
import { Utils } from "./Utils/Utils";

Logger.Info("asd");
Logger.Success(Utils.toJadenCase("this is a test sentence"));
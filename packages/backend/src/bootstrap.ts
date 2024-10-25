"use strict";

import "reflect-metadata";
import { container } from "tsyringe";
import "Config/index";
import "./process";
import { Application } from "Lib/Infra/Internal/Application";

const app = new Application(container);
app.startApp();

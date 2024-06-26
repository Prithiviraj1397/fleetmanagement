import "reflect-metadata";
import "./envConfig/index.env.config";
import { LOADER_CONTAINER } from "./loaders/loaders.cotainer";

LOADER_CONTAINER.connectLoaders()

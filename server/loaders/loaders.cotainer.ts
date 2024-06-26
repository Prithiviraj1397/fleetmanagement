import { Container } from "inversify";
import { TYPES_LOADERS } from "./types/loaders.types";
import { ServerConnection } from "./server/server.connection";
import { IserverConnection } from "./server/interfaces/server.connection.interface";
import { Loaders } from "./loaders";
import { Iloaders } from "./database/loaders.interface";

const loadersContainer = new Container();

loadersContainer.bind<IserverConnection>(TYPES_LOADERS.SERVER_CONNECT).to(ServerConnection);
loadersContainer.bind<Iloaders>(TYPES_LOADERS.LOADERS).to(Loaders);

export const LOADER_CONTAINER = loadersContainer.get<Iloaders>(TYPES_LOADERS.LOADERS);

import { Container } from "inversify";
import { TYPES_LOG } from "./types/log.types";
import { Logging } from "./logging";
import { Ilogging } from "./interface/logging.interface";

const container = new Container();

container.bind<Ilogging>(TYPES_LOG.LOG).to(Logging);

export const LOG_CONTAINER = container.get<Ilogging>(TYPES_LOG.LOG);

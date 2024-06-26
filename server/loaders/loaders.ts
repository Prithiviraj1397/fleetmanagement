import { inject, injectable } from "inversify";
import { Iloaders } from "./database/loaders.interface";
import { TYPES_LOADERS } from "./types/loaders.types";
import { IserverConnection } from "./server/interfaces/server.connection.interface";
import { LOG_CONTAINER } from "../log/logging.container";

@injectable()
export class Loaders implements Iloaders{
    private server:IserverConnection;
    constructor(@inject(TYPES_LOADERS.SERVER_CONNECT) server :IserverConnection ){
        this.server = server;
    }

    connectLoaders(): void {
        try {
            this.server.connect()            
        } catch (error) {
            LOG_CONTAINER.logError(`Connect loaders ${error}`)
        }
    }
}

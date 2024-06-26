import express, { Express } from 'express';
import { IserverConnection } from './interfaces/server.connection.interface';
import { injectable } from 'inversify';
import { LOG_CONTAINER } from '../../log/logging.container';


@injectable()
export class ServerConnection implements IserverConnection {  
  private readonly app:Express;
  private readonly port:string = process.env.SERVER_PORT ? process.env.SERVER_PORT : "4000" ;  

  constructor() {
    this.app = express()  
  }

  connect():boolean{
    try {
      this.app.get("/", (req, res)=>{
        res.send("Server is working.....")
        res.end()
      })
      this.app.listen(this.port, async() => {        
        LOG_CONTAINER.logInfo(`Server is listening at ${process.env.SERVER_URL}:${this.port}`)                
      });
      return true
    } catch (error) {      
      LOG_CONTAINER.logError(`Server connection failed ${error}`)
      return false      
    }
  }    
}

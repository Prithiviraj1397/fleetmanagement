import dotenv from 'dotenv'; 
import path from 'path';

const env:string           = process.env.NODE_ENV || 'development';
const envFilePath:string   = path.resolve(__dirname, `../envConfig/.env.${env}`);

dotenv.config({ path: envFilePath, debug: false  });

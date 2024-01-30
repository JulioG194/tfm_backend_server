import {connect} from 'mongoose';
import databaseConfig from './db.config';
import { logger } from '../../core/shared/Logger';

const { username, password, uri, database, port } = databaseConfig;

//const mongoURI = `mongodb+srv://${username}:${password}@${uri}/${database}`;
const mongoURI = `mongodb://${username}:${password}@${uri}:${port}/${database}`;

const connection = async (): Promise<void> => {
    try {
      await connect(mongoURI);
      logger.info("Connected to MongoDB");
    } catch (error) {
      logger.error("Error connecting to MongoDB", error);
    }
  };
  
  export default connection;
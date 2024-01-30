import {connect} from 'mongoose';
import databaseConfig from './db.config';
import { logger } from '../../core/shared/Logger';

const { username, password, uri, database, port } = databaseConfig;

//const mongoURI = `mongodb+srv://${username}:${password}@${uri}/${database}`;
const mongoURI = `mongodb://${username}:${password}@${uri}:${port}/${database}?authSource=admin`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10, // Número de conexiones en el pool
  serverSelectionTimeoutMS: 5000, // Tiempo de espera para la selección del servidor
  socketTimeoutMS: 45000, // Tiempo de espera para las operaciones después de conectarse
};

const connection = async (): Promise<void> => {
    try {
      await connect(mongoURI, options );
      logger.info("Connected to MongoDB");
    } catch (error) {
      logger.error("Error connecting to MongoDB", error);
    }
  };
  
  export default connection;
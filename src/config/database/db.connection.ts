// import {connect} from 'mongoose';
import databaseConfig from './db.config';
/* import { logger } from '../../core/shared/Logger';
import { BaseError } from '../../core/types/Responses/BaseError';
import { HttpStatusCode } from '../../core/types/HttpStatusCode'; */

const { username, password, uri, database, port } = databaseConfig;

//const mongoURI = `mongodb+srv://${username}:${password}@${uri}/${database}`;
const mongoURI = `mongodb://${username}:${password}@${uri}:${port}/${database}?authSource=admin`;

const options = {
  serverSelectionTimeoutMS: 5000, // Tiempo de espera para la selección del servidor
  socketTimeoutMS: 45000, // Tiempo de espera para las operaciones después de conectarse
};

/* const connection = async (): Promise<void> => {
    try {
      await connect(mongoURI, options );
      logger.info("Connected to MongoDB");
    } catch (error) {
      logger.error("Error connecting to MongoDB", error);
      throw new BaseError('Error al establecer conexión a la base de datos', 
                          HttpStatusCode.INTERNAL_SERVER, 
                          'error connect mongodb', 
                          true);
    }
};
 */
const connectionStrs = { mongoURI, options }
  
export default connectionStrs;
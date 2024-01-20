import {connect} from 'mongoose';
import databaseConfig from './db.config';

const { username, password, uri, database } = databaseConfig;

const mongoURI = `mongodb+srv://${username}:${password}@${uri}/${database}`;

const connection = async (): Promise<void> => {
    try {
      await connect(mongoURI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB", error);
    }
  };
  
  export default connection;
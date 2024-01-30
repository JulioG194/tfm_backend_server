
require('dotenv').config();

export interface DatabaseConfig {
    username: string;
    password: string;
    database: string;
    port: string;
    uri: string;
  }
  

  //export default databaseConfig;
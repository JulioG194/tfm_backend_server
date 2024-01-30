
require('dotenv').config();

interface DatabaseConfig {
    username: string;
    password: string;
    database: string;
    port: string;
    uri: string;
  }
  
  const databaseConfig: DatabaseConfig = {
    username: process.env.DB_USERNAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? '',
    port: process.env.DB_PORT?? '',
    uri: process.env.DB_URI ?? '',
  };
  
  export default databaseConfig;
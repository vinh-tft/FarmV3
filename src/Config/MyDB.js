const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = {
  query: async (strings, ...values) => {
    await poolConnect;
    const request = pool.request();
    
    strings.forEach((str, i) => {
      if (i < values.length) {
        request.input(`param${i}`, values[i]);
      }
    });

    const query = strings.reduce((prev, curr, i) => {
      return prev + curr + (i < values.length ? `@param${i}` : '');
    }, '');

    return request.query(query);
  }
};

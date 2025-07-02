const sql = require('mssql');        
require('dotenv').config();        

// Tạo cấu hình kết nối
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

// Tạo pool kết nối
const pool = new sql.ConnectionPool(config);

// Bắt đầu kết nối
const poolConnect = pool.connect();

// Nếu kết nối có lỗi
pool.on('error', err => {
  console.error('❌ Lỗi kết nối SQL:', err);
});


module.exports = {
  sql,         
  pool,      
  poolConnect  
};
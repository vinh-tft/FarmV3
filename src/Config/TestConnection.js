// testConnection.jsnode src/Config/TestConnection.js
const { sql } = require('./MyDB');

require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

async function testConnection() {
    try {
        await sql.connect(config);
        console.log('✅ Kết nối SQL Server thành công!');
        await sql.close();
    } catch (err) {
        console.error('❌ Lỗi kết nối SQL Server:', err);
    }
}

testConnection();

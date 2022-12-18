const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'root',
    user:'root',
    password: 'FsTXfjG7ROVFz0uyR68sGBm9',
    database: 'blissful_lichterman'
});
const conn = pool;
// .getConnection()
module.exports = conn;

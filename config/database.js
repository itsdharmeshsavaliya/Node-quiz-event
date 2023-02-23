const { createPool } = require("mysql");

const pool = createPool({
    port:'3306',
    host:'localhost',
    user:'nrpapp_api',
    password:'Pawan@1234',
    database:'nrpapp_api',
    connectionLimit:300
});

module.exports = pool;
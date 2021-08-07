const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'anderson_laventure',
  host: 'localhost',
  database: 'postgres',
  password: 'camus123',
  port: '5432',
});

module.exports = pool;

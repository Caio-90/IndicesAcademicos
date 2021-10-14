const { Pool } = require('pg');

    const pool = new Pool({
        host: 'localhost', // server name or IP address;
        port: 5432,
        database: 'Indice',
        user: 'read_only_user',
        password: '436700'
    })
    module.exports = { pool }
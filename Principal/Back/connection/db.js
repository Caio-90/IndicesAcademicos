async function connect() {
    if (connection)
        return connection.connect();

    const { Pool } = require('pg');

    const pool = new Pool({
        host: 'localhost', // server name or IP address;
        port: 5432,
        database: 'Indice',
        user: 'read_only_user',
        password: '436700'
    });
    //guardando para usar sempre o mesmo
    var connection = Pool;
    return pool;
}

async function selectMatters() {
    const client = await connect();
    const res = await client.query('SELECT * FROM matters');
    //console.log(res.rows)
    return res.rows;
    
}

module.exports = { selectMatters }
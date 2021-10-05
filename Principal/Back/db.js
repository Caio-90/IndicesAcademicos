async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');

    const pool = new Pool({
        host: 'localhost', // server name or IP address;
        port: 5432,
        database: 'Indice',
        user: 'read_only_user',
        password: '436700'
    });
    
    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await client.query('SELECT NOW()');
    console.log(res.rows);
    client.release();

    //guardando para usar sempre o mesmo
    global.connection = Pool;
    return pool.connect();
}
connect()

async function selectMatters() {
    const client = await connect();
    const res = await client.query('SELECT * FROM matters');
    return res.rows;
}
 
module.exports = { selectMatters }
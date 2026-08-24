import { Client } from 'pg';

async function query(queryObject) {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    });
    console.log("Credenciais do Postgres: ", {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    });
    
    try {
        await client.connect();
        const result = await client.query(queryObject);
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    } finally {
        await client.end();
    }
}

async function getPostgresVersion() {
  const result = await query('SHOW server_version;');
  return result.rows[0].server_version;
}

async function getMaxConnections() {
  const result = await query('SHOW max_connections');
  return Number(result.rows[0].max_connections);
}

async function getOpenedConnections() {
  const dbName = process.env.POSTGRES_DB;
  const result = await query({
    text: 'SELECT COUNT(*)::int AS opened_connections FROM pg_stat_activity WHERE datname = $1;',
    values: [dbName],
  });
  return result.rows[0].opened_connections;
}

export default {
    query: query,
    getPostgresVersion: getPostgresVersion,
    getMaxConnections: getMaxConnections,
    getOpenedConnections: getOpenedConnections,
};
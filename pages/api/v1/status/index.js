import database from "/infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbVersion = await database.getPostgresVersion();
  const dbMaxConnections = await database.getMaxConnections();
  const dbOpenedConnections = await database.getOpenedConnections();  

  response.status(200).send({
    updated_at: updatedAt,
    dependencies: {
      database: {        
        max_connections: dbMaxConnections,
        opened_connections: dbOpenedConnections,
        version: dbVersion,
      },
    },
  });
}

export default status;
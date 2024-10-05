import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseName = process.env.POSTGRES_DB;

  const results = await database.query({
    text: `SELECT current_setting('server_version') AS version,
      current_setting('max_connections') AS max_connections,
      (SELECT COUNT(*)::int AS active_connections FROM pg_stat_activity WHERE datname=$1);`,
    values: [databaseName],
  });

  const { version, max_connections, active_connections } = results.rows[0];

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version,
        max_connections: parseInt(max_connections),
        active_connections,
      },
    },
  });
}

export default status;

const { Pool } = require("pg");

async function query(queryObject) {
  const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });

  try {
    const result = await pool.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
}

module.exports = {
  query: query,
}

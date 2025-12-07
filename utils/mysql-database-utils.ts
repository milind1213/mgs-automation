import mysql from 'mysql2/promise';

const getDbConfig = () => ({
  host: '',
  user: '',
  password: '',
  database: '',
});

export async function executeQuery(sqlQuery: string): Promise<any[]> {
  let connection;
  try {
    connection = await mysql.createConnection(getDbConfig());
    const [rows] = await connection.execute(sqlQuery);
    return Array.isArray(rows) ? rows : [];
  } catch (err) {
    console.error('DB Error:', err);
    return [];
  } finally {
    if (connection) await connection.end();
  }
}

export async function getDataArray(sqlQuery: string): Promise<any[]> {
  const rows = await executeQuery(sqlQuery);
  return rows || [];
}

export async function getData(sqlQuery: string): Promise<string> {
  const rows = await executeQuery(sqlQuery);
  if (!rows || !rows.length) return '';
  const firstRow = rows[0];
  const firstKey = Object.keys(firstRow)[0];
  return String(firstRow[firstKey] || '');
}

export async function getFirstRow(sqlQuery: string): Promise<any> {
  const rows = await executeQuery(sqlQuery);
  return rows && rows.length ? rows[0] : {};
}
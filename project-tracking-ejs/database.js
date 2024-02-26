import mysql from 'mysql2'

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'rpk',
  password: 'rpk123',
  database: 'ptrackdb',
}).promise()

export async function getAllrecords() {
  const [rows] = await pool.query("select * from vwsts")
  return rows
}

export async function getmaxid() {
  const [rows] = await pool.query(`select max(pid) pid  from preg`)

  return rows[0]
}


export async function getarecord(id) {
  const [rows] = await pool.query(`select pid, ptitle from preg where pid = ?`, [id])
  return rows[0]
}
export async function insertRecord(pid, ptitle) {

  try {
    await pool.query('BEGIN')
    const result1 = await pool.query(`
    INSERT INTO preg (pid, ptitle)
    VALUES (?, ?)
    `, [pid, ptitle])

    const result2 = await pool.query(`
    INSERT INTO pdet (pid, status)
    VALUES (?, 'open')
    `, [pid])
    await pool.query('COMMIT')  
  } catch (error) {
    await pool.query('ROLLBACK')
    throw(error)
  }
  finally{
    pool.releaseConnection()
  }
}

export async function updateRecord(pid, status) {
  const [result] = await pool.query(`
    INSERT INTO pdet (pid,status) VALUES (?,?)
    `, [pid, status])
  return result
}

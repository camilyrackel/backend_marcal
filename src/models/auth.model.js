const client = require('../database/');

class AuthModel {
  async login(username, password) {
    const conn = await client.conectar();
    const sql = 'SELECT * FROM public.users WHERE username=$1 AND password=$2;';
    const values = [username, password];
    const data = await conn.query(sql, values);

    return data.rows[0];
  }

}

module.exports = new AuthModel();
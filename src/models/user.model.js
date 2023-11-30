const client = require('../database/');

class UserModel {
  async index() {
    const conn = await client.conectar();
    const data = await conn.query('SELECT * FROM public.users');
    return data.rows;
  }

  async save(name, username, password) {
    const conn = await client.conectar();
    if (conn) {
      const sql = 'INSERT INTO public.users(name, username, password) VALUES ($1,$2,$3);';
      const values = [name, username, password];
      const result = await conn.query(sql, values);
      return result;
    } else {
      console.log('Não foi possível estabelecer a conexão.');
      return null;
    }
  }

  async find(id) {
    const conn = await client.conectar();
    const sql = 'SELECT * FROM public.users WHERE id=$1;';
    const values = [id];
    const data = await conn.query(sql, values);
    return data.rows;
  }

  async update(id, user) {
    const conn = await client.conectar();
    const sql = 'UPDATE public.users SET name=$1, username=$2, password=$3 WHERE id=$4';
    const values = [user.name, user.username, user.password, id];
    return await conn.query(sql, values);
  }

  async remove(id) {
    const conn = await client.conectar();
    const sql = 'DELETE FROM public.users where id=$1;';
    return await conn.query(sql, [id]);
  }

  async checkUserExists(username) {
    const conn = await client.conectar();
    const sql = 'SELECT * FROM public.users WHERE username=$1;';
    const values = [username];
    const data = await conn.query(sql, values);
    return data.rows.length > 0
  }
}

module.exports = new UserModel();
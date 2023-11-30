const client = require('../database');

class ContactModel {
  async index() {
    const conn = await client.conectar();
    const data = await conn.query('SELECT * FROM contacts');
    return data.rows;
  }
  async save(nome, telefone) {
    const conn = await client.conectar();
    const sql = 'INSERT INTO contacts(nome, telefone) VALUES ($1,$2);';
    const values = [nome, telefone];
    return await conn.query(sql, values);
  }

  async find(id) {
    const conn = await client.conectar();
    const sql = 'SELECT * FROM contacts WHERE id=$1;';
    const values = [id];
    const data = await conn.query(sql, values);
    return data.rows;
  }

  async update(id, contact) {
    const conn = await client.conectar();
    const sql = 'UPDATE contacts SET nome=$1, telefone=$2 WHERE id=$3';
    const values = [contact.nome, contact.telefone, id];
    return await conn.query(sql, values);
  }

  async remove(id) {
    const conn = await client.conectar();
    const sql = 'DELETE FROM contacts where id=$1;';
    return await conn.query(sql, [id]);
  }
}

module.exports = new ContactModel();
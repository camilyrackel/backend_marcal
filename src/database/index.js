const { Pool } = require('pg');

async function conectar() {

  const pool = new Pool({
    //Padrão da url: postgres://aluno_[matrícula]:[Seis primeiros digitos do CPF]@l177.136.201.182:5439/temp?schema=aluno_[matrícula]
    connectionString: 'postgres://Aluno_20191214010032:708280@177.136.201.182:5439/temp?schema=aluno_20191214010032'
  });

  //apenas testando a conexão
  const client = await pool.connect();
  console.log("Criou pool de conexões no PostgreSQL!");


  return client;
}

module.exports = { conectar }
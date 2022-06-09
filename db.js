const mysql = require('mysql2/promise')

async function conectar()
{
    if(global.conexao && global.conexao.state != 'disconnected'){
        return global.conexao
    }

    const strConexao = 'mysql://root:@localhost:3306/livraria'

    const conexao = await mysql.createConnection(strConexao)
    global.conexao = conexao
    return global.conexao
}

async function listarLivros()
{
    const con = await conectar()
    const [livros] = await con.query('SELECT * FROM livros')
    return livros
}

async function buscarLivro(id){
    const con = await conectar()
    const sql = 'select * from livros where livcodigo=?'
    const [livro] = await con.query(sql,[id])
    return livro && livro.length>0 ? livro[0] : {}
}

async function inserirLivro(livro){
    const con = await conectar()
    const sql = 'insert into livros (livtitulo, livano, gencodigo) values (?,?,?);'
    return await con.query(sql, [livro.titulo, livro.ano, livro.genero])
}

conectar()

module.exports = {listarLivros, buscarLivro, inserirLivro}
global.db = require('./db')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const port = 3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// definição das rotas
const router = express.Router()

app.get('/', (req, res) => res.json({ mensagem: 'Funcionou' }))

router.get('/listaLivros', async (req, res) => {
    const resultado = await global.db.listarLivros()
    res.json( resultado )
})

router.get('/livro/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const livro = await global.db.buscarLivro(id)
    res.json(livro)
})

router.post('/inserirLivro', async (req, res) => {
    const titulo = req.body.titulo
    const ano = parseInt(req.body.ano)
    const genero = parseInt(req.body.genero)

    const [cadastro] = await global.db.inserirLivro({titulo, ano, genero})
    const livro = await global.db.buscarLivro(cadastro.insertId)
    res.json(livro)
}) 

app.use('/', router)
app.listen(port) 
console.log('API funcionou!!')

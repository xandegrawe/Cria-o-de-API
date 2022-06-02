global.db = require('./db')

const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// definição das rotas
const router = express.Router()

app.get('/', (req, res) => res.json({ mensagem: 'Funcionou' }))

router.get('/listaLivros', async (req, res) => {
    const resultado = await global.db.listarLivros()
    res.json( resultado )
})


app.use('/', router)
app.listen(port) 
console.log('API funcionou!!')

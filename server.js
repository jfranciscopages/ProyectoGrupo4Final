import express from 'express'
import RouterClientes from './router/clientes.js'
import RouterPropiedades from './router/propiedades.js'
import config from './config.js'
import CnxMongoDB from './model/DBMongo.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/clientes', new RouterClientes().start())
app.use('/api/propiedades', new RouterPropiedades().start())

if(config.MODO_PERSISTENCIA == 'MONGODB'){
    await CnxMongoDB.conectar()
}

const PORT = config.PORT
const server = app.listen(PORT, () => console.log(`Servidor ApiRestful escuchando en http://localhost:${PORT}`))
server.on('error', error => console.log(`Error en servidor: ${error.message}`))

import { ClientEncryption, MongoClient } from 'mongodb'
import config from '../config.js'


class CnxMongoDB{
    static connectionOk = false
    static db = null

    static conectar = async _ => {
        try{
            console.log('Conectando a la base de datos...')
            const client = new MongoClient(config.STRCNX)
            await client.connect()
            console.log('Base de datos conectada!')

            CnxMongoDB.db = client.db(config.BASE)
            CnxMongoDB.connectionOk = true
        }
        catch (error) {
            console.log(`Error en la conexión de base de datos: ${error.message}`)
        }
    }
}

export default CnxMongoDB
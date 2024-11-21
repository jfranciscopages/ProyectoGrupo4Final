import ModelMongoDB from "./clientesMongoDB.js"

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case 'MONGODB':
                console.log('*** (Clientes) Persistiendo en MongoDB ***')
                return new ModelMongoDB('clientes.json')

            default:
/*              console.log('*** Persistiendo en Memoria (default) ***')
                return new ModelMem() */
        }
    }
}

export default ModelFactory
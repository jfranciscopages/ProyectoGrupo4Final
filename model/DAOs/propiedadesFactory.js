import ModelMongoDB from "./propiedadesMongoDB.js"

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case 'MONGODB':
                console.log('*** (Propiedades) Persistiendo en MongoDB ***')
                return new ModelMongoDB('propiedades.json')

            default:
/*              console.log('*** Persistiendo en Memoria (default) ***')
                return new ModelMem() */
        }
    }
}

export default ModelFactory
import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelMongoDB {
    constructor() {}

    obtenerClientes = async () => {
        if(!CnxMongoDB.connectionOk) throw Error ('ERROR CNX BASE DE DATOS')
        const clientes = await CnxMongoDB.db.collection('clientes').find({}).toArray()
        return clientes       
    }

    obtenerCliente = async id => {
        if(!CnxMongoDB.connectionOk) throw Error ('ERROR CNX BASE DE DATOS')
        const cliente = await CnxMongoDB.db.collection('clientes').findOne({_id: ObjectId.createFromHexString(id)})
        return cliente
    }

    guardarCliente = async cliente => {
        if(!CnxMongoDB.connectionOk) throw Error ('ERROR CNX BASE DE DATOS')

        await CnxMongoDB.db.collection('clientes').insertOne(cliente)
        return cliente
    }
}

export default ModelMongoDB
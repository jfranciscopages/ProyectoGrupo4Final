import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelMongoDB {
    constructor() {}

    obtenerPropiedades = async () => {
        if(!CnxMongoDB.connectionOk) throw Error ('ERROR CNX BASE DE DATOS')
        const propiedades = await CnxMongoDB.db.collection('propiedades').find({}).toArray()
        return propiedades       
    }

    obtenerPropiedad = async id => {
        if(!CnxMongoDB.connectionOk) throw Error ('ERROR CNX BASE DE DATOS')
        //const producto = await CnxMongoDB.db.collection('productos').findOne({_id: new ObjectId(id)})
        const propiedad = await CnxMongoDB.db.collection('propiedades').findOne({_id: ObjectId.createFromHexString(id)})
        return propiedad
    }

    guardarPropiedad = async propiedad => {
        if(!CnxMongoDB.connectionOk) throw Error ('ERROR CNX BASE DE DATOS')

        await CnxMongoDB.db.collection('propiedades').insertOne(propiedad)
        return propiedad
    }

    actualizarPropiedad = async (id, propiedad) => {
        if(!CnxMongoDB.connectionOk) throw Error ('ERROR CNX BASE DE DATOS')

        await CnxMongoDB.db.collection('propiedades').updateOne(
            {_id: ObjectId.createFromHexString(id)}, 
            {$set: propiedad }
        )
        const propiedadActualizada = await this.obtenerPropiedad(id)
        return propiedadActualizada
    }

    borrarPropiedad = async id => {
        if(!CnxMongoDB.connectionOk) throw Error ('ERROR CNX BASE DE DATOS')

        const propiedadBorrada = await this.obtenerPropiedad(id)
        await CnxMongoDB.db.collection('propiedades').deleteOne({_id: ObjectId.createFromHexString(id)})
        return propiedadBorrada
    }

    // Obtener el precio promedio por zona
    obtenerPrecioPromedioPorBarrio = async () => {
        if (!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS');
        
        const resultado = await CnxMongoDB.db.collection('propiedades').aggregate([
            {
                $group: {
                    _id: "$barrio",  // Agrupamos por barrio
                    promedio_precio: { $avg: "$precio" }  // Calculamos el promedio del precio
                }
            }
        ]).toArray();

        return resultado;
    };
}

export default ModelMongoDB
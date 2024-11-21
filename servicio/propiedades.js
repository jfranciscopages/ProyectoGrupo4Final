import ModelFactory from "../model/DAOs/propiedadesFactory.js"
import ExcelJS from 'exceljs';

import config from '../config.js'
import { validar } from "./validaciones/propiedades.js"

class Servicio {
    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }


    obtenerPropiedades = async id => {
        if (id) {
            const propiedad = await this.model.obtenerPropiedad(id)
            return propiedad
        }
        else {
            const propiedades = await this.model.obtenerPropiedades()
            return propiedades
        }
    }

    guardarPropiedad = async propiedad => {
        //validación específica del propiedad a guardar 
        const rta = validar(propiedad)
        if (rta.result) {
            const propiedadGuardada = await this.model.guardarPropiedad(propiedad)
            return propiedadGuardada
        }
        else {
            throw rta.error
        }
    }

    actualizarPropiedad = async (id, propiedad) => {
        const propiedadActualizada = await this.model.actualizarPropiedad(id, propiedad)
        return propiedadActualizada
    }

    borrarPropiedad = async id => {
        const propiedadEliminada = await this.model.borrarPropiedad(id)
        return propiedadEliminada
    }

    // Obtener el precio promedio por barrio
    obtenerPrecioPromedio = async () => {
        try {
            const preciosPromedio = await this.model.obtenerPrecioPromedioPorBarrio();
            return preciosPromedio;
        } catch (error) {
            throw new Error('Error al obtener el precio promedio por barrio: ' + error.message);
        }
    }

    // Generar un archivo Excel con los precios promedio por barrio
    generarExcelPrecioPromedio = async () => {
        try {
            // Obtenemos los precios promedio por barrio
            const preciosPromedio = await this.obtenerPrecioPromedio();

            // Creamos un nuevo libro de Excel
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Precios Promedio por Barrio');

            // Definimos las columnas del Excel
            worksheet.columns = [
                { header: 'Barrio', key: 'barrio', width: 20 },
                { header: 'Precio Promedio', key: 'precio_promedio', width: 20 }
            ];

            // Agregamos las filas de datos
            preciosPromedio.forEach(item => {
                worksheet.addRow({ barrio: item._id, precio_promedio: item.promedio_precio });
            });

            // Generamos el archivo Excel y lo devolvemos como buffer
            const buffer = await workbook.xlsx.writeBuffer();
            return buffer;
        } catch (error) {
            throw new Error('Error al generar el archivo Excel: ' + error.message);
        }
    }

}

export default Servicio

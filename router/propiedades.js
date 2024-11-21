import express from 'express'
import Controlador from '../controlador/propiedades.js'

class Router {
    constructor() {
        this.controlador = new Controlador()
    }

    start() {
        const router = express.Router()

        router.get('/precio-promedio', this.controlador.obtenerPrecioPromedio); // Ruta para precios promedio
        router.get('/precio-promedio/excel', this.controlador.generarExcelPrecioPromedio); // Ruta para generar y descargar el archivo Excel con los precios promedio
        router.get('/:id?', this.controlador.obtenerPropiedades)
        router.post('/', this.controlador.guardarPropiedad)
        router.put('/:id', this.controlador.actualizarPropiedad)
        router.delete('/:id', this.controlador.borrarPropiedad)


        return router
    }
}

export default Router
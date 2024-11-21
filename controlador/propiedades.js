import Servicio from '../servicio/propiedades.js'


class Controlador {
    constructor() {
        this.servicio = new Servicio()
    }

    obtenerPropiedades = async (req,res) => {
        try {
            const { id } = req.params
            const propiedades = await this.servicio.obtenerPropiedades(id)
            res.json(propiedades)
        }
        catch (error){
            res.status(500).json({error: error.message})
        }
    }

    guardarPropiedad = async (req,res) => {
        try {
            const propiedad = req.body

            if(!Object.keys(propiedad).length) throw new Error('Propiedad vacía')

            const propiedadGuardada = await this.servicio.guardarPropiedad(propiedad)
            res.json(propiedadGuardada)
        }
        catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    actualizarPropiedad = async (req,res) => {
        const { id } = req.params
        const propiedad = req.body
        const propiedadActualizada = await this.servicio.actualizarPropiedad(id, propiedad)
        res.json(propiedadActualizada)
    }

    borrarPropiedad = async (req,res) => {
        const { id } = req.params
        const propiedadEliminada = await this.servicio.borrarPropiedad(id)
        res.json(propiedadEliminada)
    }

    // Obtener el precio promedio por barrio
    obtenerPrecioPromedio = async (req, res) => {
        try {
            const preciosPromedio = await this.servicio.obtenerPrecioPromedio();
            res.json(preciosPromedio);  // Devolvemos los precios promedio como respuesta
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Generar y descargar el archivo Excel con los precios promedio por barrio
    generarExcelPrecioPromedio = async (req, res) => {
        try {
            const excelBuffer = await this.servicio.generarExcelPrecioPromedio();

            // Establecemos las cabeceras para indicar que es un archivo Excel
            res.setHeader('Content-Disposition', 'attachment; filename=precios_promedio_barrio.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            
            // Enviamos el buffer como archivo Excel
            res.send(excelBuffer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default Controlador
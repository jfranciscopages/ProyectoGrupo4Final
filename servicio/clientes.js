import ModelFactory from "../model/DAOs/clientesFactory.js"
import { validar } from "./validaciones/clientes.js"
import config from '../config.js'
import Notificaciones from "../utilitarios/notificaciones.js"

class Servicio {
    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
        this.notificador = new Notificaciones()
    }
 
    obtenerClientes = async id => {
        if (id) {
            const cliente = await this.model.obtenerCliente(id)
            return cliente
        }
        else {
            const clientes = await this.model.obtenerClientes()
            return clientes
        }
    }

    guardarCliente = async cliente => {
        //validación específica del cliente a guardar 
        const rta = validar(cliente)
        if (rta.result) {
            const clienteGuardado = await this.model.guardarCliente(cliente)
            this.notificador.enviarNotificacionBienvenida(clienteGuardado)
            return clienteGuardado
        }
        else {
            throw rta.error
        }
    }

}

export default Servicio
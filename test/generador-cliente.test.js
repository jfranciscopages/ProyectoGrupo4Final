import { expect } from 'chai'
import generador from './generador/cliente.js'


describe('* test del generador de cliente *', () => {
    it('el cliente debe tener los campos nombre, apellido, mail y celular', async () => {
        const cliente = generador.get()

        expect(cliente).to.include.keys('nombre', 'apellido', 'mail', 'celular')
    })

    it('deberia generar clientes aleatorios', async () => {
        const cliente1 = generador.get()
        const cliente2 = generador.get()

        expect(cliente1.nombre).not.to.eql(cliente2.nombre)
        expect(cliente1.apellido).not.to.eql(cliente2.apellido)
        expect(cliente1.mail).not.to.eql(cliente2.mail)
        expect(cliente1.celular).not.to.eql(cliente2.celular)
    })
})

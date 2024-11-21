import supertest from "supertest"
import { expect } from 'chai'
import generador from './generador/cliente.js'

const request = supertest('http://127.0.0.1:8080')

describe('test apirestful', () => {
    describe('GET', () => {
        it('total: deberia retornar un status 200', async () => {
            const response = await request.get('/api/clientes/')
            expect(response.status).to.eql(200)
        })

        it('id: deberia retornar un status 200', async () => {
            const response = await request.get('/api/clientes/6733f19042dbc7b2260d24cd')
            expect(response.status).to.eql(200)
        })
    })

    describe('POST', () => {
        it('deberia incorporar un cliente', async () => {
            const clienteEnviado = generador.get()

            const response = await request.post('/api/clientes').send(clienteEnviado)
            expect(response.status).to.eql(200)

            const clienteGuardado = response.body
            expect(clienteGuardado).to.include.keys('nombre', 'apellido', 'mail', 'celular')
            
            expect(clienteEnviado.nombre).to.eql(clienteGuardado.nombre)
            expect(clienteEnviado.apellido).to.eql(clienteGuardado.apellido)
            expect(clienteEnviado.mail).to.eql(clienteGuardado.mail)
            expect(clienteEnviado.celular).to.eql(clienteGuardado.celular)
        })
    })
})

import Joi from 'joi'

export const validar = cliente => {

    const clienteSchema = Joi.object({
        nombre: Joi.string().alphanum().required(),
        apellido: Joi.string().alphanum().required(),
        mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        celular: Joi.string().required()
    })

    const { error } = clienteSchema.validate(cliente)
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}
import Joi from 'joi'

export const validar = propiedad => {

    const propiedadSchema = Joi.object({
        barrio: Joi.string().alphanum().required(),
        calle: Joi.string().alphanum().required(),
        altura: Joi.number().integer().min(0).max(9999999).required(),
        superficie: Joi.number().integer().min(0).max(999).required(),
        precio: Joi.number().min(0).max(1000000).required(),

    })

    const { error } = propiedadSchema.validate(propiedad)
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}
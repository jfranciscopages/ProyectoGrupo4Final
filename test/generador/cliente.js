import { faker } from "@faker-js/faker"

const get = _ => ({
    nombre: faker.person.firstName(),
    apellido: faker.person.lastName(),
    mail: faker.internet.email(),
    celular: faker.phone.number()

})

export default {
    get
}
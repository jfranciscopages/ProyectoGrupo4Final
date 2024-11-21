import config from '../config.js'
/* import twilio from 'twilio' */
import sgMail from '@sendgrid/mail'

/* Your AccountSID and Auth Token from console.twilio.com */
class Notificaciones {
    constructor() {
        //const client = twilio(config.accountSid, config.authToken)
    }

/*     enviarNotificacion = async (mensaje,telefonoDestino)=>{
        try {
            const client = twilio(config.accountSid, config.authToken)
            console.log(mensaje)
            console.log(telefonoDestino)
            console.log(client)
            const message = await client.messages.create({
              body: mensaje,
              to: telefonoDestino, //VER DE PASARLO A UNA VARIABLE
              from: config.twilioPhone, //NUMERO DE TWILIO
            });
            console.log(message);
            return message
          } catch (error) {
            // You can implement your fallback code here
            console.error(error);
          }
    } */
      enviarNotificacionBienvenida = async (cliente)=>{
        try {
            const asunto = `Bienvenido ${cliente.nombre} ${cliente.apellido}`
            const mensaje = `Bienvenido ${cliente.nombre} ${cliente.apellido} a nuestro sistema.`
            const maildestino = cliente.mail
            this.enviarNotificacion(asunto,mensaje,maildestino)
          } catch (error) {
            console.error(error);
          }
        }
        enviarNotificacion = async (asunto,mensaje,mailDestino)=>{
          try {
            
              sgMail.setApiKey(process.env.SENDGRID_API_KEY)
              const msg = {
                to: mailDestino, // Change to your recipient
                from: process.env.SENDGRIP_SENDER, // Change to your verified sender
                subject: asunto,
                text: mensaje,
                html: `<strong>${mensaje}</strong>`,
              }
              console.log(msg)
              const response = await sgMail.send(msg)
              console.log(response)
            } catch (error) {
              console.error(error);
            }
          }
}

export default Notificaciones

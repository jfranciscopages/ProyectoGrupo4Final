import dotenv from 'dotenv'

dotenv.config()

//console.log(process.env)

const PORT = process.env.PORT || 8080
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA 
const STRCNX = process.env.STRCNX || 'mongodb://127.0.0.1'
const BASE = process.env.BASE || 'test'
/* const accountSid = process.env.accountSid || ''
const authToken = process.env.authToken || ''
const twilioPhone = process.env.twilioPhone || '' */
const SENDGRID_API_KEY=process.env.SENDGRID_API_KEY || ''
const SENDGRIP_SENDER=process.env.SENDGRIP_SENDER || ''



export default {
    PORT,    
    MODO_PERSISTENCIA,
    STRCNX,
    BASE,
    SENDGRID_API_KEY,
    SENDGRIP_SENDER

}
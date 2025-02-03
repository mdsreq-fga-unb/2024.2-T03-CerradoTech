import nodemailer from 'nodemailer'
import { host, port, user, pass } from '../config/mail.json'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'

class Mailer {
    public transport:any;

    constructor(){
        this.transport = nodemailer.createTransport({
            host,
            port,
            auth: { user, pass }
        });

        this.transport.use('compile', hbs({
            viewEngine: {
                defaultLayout: undefined,
                partialsDir: path.resolve('./src/resources/mail/')
                // 'handlebars'
            },
            viewPath: path.resolve('./src/resources/mail/'),
            extName: '.html',
        }))
    }

    

    

}

export default new Mailer()
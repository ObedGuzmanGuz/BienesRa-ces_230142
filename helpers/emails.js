import nodemailer from 'nodemailer'


const emailRegistro= async(datos) =>{
        const transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const {email, nombre, token }= datos

        // enviar el email
        await transport.sendMail({
            from: 'Bienesraices.com',
            to: email,
            subject: 'Confirma tu cuenta en bienes raices',
            text: 'Confrima tu cuenta en BienesRaices.com',
            html: `
                <p>Hola ${nombre}, comprueba tu cuenta en bienesRaices.com </p>
                <p>Tu cuenta ya esta Lista, solo debes confirmar en el siguiente enlace:
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/usuario/confirmar/${token}">Confirmr cuenta<a/></p>
                
                <p> Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
                 
                <img src="/images/bienes.png" alt="Bines Raices" width="50px" height="50px">
                <h2> BienesRaices@gmail.com</h2>
                <h2> Telefono: 7641102521</h2>
                
                `
        })



}


export{


    emailRegistro
}




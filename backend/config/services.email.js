const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'jaym3gd2431@gmail.com',
        pass: process.env.EMAIL_PASS || 'ujyt orsy nnbu uwbo'
    }
})

function mailSettings(messenger, receptor, subject, htmlContent) {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: messenger,
            to: receptor,
            subject: subject,
            html: htmlContent
        }

        try {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("❌ Error al enviar el correo:", error);
                    reject(error);
                } else {
                    console.log("✅ Correo enviado:", info.response);
                    resolve(info.response);
                }
            });
        } catch (error) {
            console.error("❌ Error en el envío del correo:", error);
            reject(error);
        }
    })
}

module.exports = {
    mailSettings
    };
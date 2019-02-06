const moment = require('moment');
const nodemailer = require('nodemailer');
function Welcome(data,typo,lengthJson) {
    let html, subject;
    moment.locale('es');
    const time =  moment().format("llll");
    const transporter = nodemailer.createTransport({
        // example with google mail service
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'creatika360@gmail.com',
            pass: 'b4yl1n3r'
        }
    });
    if(typo==="load"){
        subject = "Bienvenid@ a nuestro Sistema " + data.exp ;
        html = '<h1> Hemos recibido tus datos para mentenerte informad@</h1>' +
            '<p> Expediente: ' + data.exp + '</p>' +
            '<p> Fecha Nac.: ' + data.dia + '-' + data.mes + '-' + data.anio + '</p>' +
            '<p> Email: ' + data.email + '</p>' +
            '<p> Gracias por usar nuestra WebApp, por favor si notas algo extraño, no dudes en notificarme, respondiendo en este correo cualquier novedad o inconveniente</p>' +
            '<p style="font-size: 11px">Registro Realizado el: ' + time + '</p>' ;
    }

    let mailOptions = {
        from: 'creatika360@gmail.com',
        to: data.email,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error); } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = Welcome;
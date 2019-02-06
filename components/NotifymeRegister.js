const moment = require('moment');
const nodemailer = require('nodemailer');
function NotifymeRegister(data,typo,lengthJson) {
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
        subject = "Nuevo Registro Sistema " + data.exp ;
        html = '<h1> Se ha Registrado un Nuevo Expediente</h1>' +
            '<p> Expediente: ' + data.exp + '</p>' +
            '<p> Fecha Nac.: ' + data.dia + '-' + data.mes + '-' + data.anio + '</p>' +
            '<p> Email: ' + data.email + '</p>' +
            '<p> Registro Realizado el: ' + time + '</p>';
    } else {
        subject = "Se ha procesado el envio de Email";
        html = '<h1> Se ha realizado el envio de Emails</h1>' +
            '<p> Cantidad de Email enviados: ' + lengthJson + '</p>' +
            '<p> Consulta realizada el: ' + time + '</p>';
    }

    let mailOptions = {
        from: 'creatika360@gmail.com',
        to: 'adalbeca@gmail.com',
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error); } else {
            console.log('Notificacion Email: ' + info.response);
        }
    });
}

module.exports = NotifymeRegister;
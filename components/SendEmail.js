const config = require('./config');
async function SendEmail(email, nombre, inicio, vencimiento, resuelto, renovarPrecaria) {
    let html, subject, alerta;
    const nodemailer = require('nodemailer');
    let moment = require('moment');
    moment.locale('es');
    const now = moment().format("llll");

    const transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: config.email,
            pass: config.password
        }
    });

    if(vencimiento!==""){ vencimiento=inicio }
    const [vfirst, vsecond] = vencimiento.split(' ').map(item => item.trim());
    const [vday, vmonth, vyear] = vfirst.split('/');
    const daysFromToday = moment(vyear + vmonth + vday, "YYYYMMDD").fromNow();
    const [a, dias, c] = daysFromToday.split(' ').map(item => item.trim());

    if (await resuelto === "EN TRAMITE") {
        if (dias <= 15 && renovarPrecaria !== "") {
            alerta = '<p><b>Tu Precaria Vence en ' + dias + ' dias, Recuerda que debes ingresar en nuestro sistema' +
                ' y renovar tu precaria </b> </p>' +
                ' <p> Para renovar tu precaria ingresa en <a href="http://midni.adalbeca.com">midni.adalbeca.com</a></p> ';
            subject = nombre + ' Tu Precaria esta por Vencer';
        } else {
            subject = nombre + " Hemos Revisado el Status de tu DNI";
            alerta = "<b> Gracias por usar nuestra Webapp</b>";
        }
        html = '<h1>Hola ' + nombre + '! </h1>' +
            '<p>Lamento informar que aun no ha cambiado el Status del Tramite!!! ' +
            'Pero no te preocupes, sigo atento revisando día a día, Pronto tendrás buenas noticias. </p>' +
            '<p> Usted inicio el tramite el dia ' + inicio + ' </p>' +
            '<p>Su Precaria vence el dia: ' + vencimiento + '</p>' + alerta +
            '<p style="font-size: 11px">La Consulta la hicimos el  ' + now + '</p>';
    } else if (resuelto === "INTIMADO") {
        subject = nombre + " URGENTE, Sobre tu Solicitud de DNI";
        html = '<h1>Hola ' + nombre + '! </h1>' +
            '<p>Queremos informarte que tu tramite requiere de atención ' +
            'El Status del tramite de tu DNI se encuentra INTIMADO, y requiere que te coloques en contacto con Migraciones. </p>' +
            '<p> Ingresa Urgentemente en nuestra Webapp e imprime la intimación y resuelve el tramite pronto...  <a href="http://midni.adalbeca.com">midni.adalbeca.com</a></p> ' +
            '<p style="font-size: 11px"> La Consulta la hicimos el ' + now + '</p>';
    } else {
        subject = nombre + " Buenas Noticias DNI Resuelto";
        html = '<h1>Hola ' + nombre + '! </h1>' +
            '<p>Tenemos una Excelente noticias!!! ' +
            'El Status del tramite de tu DNI ha sido Resuelto, así que Pronto tendrás el DNI en tus manos, Felicidades...</p>' +
            '<p> El Tramite fue resuelto el dia: ' + inicio + ' </p>' +
            '<p style="font-size: 11px"> La Consulta la hicimos el ' + now + '</p>';
    }

    let mailOptions = await {
        from: config.email,
        to: email,
        subject: subject,
        html: html
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
}

module.exports = SendEmail;


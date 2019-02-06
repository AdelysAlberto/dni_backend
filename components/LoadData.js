const fs = require('fs');
const NotifymeRegister = require('./NotifymeRegister');
const Welcome = require('./NewEmail');

function LoadData(datar) {
    try {
        const recibePost = {
            dia: datar.dia,
            mes: datar.mes,
            anio: datar.anio,
            exp: datar.exp,
            email: datar.email,
        };
        let datos = [];
        fs.readFile(__dirname + "/../api/" + "solicitudes.json", 'utf8', function (err, data) {
            datos = JSON.parse(data);
            NotifymeRegister(recibePost, "load", "1");
            Welcome(recibePost, "load", "1");
            let nuevadata = datos.push(recibePost);
            JSON.stringify(datos);
            writeConfig(datos);
        });

        function writeConfig(obj) {
            fs.writeFile(__dirname + "/../api/" + "solicitudes.json", JSON.stringify(obj, undefined, 2), (err) => {
                if (err) throw err;
            });
        }


    } catch (e) {
        console.log(e);
    }
}

module.exports = LoadData;
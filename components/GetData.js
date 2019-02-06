let request_promise = require('request-promise');
let cheerio = require('cheerio');

function correr(datar) {
    try {

        let dia = datar.dia,
            mes = datar.mes,
            anio = datar.anio,
            exp = datar.exp,
            email = datar.email;

        function finallCall(data, datosInner) {
            let numero, vencimientoTramite;
            if (data[4] === "INTIMADO") {
                numero = data[8];
                vencimientoTramite = "";
            } else {
                numero = "";
                vencimientoTramite = datosInner[8];
            }
            let respuesta = {
                exp: data[0],
                apellido: data[1],
                nombre: data[2],
                tipo_tramite: data[3],
                tramiteStatus: data[4],
                tramiteDireccion: data[5],
                fechaNac: data[6],
                disposicion: data[7],
                hashPrecaria: data[9],
                ip: data[10],
                inicioTramite: datosInner[7],
                vencimientoTramite: vencimientoTramite,
                precariaRenovada: datosInner[9],
                email: email,
                intimado: numero,
            };

            // console.log(respuesta);
            return respuesta;
        }

// POST data then scrape the page
        const options = {
            method: 'POST',
            uri: 'http://www.migraciones.gov.ar/accesible/consultaTramitePrecaria/ConsultaUnificada.php',
            encoding: 'latin1',
            form: {
                'dia': dia,
                'mes': mes,
                'anio': anio,
                "exp": exp,
                'buscar.x': '25',
                'buscar.y': '6'
            },
            json: true // Automatically stringifies the body to JSON
        };
        return new Promise((resolve, reject) => {
            request_promise(options)
                .then(function (body) {
                    let $ = cheerio.load(body),
                        datos = [],
                        datosInner = [];
                    $('input[type=hidden]').each(function () {
                        let data = $(this).val();
                        datos.push(data);
                    });
                    $('td.textoPlanoResultado').each(function () {
                        let dataInner = $(this).html();
                        datosInner.push(dataInner);
                    });
                    resolve(finallCall(datos, datosInner));
                })
                .catch(function (e) {
                    console.log("Error Cheerio ", e.response);
                    reject(e);
                });
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = correr;
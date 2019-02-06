let request_promise = require('request-promise');
let cheerio = require('cheerio');

function correrTest() {
    try {
        //console.log(datar);
        let dia = "31",
            mes = "01",
            anio = "1992",
            exp = "1504182018";

        function finallCall(data, datosInner) {
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
                vencimientoTramite: datosInner[8]
            };
            console.log(data, datosInner);
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
                'buscar.x': '62',
                'buscar.y': '10'
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
                    console.log(e);
                    reject(e);
                });
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = correrTest;
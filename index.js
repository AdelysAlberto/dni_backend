"use strict";

const GetStatusDNI = require('./components/GetData');
const SendEmail = require('./components/SendEmail');
const NotifymeRegister = require('./components/NotifymeRegister');
const ConstructJson = require('./components/ConstrucJson');
const dataCron = require('./api/solicitudes.json');
console.log("Comenzamos...");
let cont = 0, NuevoJson = [];

function iniciando() {
    async function recorrerJson() {
        async function procesar() {
            for (let value of  dataCron) {
                    await delay();
                    await consultarExp(value);
                    await cont++;
            }
        }
        await procesar();
        await NotifymeRegister("", "cron", cont);
        await console.log("Termine");
    }

    function delay() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }

    async function consultarExp(ver) {
        await delay();
        let obtenerDatos = await GetStatusDNI(ver);
        await console.log("Revisando EXP ", ver.exp);
        await SenderEmail(obtenerDatos, ver);
        await console.log("Expediente Revisado ", obtenerDatos.exp + " => " + obtenerDatos.tramiteStatus);
        if (await obtenerDatos.tramiteStatus !== "RESUELTO") {
            NuevoJson.push(ver);
        }
        return obtenerDatos;
    }

    async function SenderEmail(resp, json) {
         await SendEmail(resp.email, resp.nombre, resp.inicioTramite, resp.vencimientoTramite, resp.tramiteStatus, resp.precariaRenovada);
        await console.log("Enviando Email Exp", resp.exp, "Renovar Precaria", resp.precariaRenovada);

    }
    return recorrerJson()
}

async function iniciar() {
    await iniciando();
    await ConstructJson(NuevoJson);
}

return iniciar();


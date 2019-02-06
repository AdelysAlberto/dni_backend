async function ConstructJson(data) {
    const fs = require('fs');
    await fs.writeFile(__dirname + "/../api/" + "solicitudes.json", JSON.stringify(data, undefined, 2), (err) => {
        if (err) throw err;
        //console.log(data);
        console.log('Json Finalizado!');
    });
}

module.exports = ConstructJson;
async function CopyJson(data) {
    const fs = require('fs');
    await fs.writeFile(__dirname + "/../api/" + "all.json", JSON.stringify(data, undefined, 2), (err) => {
        if (err) throw err;
        //console.log(data);
        console.log('Copia Finalizada');
    });
}

module.exports = CopyJson;
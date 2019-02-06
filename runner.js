const config = require('./config');
const fs = require('fs');
const pkg = require('./package.json');
const express = require("express"),
    bodyParser = require('body-parser'),
    correr = require('./components/GetData.js'),
    correrTest = require('./components/TestData.js'),
    LoadData = require('./components/LoadData.js'),
    os = require('os'),
    v8 = require('v8'),
    cors = require('cors'),
    app = express(),
    hostname = '0.0.0.0',
    port = config.port,
    publicDir = './';

const corsOptions = {
    origin: config.url
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); // support encoded bodies
app.set('json spaces', 4);

app.post("/giveme", (req, res) => {
    correr(req.body)
        .then((resp) => {
            console.log(resp);
            res.json(resp);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.post("/load", async (req, res) => {
    const sendData = await LoadData(req.body);
    res.send(sendData);
    res.end(sendData);
});

app.get('/health', async (req, res, next) => {
    res.json({
        name: process.name,
        nodeVersion: process.versions.node,
        envMode: process.env.NODE_ENV || null,
        memoryUsage: process.memoryUsage(),
        upTime: process.uptime(),
        totalMem: os.totalmem(),
        freeMem: os.freemem(),
        loadAvg: os.loadavg(),
        heap: v8.getHeapStatistics(),
        host: os.hostname(),
        packageJSON: pkg.version
    });
});

app.get('/api/:file', (req, res) => {
    fs.readFile(__dirname + '/api/' + req.params.file + ".json", 'utf8', function (err, data) {
        if (err) {
            res.send("ERROR DE SOLICITUD");
            res.end("ERRR");
        }
        // console.log(data);
        res.send(data);
        res.end(data);
    });
});

app.get("/testData", (req, res) => {
    correrTest().then((resp) => {

        res.json(resp);
    }).catch((err) => {
        res.json(err);
    });
});


app.use(express.static(publicDir));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('==============================\nBackend on port %s\n==============================', port);
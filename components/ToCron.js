let dataCron = require('../dataCron');
let express = require("express"),
    bodyParser = require('body-parser'),
    correr = require('../index.js'),
    cors = require('cors'),
    app = express(),
    hostname = '0.0.0.0',
    port = 9011,
    publicDir = './';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); // support encoded bodies
app.get("/", (req, res) => {
    dataCron.map(function (e) {
        return new Promise((resolve, reject) => {
            correr(e).then((resp) => {
                console.log(res);
            })
            .catch((err) => {
                res.json(err);
            });
        })

    });
});
app.use(express.static(publicDir));
// START THE SERVER
app.listen(port);
console.log('==============================\nBackend on port %s\n==============================', port);
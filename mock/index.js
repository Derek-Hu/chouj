var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var router = require('./router');
var cors = require('./middleware/cors');
var delay = require('./middleware/delay');
var path = require('path');
var pkg = require('./package.json');
var chalk = require('chalk');

var upload = multer({ dest: path.join(__dirname, 'temp') });
var app = express();
var defaultPort = (pkg.mockConfig && pkg.mockConfig.port)? pkg.mockConfig.port : 3005;
var port = pkg.mockServerPort || defaultPort;

app.use(bodyParser.urlencoded({
    extended: true
}));
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(delay);
app.use(cors);

router.init(express, app, upload);

function bootstrap() {
    process.on('uncaughtException', function(err) {
        console.log(chalk.red(('uncaughtException: ' + err).red));
    });
    process.on('unhandledRejection', function(reason, p) {
        // application specific logging, throwing an error, or other logic here
        console.log(chalk.red("Unhandled Rejection at: Promise ", p, " reason: ", reason));
    });

    require('http').createServer(app).listen(port, function() {
        console.log(chalk.green('Express mock server listening on port ' + port));
    });
}

bootstrap();

var notFound = require('./middleware/notFound');
var fs = require('fs');
var path = require('path');
var pkg = require('./package.json');

function getFileList(root) {
    var res = [],
        files = fs.readdirSync(root);

    files.forEach(file => {
        var pathname = root + '/' + file,
            stat = fs.lstatSync(pathname);

        if (!stat.isDirectory()) {
            res.push(pathname.replace(__dirname, '.'));
        } else {
            res = res.concat(getFileList(pathname));
        }
    });
    return res;
}

function init(express, app, upload) {

    var rootPath = (pkg.mockConfig && pkg.mockConfig.prefix)?pkg.mockConfig.prefix:'';

    getFileList(path.join(__dirname, 'modules'))
        .map(url => require(url))
        .forEach(mod => {
            app.use(
                rootPath + mod.root,
                mod.router(express, upload)
            );
        });

    app.use(rootPath, notFound);
}
module.exports = { init };

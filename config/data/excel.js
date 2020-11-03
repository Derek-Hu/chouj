var xlsx = require('node-xlsx').default;
var fs = require('fs');

module.exports = function parseExcel(path) {
    var sheets = xlsx.parse(fs.readFileSync(path));
    sheets.forEach(function(sheet) {
        var arrays = sheet.data;
        // remove columns 
        var colums = arrays.splice(0, 1)[0];

        sheet.data = arrays.reduce(function(allUsers, user) {
            allUsers[user[0]] = user[1];
            return allUsers;
        }, {});

        return sheet;
    })
    return sheets;
}

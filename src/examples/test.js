// use: node printFile.js [filePath printerName]
var printer = require('../lib');
var filename2 = require('./users.json');

var fs = require('fs');


var filename = process.argv[3] || filename2;

if (process.platform != 'win32') {
  printer.printFile({
    filename: filename,
    printer: process.env[3], // printer name, if missing then will print to default printer
  });
} else {
  // not yet implemented, use printDirect and text

  printer.printDirect({
  
    printer: process.env[3], // printer name, if missing then will print to default printer
  });
}

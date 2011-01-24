var net = require('net');
var sys = require('sys');
var zombie = require('zombie');
var browser = new zombie.Browser;
var pointers = [];
var buffer = "";

// Confirm all confirmation dialogs, expected behavior for
// capybara
browser.onconfirm(function() {return true;}, true);

net.createServer(function (stream) {
  stream.setEncoding('utf8');

  stream.on('data', function (data) {
    buffer += data;
  });

  stream.on('end', function () {
    eval(buffer);
    buffer = "";
  });
}).listen(8124, 'localhost');

console.log('Server running at http://127.0.0.1:8124/');

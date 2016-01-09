'use strict';

var fs = require('fs'),
    path = require('path');

exports.plantuml = {

  test: function (test) {
    var output = fs.statSync(path.join(__dirname, 'test.png'));
    test.ok(output.isFile() && output.size > 0, 'creates a PNG file');
    test.done();
  }

};

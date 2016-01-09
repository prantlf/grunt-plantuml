// grunt-plantuml
// https://github.com/prantlf/grunt-plantuml
//
// Copyright (c) 2016 Ferdinand Prantl
// Licensed under the MIT license.
//
// Generates images from plantuml diagram sources.

'use strict';

var fs = require('fs'),
    path = require('path'),
    plantuml = require('node-plantuml'),
    Q = require('q');

module.exports = function (grunt) {

  function processDiagram(fileSrc, fileDest, options) {
    try {
      grunt.log.subhead('Processing diagram "' + fileSrc + '"');
      var input = grunt.file.read(fileSrc, {encoding: options.charset});
      return Q.Promise(function (resolve, reject) {
        try {
          var generator = plantuml.generate(fileSrc, options,
                function (error) {
                  if (error) {
                    grunt.log.error(error);
                    grunt.fail.warn('Writing diagram to "' +
                      fileDest + '" failed\n');
                    reject(error);
                  } else {
                    resolve();
                  }
                }),
              output = fs.createWriteStream(fileDest);
          generator.out.pipe(output);
        } catch (error) {
          grunt.log.error(error);
          grunt.fail.warn('Reading diagram from "' + fileSrc + '" failed\n');
          reject();
        }
      });
    } catch (error) {
      grunt.log.error(error);
      grunt.fail.warn('Processing diagram "' + fileSrc + '" failed\n');
    }
  }

  grunt.registerMultiTask('plantuml', "Generate images from plantuml diagram sources", function () {
    var done = this.async(),
        options = this.options({
          dot: undefined,
          config: undefined,
          charset: 'utf-8',
          format: 'png' // ascii|unicode|eps|png|svg
        }),
        extension = options.format === 'ascii' || options.format === 'unicode' ?
          'txt' : options.format,
        promises = this.files.map(function (file) {
          // If multiple source files are specified, the destination
          // path should point to a directory
          var single = file.orig.src.length === 1 &&
                !file.orig.src.some(function (src) {
                  return src.indexOf('*') >= 0 || src.indexOf('?') >= 0;
                }),
              promises = file.src.map(function (src) {
                // If the destination is a directory, use the source file name
                // with the target image format as extension
                var dest = single ? file.dest : path.join(file.dest,
                      path.parse(src).name + '.' + extension),
                    dir = path.dirname(dest);
                grunt.file.mkdir(dir);
                return processDiagram(src, dest, options);
              });
          return Q.all(promises);
        });
    Q.all(promises)
     .then(done);
  });
};

# grunt-plantuml [![NPM version](https://badge.fury.io/js/grunt-plantuml.png)](http://badge.fury.io/js/grunt-plantuml) [![Build Status](https://travis-ci.org/prantlf/grunt-plantuml.png)](https://travis-ci.org/prantlf/grunt-plantuml) [![Coverage Status](https://coveralls.io/repos/prantlf/grunt-plantuml/badge.svg)](https://coveralls.io/r/prantlf/grunt-plantuml) [![Dependency Status](https://david-dm.org/prantlf/grunt-plantuml.svg)](https://david-dm.org/prantlf/grunt-plantuml) [![devDependency Status](https://david-dm.org/prantlf/grunt-plantuml/dev-status.svg)](https://david-dm.org/prantlf/grunt-plantuml#info=devDependencies) [![devDependency Status](https://david-dm.org/prantlf/grunt-plantuml/peer-status.svg)](https://david-dm.org/prantlf/grunt-plantuml#info=peerDependencies) [![Greenkeeper badge](https://badges.greenkeeper.io/prantlf/grunt-plantuml.svg)](https://greenkeeper.io/) [![Code Climate](https://codeclimate.com/github/prantlf/grunt-plantuml/badges/gpa.svg)](https://codeclimate.com/github/prantlf/grunt-plantuml) [![Codacy Badge](https://www.codacy.com/project/badge/f3896e8dfa5342b8add12d50390edfcd)](https://www.codacy.com/public/prantlf/grunt-plantuml) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![NPM Downloads](https://nodei.co/npm/grunt-plantuml.png?downloads=true&stars=true)](https://www.npmjs.com/package/grunt-plantuml)

This module provides a grunt multi-task generating images from [plantuml]
diagram sources.
    
If you generate HTML technical documention from textual sources, you may want
to maintain only sources of UML diagrams in your repository and generate the
pictures only during the documentation build.  You will be able to do changes
easily, without committing both diagram sources and pictures and sychronizing
them manually.

If you want to just quickly convert a plantuml source file to a picture, you
can use the [node-plantuml] command-line tool `puml`, which this task is based
on.

## Installation

You need [node >= 0.12][node], [npm] and [grunt >= 0.4][Grunt] installed
and your project build managed by a [Gruntfile] with the necessary modules
listed in [package.json].  If you haven't used Grunt before, be sure to
check out the [Getting Started] guide, as it explains how to create a
Gruntfile as well as install and use Grunt plugins.  Once you're familiar
with that process, you may ensure native dependencies of this plugin and
install it:

1. Install pre-requisites: [Graphviz](http://www.graphviz.org/) and Java
   depending on your operating system

2. Install the Grunt task:

```shell
$ npm install grunt-plantuml --save-dev
```

## Configuration

Add the `plantuml` entry with the plantuml task configuration to the
options of the `grunt.initConfig` method:

```js
grunt.initConfig({
  plantuml: {
    one: {
      files: {
        'dist/doc/images/diagram.png': ['doc/images/diagram.puml']
      }
    },
    all: {
      src: ['doc/images/*.puml']
      dest: 'dist/doc/images'
    }
  }
});
```
The configuration consists of key-value pairs with the output image path
as a key pointing to the plantuml input file.  If you specify more source
files by wildcards, the destination should be a directory; the source file
extension wil lbe replaced by the output format in the output file name.

Then, load the plugin:

```javascript
grunt.loadNpmTasks('grunt-plantuml');
```

## Build

Call the `plantuml` task:

```shell
$ grunt plantuml
```

or integrate it to your build sequence in `Gruntfile.js`:

```js
grunt.registerTask('default', ['plantuml', ...]);
```

## Customizing

Default behaviour of the task can be tweaked by the task options; these
are the defaults:

```js
grunt.initConfig({
  plantuml: {
    one: {
      files: {
        'dist/doc/images/diagram.png': ['doc/images/diagram.puml']
      },
      options: {
        dot: '...',       // path to the dot executable
        config: '...',    // path to the dot config file
        charset: 'utf-8', // source file character set
        format: 'png'     // ascii|unicode|eps|png|svg
      }
    }
  }
});
```
See the [documentation of the command-line puml tool](https://github.com/markushedvall/node-plantuml#cli)
for more information.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style.  Add unit tests for any new or changed functionality. Lint and test
your code using Grunt.

## Release History

 * 2018-04-27   v1.0.0   Dropped support of Node.js 4
 * 2016-12-19   v0.2.2   Update dependencies
 * 2016-12-11   v0.2.1   Support Node.js 0.10.x
 * 2016-26-08   v0.2.0   Upgrade to Grunt 1.x
 * 2016-03-05   v0.1.6   Update dependencies, improve build testing
 * 2016-03-04   v0.1.5   Fix missing direct dependency on node-plantuml
 * 2016-03-04   v0.1.4   Update dependencies
 * 2016-01-10   v0.1.3   Initial release

## License

Copyright (c) 2016-2018 Ferdinand Prantl

Licensed under the MIT license.

[node]: http://nodejs.org
[npm]: http://npmjs.org
[package.json]: https://docs.npmjs.com/files/package.json
[Grunt]: https://gruntjs.com
[Gruntfile]: http://gruntjs.com/sample-gruntfile
[Getting Gtarted]: https://github.com/gruntjs/grunt/wiki/Getting-started
[plantuml]: http://plantuml.com/
[node-plantuml]: https://github.com/markushedvall/node-plantuml

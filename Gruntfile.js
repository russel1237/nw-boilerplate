'use strict';

var parseBuildPlatforms = function(argumentPlatform) {
  // this will make it build no platform when the platform option is specified
  // without a value which makes argumentPlatform into a boolean
  var inputPlatforms = argumentPlatform || process.platform + ";" + process.arch;

  // Do some scrubbing to make it easier to match in the regexes bellow
  inputPlatforms = inputPlatforms.replace("darwin", "mac");
  inputPlatforms = inputPlatforms.replace(/;ia|;x|;arm/, "");

  var buildAll = /^all$/.test(inputPlatforms);

  var buildPlatforms = {
    mac: /mac/.test(inputPlatforms) || buildAll,
    win: /win/.test(inputPlatforms) || buildAll,
    linux32: /linux32/.test(inputPlatforms) || buildAll,
    linux64: /linux64/.test(inputPlatforms) || buildAll
  };

  return buildPlatforms;
};

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      runnw: {
        options: {
          stdout: false,
          stderr: false,
          stdin: false
        },
        command: "./build/nw-boilerplate/osx64/nw-boilerplate.app/Contents/MacOS/nwjs . > /dev/null 2>&1"
      }
    },
    nodewebkit: {
      options: {
        version: 'latest',
        buildDir: './build',
        cacheDir: './cache',
        // choose what platforms to compile for here
        // options are win, win32, win64, osx, osx32, osx64, linux, linux32, linux64
        platforms: ['osx']
      },
      src: ['./src/**/*']
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks("grunt-shell");
  grunt.registerTask('build', ['nodewebkit']);
  grunt.registerTask("run", function() {
    var start = parseBuildPlatforms();
    if (start.mac) {
      grunt.task.run("run:mac");
    } else {
      grunt.log.writeln("OS not supported.");
    }
  });
  grunt.registerTask("run:mac", ["build", "shell:runnw"]);
};
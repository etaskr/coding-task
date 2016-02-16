module.exports = function (grunt) {

  grunt.loadNpmTasks("grunt-typescript");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks('grunt-tsd');

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    tsd: {
      refresh: {
        options: {
          command: 'reinstall',
          latest: true,
          config: 'tsd.json',
        }
      }
    },
    clean: {
      build: {
        src: [
          "build",
        ]
      },
    },
    typescript: {
      base: {
        src: [
          "src/**/*.ts",
         // "tests/**/*.ts",
          "*.ts",
        ],
        dest: "build",
        options: {
          module: "commonjs",
          target: "es5",
        }
      }
    },
    copy: {
      build: {
        src: [
          "src/views/**/*",
          "src/media/**/*",
        ],
        dest: "build",
        expand: true,
      },
    },
    tslint: {
      options: {
        configuration: "tslint.json",
      },
      files: {
        src: [
          "src/**/*.ts",
          "*.ts",
        ],
      },
    },
  });

  grunt.registerTask("default", [
    "tslint",
    "tsd",
    "clean",
    "typescript",
    "copy"
  ]);

};
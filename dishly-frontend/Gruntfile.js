module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: 'sass/*',
        tasks: ['sass:dist']
      },
    },
    sass: {
      dist: {
        files: {
          'css/style.css': 'sass/*'
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          name : 'app',
          baseUrl: "build/js",
          mainConfigFile: "build/js/main.js",
          out: "build/optimized.js",
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
};


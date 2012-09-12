module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['src/**/*.js','spec/**/*.js']
    },

    min: {
      dist: {
        src: ['src/jsonFormatter.js'],
        dest: 'src/jsonFormatter.min.js'
      }
    },

    watch: {
      files: ['<config:jasmine.specs>','src/**/*js'],
      tasks: 'jasmine'
    },

    jasmine : {
      src : ['vendor/jquery.min.js','src/**/*.js'],
      specs : 'spec/**/*.js'
    },

    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {
        jasmine : false,
        describe : false,
        expect : false,
        beforeEach : false,
        it : false
      }
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-runner');

  grunt.registerTask('default', 'lint min jasmine');
  grunt.registerTask('test', 'jasmine');

};
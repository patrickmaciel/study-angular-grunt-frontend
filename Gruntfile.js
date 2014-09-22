module.exports = function(grunt) {

  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower: {
      install: {
        options: {
          install: true,
          copy: false,
          targetDir: './libs',
          cleanTargetDir: true
        }
      }
    },

    jshint: {
      all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js' ]
    },

    html2js: {
      dist: {
        src: [ 'app/templates/*.html', 'app/templates/**/*.html' ],
        dest: 'tmp/templates.js'
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [ 'app/*js', 'app/**/*js', 'tmp/*.js' ],
        dest: 'dist/app.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/app.js': [ 'dist/app.js' ]
        },
        options: {
          mangle: false
        }
      }
    },

    clean: {
      temp: {
        src: [ 'tmp' ]
      }
    },

    watch: {
      dev: {
        files: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js', '*.html' ],
        tasks: [ 'jshint', 'html2js:dist', 'concat:dist', 'clean:temp' ],
        options: {
          atBegin: true
        }
      },
      min: {
        files: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js', '*.html' ],
        tasks: [ 'jshint', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist' ],
        options: {
          atBegin: true
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9000,
          middleware: function (connect, options) {
            var middlewares = [];
            options.base.forEach(function (base) {
               // Serve static files.
               middlewares.push(connect.static(base));
            });
            middlewares.push(proxySnippet);
            return middlewares;
          }                            
        },
        proxies: [
          {
            context: '/api',
            host: 'localhost',
            port: 3000,
            https: false,
            // changeOrigin: false,
            xforward: true            
          }
        ]
      }
    },

    compress: {
      dist: {
        options: {
          archive: 'dist/<%= pkg.name %>-<%= pkg.version %.zip'
        },
        files: [
          {
            src: ['index.html'],
            dest: '/'
          }, {
            src: ['dist/**'],
            dest: 'dist/'
          }, {
            src: ['assets/**'],
            dest: 'assets/'
          }, {
            src: ['libs/**'],
            dest: 'libs/'
          }
        ]
      }
    }

    // Task configuration will be written here
  });

  // Loading of tasks and registering tasks will be written here
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('dev', [ 'bower', 'configureProxies:server', 'connect:server', 'watch:dev' ]);
  grunt.registerTask('test', [ 'bower', 'jshint', 'karma:continuous' ]);
  grunt.registerTask('minified', [ 'bower', 'connect:server', 'watch:min' ]);
  grunt.registerTask('package', [ 'bower', 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'uglify:dist',
    'clean:temp', 'compress:dist' ]);

};
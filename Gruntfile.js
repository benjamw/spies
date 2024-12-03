let shell = require('shelljs');

module.exports = function(grunt) {
    // Config
    grunt.initConfig({
        hogan: {
            publish: {
                files:[
                    { dest: 'assets/js/template.js',
                      src: ['assets/design/*.hjs'] }
                ],
                options:{
                    defaultName: function(filename) {
                        return filename.split('/').pop().split('.')[0];
                    }
                }
            }
        },
        watch: {
            templates: {
                files: 'assets/design/*.hjs',
                tasks: ['hogan:publish']
            },
            scss: {
                files: 'assets/sass/**/*.scss',
                tasks: ['compass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-templates-hogan');

    grunt.registerTask('compilecompass', 'Compile Compass (old)', ['compass']);
    grunt.registerTask('compass', 'Compile Compass', function () {shell.exec("cd . && compass compile --force")});

    grunt.registerTask('default', ['hogan:publish', 'compass']);
};

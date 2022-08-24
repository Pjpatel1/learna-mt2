module.exports = function(grunt)
{
    pkg: grunt.file.readJSON('package.json'),

    grunt.initConfig({
        postcss: {
            options: {
              map: true, // inline sourcemaps
              processors: [
                require('tailwindcss')(),
                require('autoprefixer')({ browsers: 'last 2 versions' }) // add vendor prefixes
              ]
            },
            dist: {
                expand: true,
                cwd: './node_modules/tailwindcss/',
                src: ['**/*.css'],
                dest: 'build/css/tailwindcss/',
                ext: '.css'
              }
            },
        concat: { 
          js: {
            src: ['js/1.js', 'js/2.js'],
            dest: 'build/js/script.js',
          },
          css: {
            src: ['css/main.css', 'css/theme.css'],
            dest: 'build/css/style.css',
          },
          html:{
            src:['html/index.html'],
            dest:'build/index.html'
          }
        },
        watch: {
            js: {
              files: ['js/**/*.js'],
              tasks: ['concat'],
            },
            css: {
                files: ['css/**/*.css'],
                tasks: ['concat'],
              },
              html:{
                files:['html/index.html'],
                tasks:['concat']
              },
              postcss: {
                files: './node_modules/tailwindcss/**/*.css',
                tasks: ['compile-tailwindcss'],
                options: {
                  interrupt: true
                }
              }
          },
      });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['concat','watch']);
}
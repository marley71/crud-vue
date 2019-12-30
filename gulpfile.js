//var elixir = require('laravel-elixir');
const fs = require('fs');
const gulp = require('gulp');
const concat = require('gulp-concat');
const argv = require('yargs').argv;
//const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const minify = require("gulp-babel-minify");
const watch = require('glob-watcher');


// file is included here:
eval(fs.readFileSync('crud-files.js')+'');

// var isProduction = (argv.production === undefined) ? false : true;
//
// if (!isProduction) {
    gulp.task('default', function() {
        gulp.src(crudJsFiles)
            .pipe(concat('crud-vue.js'))
            .pipe(gulp.dest('./dist/'));
        return gulp.src(crudHtmlFiles)
            .pipe(concat('crud-vue.html'))
            .pipe(gulp.dest('./dist/'));
        ;
    });
//} else {
    gulp.task('production', function() {
        gulp.src(crudJsFiles)
            .pipe(concat('crud-vue.js'))
            .pipe(minify({}))
            .pipe(rename({suffix: '.min'}))
            //.pipe(uglify())
            .pipe(gulp.dest('./dist/'));
        gulp.src(crudHtmlFiles)
            .pipe(concat('crud-vue.html'))
            .pipe(gulp.dest('./dist/'));
    });
//}

gulp.task('watch',function () {
    watch([
        './src/js/*.js',
        './src/js/interfaces/*.js',
        './src/js/actions/*.js',
        './src/js/confs/*.js',
        './src/js/crud/*.js',
        './src/js/misc/*.js',
        './src/js/views/*.js',
        './src/js/renders/*.js',
        './src/js/templates/*.js',

        './src/templates/misc/*.html',
        './src/templates/renders/*.html',
        './src/templates/views/*.html',
    ], function(done){
        // This function will be called each time a globbed file is changed
        // but is debounced with a 200ms delay (default) and queues subsequent calls
        console.log('ricompilazione...' + new Date().toDateString() + " " + new Date().toTimeString());
        gulp.src(crudJsFiles)
            .pipe(concat('crud-vue.js'))
            .pipe(gulp.dest('./dist/'));
        gulp.src(crudHtmlFiles)
            .pipe(concat('crud-vue.html'))
            .pipe(gulp.dest('./dist/'));
        // Make sure to signal async completion with the callback
        // or by returning a stream, promise, observable or child process
        done();

        // if you need access to the `path` or `stat` object, listen
        // for the `change` event (see below)

        // if you need to listen to specific events, use the returned
        // watcher instance (see below)
    });
})

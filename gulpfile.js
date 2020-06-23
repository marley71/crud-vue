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

gulp.task('production', function(cb) {
    gulp.src(crudJsFiles)
        .pipe(concat('crud-vue.js'))
        .pipe(minify({}))
        .pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/'));
    gulp.src(crudHtmlFiles)
        .pipe(concat('crud-vue.html'))
        .pipe(gulp.dest('./dist/'));
    cb();
});

function js(cb) {
    gulp.src(crudJsFiles)
        .pipe(concat('crud-vue.js'))
        .pipe(gulp.dest('./dist/'));
    gulp.src('src/js/crud-vue-components.js')
        .pipe(gulp.dest('./dist/'));
    console.log('ricompilazione js ...' + new Date().toDateString() + " " + new Date().toTimeString());
    cb();
}

function html(cb) {
    gulp.src(crudHtmlFiles)
        .pipe(concat('crud-vue.html'))
        .pipe(gulp.dest('./dist/'));
    console.log('ricompilazione html ...' + new Date().toDateString() + " " + new Date().toTimeString());
    cb();
}

gulp.task('watch',function () {
    gulp.watch([
        './src/js/*.js',
        './src/js/**/*.js',
        './src/templates/**/*.html',
    ], {usePolling : true},gulp.series(js,html));
});

gulp.task('default',gulp.series(js,html));

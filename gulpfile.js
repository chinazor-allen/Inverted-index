const gulp = require ('gulp');
const bs = require('browser-sync').create();
const sass = require('gulp-sass');
const jasmineBrowser = require('gulp-jasmine-browser');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');



// Browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', () => {
   bs.init({
       server: {
            baseDir: "src",
            routes: {
                '/bower_components': "bower_components",
                '/build' : "build"
            }
        },
       /* proxy: {
            target: "localhost:8080", // can be [virtual host, sub-directory, localhost with port]
            ws: true, // enables websockets
    }*/
    });
});

//Watch Task
gulp.task('watch', ['browser-sync'], () => {
    gulp.watch(['src/**/*.html', 
    'src/**/*.js', 
    'src/css/**/*.css'])
    .on('change', bs.reload);
});

gulp.task('build', function() {
    gulp.src(['src/inverted-index.js', 'src/inverted-index-helper.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('scripts', () => {
    gulp.src('jasmine/spec/inverted-index-test.js')
        .pipe(browserify())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./jasmine'));
});

gulp.task('sass', () => {
    return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css/'))
    .pipe(bs.reload({stream: true}));
});

//Default task(s).
gulp.task('default', ['build','watch'], (done) => {
    done();
});
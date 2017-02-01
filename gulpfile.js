const gulp = require ('gulp');
const bs = require('browser-sync').create();
const browserify = require('gulp-browserify');
const jasmineBrowser = require('gulp-jasmine-browser');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');

const appSync = browserSync.create();
const testSync = browserSync.create();



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
    gulp.watch(['jasmine/**/*', 'src/**/*.js'], testSync.reload);
});

gulp.task('build', function() {
    gulp.src(['src/inverted-index.js', 'src/inverted-index-helper.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(browserify())
        .pipe(gulp.dest('build'));
});

 gulp.task('serveTest', () => {
  testSync.init({
    server: {
      baseDir: ['./src', './jasmine'],
      index: 'SpecRunner.html'
    },
    port: 8080,
    ui: false,
    ghostMode: false,
    open: false
  });
}); 

gulp.task('scripts', function() {
    // Single entry point to browserify 
    gulp.src('src/js/app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/js'))
});

gulp.task('scripts', () => {
    gulp.src('jasmine/spec/inverted-index-test.js')
        .pipe(browserify())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('jasmine/build'));
});

//Default task(s).
gulp.task('default', ['build','watch'], (done) => {
    done();
});
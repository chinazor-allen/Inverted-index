const gulp = require ('gulp');
const bs = require('browser-sync').create();
const sass = require('gulp-sass');

// Browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', ['sass'], () => {
   bs.init({
       server: {
            baseDir: "./"
        },
       /* proxy: {
            target: "localhost:8080", // can be [virtual host, sub-directory, localhost with port]
            ws: true, // enables websockets
    }*/
    });
});

//Watch Task
gulp.task('watch', ['browser-sync'], () => {
    gulp.watch('scss/*.scss',['sass']);
    gulp.watch(['src/**/*.html', 
    'src/**/*.js', 
    'src/css/**/*.css'])
    .on('change', bs.reload);
});

gulp.task('sass', () => {
    return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css/'))
    .pipe(bs.reload({stream: true}));
});

 //Test task.
gulp.task('test', ['watch'], function(done) {
    done();
});

//Default task(s).
gulp.task('default', ['watch'], (done) => {
    done();
});
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var nodemon = require('gulp-nodemon');

var tsProject = ts.createProject({
    declaration: true
});
 
var ts2Project = ts.createProject({
    declaration: true
});

gulp.task('default', ['build']);

gulp.task('build', ['build-js', 'copy-views']);

var buildFolder = 'build';

gulp.task('build-js', function() {
    var tsResult = gulp.src('./*.ts')
        .pipe(tsProject());
    var ts2Result = gulp.src('./src/**/*.ts')
        .pipe(ts2Project());
 
    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
        tsResult.dts.pipe(gulp.dest('typedefs')),
        tsResult.js.pipe(gulp.dest(buildFolder)),
        ts2Result.js.pipe(gulp.dest(buildFolder + '/src'))
    ]);
});

gulp.task('copy-views', function() {
    gulp
        .src('./src/views/*.html')
        .pipe(gulp.dest('./' + buildFolder + '/src/views/'));
});

var buildTasks = ['build'];

gulp.task('watch', buildTasks, function () {
    var stream = nodemon({
        script: './' + buildFolder + '/',
        watch: ['./src', '../client/build/css'],
        ext: 'ts html css',
        tasks: buildTasks
    });

    return stream;
});
var gulp = require('gulp'),
            util = require('gulp-util'),
            sass = require('gulp-sass'),
            rename = require('gulp-rename'),
            log = util.log;

var themes = ['default'];

var watchFiles = [
    './src/**/*.scss'
];

function getIndexThemePath(theme, shell) {
    var filePath = './src/common/themes/' + theme + '/' + shell + '.scss';
    return filePath;
}

var sassFiles = [];
themes.forEach(function(theme) {
    var filePath;
    filePath = getIndexThemePath(theme);
    sassFiles.push({filePath, theme: theme, shell: 'main'});
});

var outputPath = './build/css';

gulp.task('default', ['sass']);

gulp.task('sass', function() {
    console.log('');
    console.log('Running sass theme file tasks...')
    console.log('');
    sassFiles.forEach(function(sassFileInfo) {
        var theme = sassFileInfo.theme;
        var shell = sassFileInfo.shell;
        var sassFile = sassFileInfo.filePath;
        console.log('*** Generating theme file from source; ' + sassFile + ' ***');
        gulp.src(sassFile)
            .pipe(sass({style: 'expanded'}))
            .pipe(rename(function(path) {
                path.basename = 'theme-' + theme + '-' + shell;
            }))
            .pipe(gulp.dest(outputPath));
    });
    console.log('');
    console.log('Finished generating theme files.')
    console.log('');
});

gulp.task('watch', function() {
    log('Watching scss files for changes...');
    gulp.watch(watchFiles, ['sass']);
})
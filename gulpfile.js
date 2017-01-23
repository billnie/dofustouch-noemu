const gulp = require('gulp');
const del = require('del');
const fs = require('fs');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const tslint = require('gulp-tslint');
const reload = browserSync.reload;

var tsProject = typescript.createProject('tsconfig.json');

const paths = {
    dist: 'build',
    distFiles: 'build/**/*',
    srcFiles: 'src/**/*',
    srcTsFiles: 'src/**/*.ts',
}

// clean the contents of the distribution directory
gulp.task('clean', function() {
    return del(paths.distFiles);
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function() {
    return gulp.src([paths.srcFiles, '!' + paths.srcTsFiles])
        .pipe(gulp.dest(paths.dist))
});


// TypeScript compile
gulp.task('compile', ['clean'], function() {
    // load the tsconfig each time as it changes!
    const tscConfig = JSON.parse(fs.readFileSync('./tsconfig.json', 'UTF8'));
    /*return gulp
        .src(paths.srcTsFiles)
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist));*/
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(paths.dist));

});

// linting
gulp.task('tslint', function() {
    /*return gulp.src(paths.srcTsFiles)
        .pipe(tslint())
        .pipe(tslint.report('verbose'));*/
});

// Run browsersync for development
gulp.task('serve', ['build'], function() {
    /*browserSync({
        server: {
            baseDir: ''
        },
        ghostMode: false,
        startPath: '/build/browser'
    });*/

    gulp.watch(paths.srcFiles, ['buildAndReload']);
});

gulp.task('build', ['tslint', 'clean', 'compile', 'copy:assets']);
gulp.task('buildAndReload', ['build'], reload);
gulp.task('default', ['build']);

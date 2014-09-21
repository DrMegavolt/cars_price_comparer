var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('default', function () {
    return gulp.src('tests/*.js', {read: false})
        .pipe(mocha({
            reporter: 'spec',
            should:require('should'),
            expect:require('chai').expect,
            timeout:15000
        }));
});
gulp.task('processor-test', function () {
    return gulp.src('tests/processor-test.js', {read: false})
        .pipe(mocha({
            reporter: 'spec',
            should:require('should'),
            expect:require('chai').expect,
            timeout:15000
        }));
});

gulp.task('ria-parser', function () {
    return gulp.src('tests/*ria.js', {read: false})
        .pipe(mocha({
            reporter: 'spec',
            should:require('should'),
            expect:require('chai').expect,
            timeout:15000
        }));
});

gulp.task('email-test', function () {
    return gulp.src('tests/email*.js', {read: false})
        .pipe(mocha({
            reporter: 'spec',
            should:require('should'),
            expect:require('chai').expect,
            timeout:15000
        }));
});
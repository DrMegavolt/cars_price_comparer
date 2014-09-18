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


gulp.task('email-test', function () {
    return gulp.src('tests/email*.js', {read: false})
        .pipe(mocha({
            reporter: 'spec',
            should:require('should'),
            expect:require('chai').expect,
            timeout:15000
        }));
});
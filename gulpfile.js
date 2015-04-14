var gulp = require('gulp');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');

var src = {
	tests: './test/*.js'
};

gulp.task('mocha', function() {
	return gulp.src(src.tests, { read: false }).pipe(mocha({ reporter: 'spec' }));
})

gulp.task('default', ['mocha'], function () {
    return;
});
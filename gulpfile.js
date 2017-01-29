var gulp = require('gulp');
var sass = require('gulp-sass');

var src = 'css/'

gulp.task('sass', function() {
	return gulp.src(src+'**/*.scss')
        .pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('css'));
});

gulp.watch(src+'**/*.scss', ['sass']);

gulp.task('default', ['sass']);

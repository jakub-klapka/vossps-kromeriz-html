var gulp = require( 'gulp' ),
	sass = require( 'gulp-ruby-sass' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	plumber = require( 'gulp-plumber' ),
	imagemin = require( 'gulp-imagemin' ),
	svg_store = require( 'gulp-svgstore' ),
	filter = require( 'gulp-filter' ),
	livereload = require( 'gulp-livereload' );

var plumber_config = {
	errorHandler: function (err) {
		console.log(err.toString());
		this.emit('end');
	}
};

/*
CSS
 */
gulp.task( 'sass', function(){
	var maps_filter = filter( [ '*', '!*.map' ] );
	return gulp.src( 'src/sass/**/*.scss', { base: 'src/sass' } )
		.pipe( plumber( plumber_config ) )
		.pipe( sass() )
		.pipe( maps_filter )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( 'build/css' ) );
} );
gulp.task( 'sass_watch', function(){
	gulp.watch( 'src/sass/**/*.scss', [ 'sass' ] );
} );


/*
Images
 */
gulp.task( 'images', function(){
	return gulp.src( 'src/images/**/*', { base: 'src/images' } )
		.pipe( plumber( plumber_config ) )
		.pipe( imagemin( { progressive: true } ) )
		.pipe( gulp.dest( 'build/images' ) );
} );
gulp.task( 'images_watch', function(){
	gulp.watch( 'src/images/**/*', [ 'images' ] );
} );

/*
SVG
 */
gulp.task( 'svg', function(){
	return gulp.src( 'src/svg_sprite/*.svg' )
		.pipe( plumber( plumber_config ) )
		.pipe( imagemin() )
		.pipe( svg_store( {
			fileName: 'svg_sprite.svg',
			prefix: 'icon-'
		} ) )
		.pipe( gulp.dest( 'build/images' ) );
} );
gulp.task( 'svg_watch', function(){
	gulp.watch( 'src/svg_sprite/**/*', [ 'svg' ] );
} );


/*
Fonts
 */
gulp.task( 'fonts', function() {
	return gulp.src( 'src/fonts/**/*', { base: 'src/fonts' } )
		.pipe( gulp.dest( 'build/fonts' ) );
} );
gulp.task( 'fonts_watch', function(){
	gulp.watch( 'src/fonts/**/*', [ 'fonts' ] );
} );



/*
Livereload
 */
gulp.task( 'livereload', function(){
	livereload.listen();
	gulp.watch( [ 'build/**/*', 'src/*.html', 'src/js/**/*' ], function ( evt ) {
		livereload.changed( evt.path );
	} );
} );

/*
Tasks
 */
gulp.task( 'default', [ 'sass', 'images', 'svg', 'fonts' ] );
gulp.task( 'dev', [ 'sass_watch', 'livereload', 'images_watch', 'svg_watch', 'fonts_watch' ] );
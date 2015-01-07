/* global jQuery */
( function( $ ){

	var owl;

	$( function(){

		var owl_el = $( '#main_slider' ).owlCarousel( {
			singleItem: true,
			autoPlay: true,
			stopOnHover: true,
			responsiveBaseWidth: '.main_slider'
		} );

		owl = owl_el.data('owlCarousel');

	} );

	$( window ).load( function(){
		owl.updateVars();
	} );

} )( jQuery );
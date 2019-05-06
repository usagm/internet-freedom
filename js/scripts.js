//var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1p0aBjQryqxNrXEu5iSN4QGXh6SF_KEcmNqNx4pTVMto/pubhtml';


var debugMode = true;
// Basic function to replace console.log() statements so they can all be disabled as needed;
function logger(logString){
	if (debugMode){
		console.log(logString);
	}
}



$(document).ready(function(){
	//logger("Ready");

	// ===================
	// |  Dropdown menu  |
	// ===================
	$(function() {
		$('#main-menu').smartmenus({
			subMenusSubOffsetX: 1,
			subMenusSubOffsetY: -8
		});
	});

	$( "#menuButton" ).click(function() {
		logger("clicked menu toggle")
	  $( ".main-menu-nav").toggle();
	});

	$( ".main-menu-nav a").not(".has-submenu").click(function() {
	  $( ".main-menu-nav").hide();
	});

	$( ".voa__section__full-width" ).click(function() {
	  $( ".main-menu-nav").hide();
	});



	$("a.internet-freedom__entity-link").click(function() {
		var target=$(this).attr('href');
		$("html, body").animate({ scrollTop: $(target).offset().top }, 500);
	    return false;
	});

});
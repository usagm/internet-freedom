var map; //defined here for global access.
var windowSize = window.innerWidth;

//var currentCountry = 0; //number for next/previous
//var currentCountryName = "Russia"; //string name of country

var debugMode = true;
// Basic function to replace console.log() statements so they can all be disabled as needed;
function logger(logString){
	if (debugMode){
		console.log(logString);
	}
}



$(document).ready(function(){
	logger("Ready");

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


	var Stamen_Toner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		subdomains: 'abcd',
		minZoom: 0,
		maxZoom: 20,
		ext: 'png',
		continuousWorld: false
	});
var Stamen_TonerBackground = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

	var myGeoJSONPath = './data/custom.geo--russia.json';//custom.geo--low.json';


    //var myGeoJSONPath = 'path/to/mymap.geo.json';
    var myCustomStyle = {
        stroke: false,
        fill: true,
        fillColor: '#900',
        fillOpacity: .8
    }
    $.getJSON(myGeoJSONPath,function(data){
		map = L.map('map', {
			maxZoom: 5,
			minZoom: 1,
			attributionControl: false,
			scrollWheelZoom: false,
			layers: [Stamen_TonerBackground]
		});

        L.geoJson(data, {
            clickable: false,
            style: myCustomStyle
        }).addTo(map);

		map.fitBounds([
			[70, 155],
			[13, -78]
		]);


    })


	/*

	//=====================================================
	// |  Add support for query strings (for languages)   |
	//=====================================================
	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		    results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	// you'll need to use this after the document has loaded.
	if (countryQuery && countryQuery!=""){
		currentCountryName = countryQuery;
		showCurrentCountry();
	}*/






	//var path = [];
	/*
	var marker;
	var myLayerGroup;


	var Stamen_Toner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		subdomains: 'abcd',
		minZoom: 0,
		maxZoom: 20,
		ext: 'png',
		continuousWorld: false
	});


	//var myGeoJSONPath = './data/custom.geo--medium.json';//custom.geo--low.json';
	var myCustomStyle = {
		stroke: false,
		color: '#FFF',
		weight: 1,
		fill: true,
		fillColor: '#900',
		fillOpacity: .5
	}



		//Create the leaflet map and restrict zoom/boundaries
	map = L.map('map', {
		maxZoom: 7,
		minZoom: 3,
		attributionControl: false,
		scrollWheelZoom: false,
		layers: [Stamen_Toner]
	});

	map.setView([5.15, 46.19], 5)

	//starts map so that the featured countries are centered on the screen.
	/*
	map.fitBounds([
		[70, 155],
		[13, -78]
	]);
	*/


	//5.15, 46.19

	/*
	$.getJSON(myGeoJSONPath,function(data){
		//var map = L.map('map').setView([39.74739, -105], 4);





        L.geoJson(data, {
            clickable: false,
            style: styleConditionallyClaimants//myCustomStyle

        }).addTo(map);
        */
        /*
		var vectorMap = L.geoJson(data, {
			style: myCustomStyle,
			onEachFeature: function (feature, layer) {
				//layer.bindPopup("<h3>" + mapData[feature.properties.name].name + "<img src='img/flags/flag__" + feature.properties.name.toLowerCase() +".png' class='voa__map-popup__flag'/></h3><p>" + mapData[feature.properties.name].facts[0] + " <a href='#'>Read more</a></p>"),
				layer.bindPopup("<h3>" + mapData[feature.properties.name].name + "</h3>"),
				layer.on({
					click: zoomToFeature
				});
			}
		}).addTo(map); 


		console.log("vectorMap")
		console.log(vectorMap._layers);


		var countryLayers__array = []
		var obj = vectorMap._layers;

		for (key in obj) {
	        if (obj.hasOwnProperty(key)) {
	        	countryLayers__array.push(key)
	        }
	    }
	    logger(countryLayers__array);



		function previousButton(){
			if ( currentCountry > 0 ){
				currentCountry--;
			} else {
				currentCountry = countryLayers__array.length - 1;
			}
			console.log("currentCountry: " + currentCountry);
			console.log("countryLayers__array[currentCountry]: " + countryLayers__array[currentCountry]);

			currentCountryName = vectorMap._layers[ countryLayers__array[currentCountry] ].feature.properties.name;
			showCurrentCountry();

			if ( currentCountryName != "Russia" ){
				map.fitBounds(vectorMap._layers[ countryLayers__array[currentCountry] ].getBounds());
				vectorMap._layers[ countryLayers__array[currentCountry] ].openPopup();
			} else {
				console.log("russia");
				map.fitBounds([
					[75, 175],
					[45, 25]
				]);

				var popup = L.popup()
				    .setLatLng([55, 93])
				    .setContent("<h3>RUSSIA</h3>")
				    .openOn(map);

			}


			vectorMap._layers[ countryLayers__array[currentCountry] ].setStyle({
				fillColor :'#900',
				fillOpacity: .8
			})
		}

		function nextButton(){
			resetMapStyle();

			if ( currentCountry < countryLayers__array.length - 1 ){
				currentCountry ++;
			} else {
				currentCountry = 0;
			}
			logger("currentCountry: " + currentCountry);
			logger("countryLayers__array[currentCountry]: " + countryLayers__array[currentCountry]);

			currentCountryName = vectorMap._layers[ countryLayers__array[currentCountry] ].feature.properties.name;
			showCurrentCountry();

			if ( currentCountryName != "Russia" ){
				map.fitBounds(vectorMap._layers[ countryLayers__array[currentCountry] ].getBounds());
				vectorMap._layers[ countryLayers__array[currentCountry] ].openPopup();
			} else {
				console.log("russia");
				map.fitBounds([
					[75, 175],
					[45, 25]
				]);

				var popup = L.popup()
					.setLatLng([55, 93])
					.setContent("<h3>RUSSIA</h3>")
					.openOn(map);

			}

			vectorMap._layers[ countryLayers__array[currentCountry] ].setStyle({
				fillColor :'#900',
				fillOpacity: .8
			}) 

		}

		function resetMapStyle(){
			vectorMap.eachLayer(function (layer) {  
				layer.setStyle(myCustomStyle) 
			})
		}

		function showCurrentCountry(){
			resetMapStyle();
			$(".internet-freedom__map__profile").css("display", "none");
			$("#" + currentCountryName).css("display", "block");
		}

		function zoomToFeature(e) {
			resetMapStyle();

			if ( e.target.feature.properties.name != "Russia" ){
				map.fitBounds(e.target.getBounds());
				//map.fitBounds(vectorMap._layers[ countryLayers__array[currentCountry] ].getBounds());
			} else {
				logger("russia");
				map.fitBounds([
					[75, 175],
					[45, 25]
				]);
			}

			currentCountryName = e.target.feature.properties.name;
			showCurrentCountry();

			e.target.setStyle({
				fillColor :'#900',
				fillOpacity: .8
			})

			//logger("e.target : " + e.target);//.feature.properties);
		}

		$("#previous").click(function(){
			previousButton();
		})

		$("#next").click(function(){
			nextButton();
		})

		$("#showAllCountries").click(function(){
			$(".internet-freedom__map__profile").css("display", "block");
		})




		if (countryQuery && countryQuery!=""){
			currentCountryName = countryQuery;
			showCurrentCountry();

			vectorMap.eachLayer(function (layer) {  

				if (layer.feature.properties.name == currentCountryName) {
					logger("Current Country from query string is: " + layer.feature.properties.name);

					if ( currentCountryName != "Russia"  ){
						map.fitBounds(layer.getBounds());

						layer.openPopup();

					} else {
						logger("russia");
						map.fitBounds([
							[75, 175],
							[45, 25]
						]);

						var popup = L.popup()
						    .setLatLng([55, 93])
						    .setContent("<h3>RUSSIA</h3>")
						    .openOn(map);
					}

					layer.setStyle({
						fillColor :'#900',
						fillOpacity: .8
					})

				}

			})

			if (windowSize < 640){
				logger("small window");

				$('html,body').animate({
					scrollTop: $("#" + currentCountryName).offset().top
				});
			}

		}

    }) //getJSON
*/


	//Add/remove classes after resizing to reset the styles.
	/*
	function resized(){
		windowSize = window.innerWidth;
		if(windowSize>640){
			logger("large");
		} else {
			logger("small");
		}
	}

	$(window).resize(resized);
	resized();
	*/
});
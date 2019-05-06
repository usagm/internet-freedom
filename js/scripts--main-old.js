//var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1p0aBjQryqxNrXEu5iSN4QGXh6SF_KEcmNqNx4pTVMto/pubhtml';
var map; //defined here for global access.


var currentCountry = 0;


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






	//var path = [];
	var marker;
	var myLayerGroup;

	//Define tileset using Mapbox
	var mbToken = 'pk.eyJ1IjoiYndpbGxpYW1zb24iLCJhIjoiY2l0NjU5YWZhMDB0MjJ6cGd5bGU2dDd1cSJ9.4Bv8jg7AH5ksTrEvZyyjoQ';
	var tilesetUrl = 'https://a.tiles.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}@2x.png?access_token='+mbToken;
	var tiles = L.tileLayer(tilesetUrl, {
		maxZoom: 10
	});

	var Stamen_Toner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		subdomains: 'abcd',
		minZoom: 0,
		maxZoom: 20,
		ext: 'png',
		continuousWorld: false
	});



	// https: also suppported.
	var NASAGIBS_ViirsEarthAtNight2012 = L.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
		attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
		bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
		minZoom: 1,
		maxZoom: 8,
		format: 'jpg',
		time: '',
		tilematrixset: 'GoogleMapsCompatible_Level'
	});
	// https: also suppported.
	var Stamen_TonerLines = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}.{ext}', {
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		subdomains: 'abcd',
		minZoom: 0,
		maxZoom: 20,
		ext: 'png'
	});


	var myGeoJSONPath = './data/custom.geo--medium.json';
	var myCustomStyle = {
		stroke: true,
		color: '#000',
		weight: 1,
		fill: true,
		fillColor: '#cf542c',//900',
		fillOpacity: 1//.5
	}

	$.getJSON(myGeoJSONPath,function(data){
		//var map = L.map('map').setView([39.74739, -105], 4);


		//Create the leaflet map and restrict zoom/boundaries
		map = L.map('map', {
			maxZoom: 4,
			minZoom: 1,
			attributionControl: false,
			scrollWheelZoom: false,
			layers: [Stamen_Toner]
		});

		//starts map so that the featured countries are centered on the screen.
		map.fitBounds([
			[70, 155],
			[13, -78]
		]);




		var vectorMap = L.geoJson(data, {
		    /*
		    coordsToLatLng: function (coords) {
		      longitude = coords[0];
		      latitude = coords[1];

		      var latlng = L.latLng(latitude, longitude);

		      if (longitude < 0) {
		        return latlng.wrap(360, 0);
		      }
		      else
		        return latlng.wrap();
		    },
		    */
			style: myCustomStyle,
			onEachFeature: function (feature, layer) {
				layer.bindPopup("<h2 style='text-transform: uppercase;'><img src='img/flags/flag__" + feature.properties.name.toLowerCase() +".png' class='voa__map-popup__flag' style='height: 25px; float: left;'/>" + mapData[feature.properties.name].name + "</h2><p style='margin-top: 5px; font-size: 14px;'>" + mapData[feature.properties.name].facts[0] + " <a href='otf__map.html?country=" + mapData[feature.properties.name].name + "'>Read more</a></p>"),
				layer.on({
					mouseover: highlightFeature,
					mouseout: resetHighlight,
					click: zoomToFeature
				});
			}
		}).addTo(map); //Could also add/remove this layer this on scroll.


			vectorMap.eachLayer(function (layer) {  
				layer.selected=false;
			})


		function highlightFeature(e) {
			var layer = e.target;
			if (!layer.selected) {
				layer.setStyle({
				    fillOpacity: 0.6
				});

				if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
				    layer.bringToFront();
				}
			}
		}
		function resetHighlight(e) {
			var layer = e.target;
			if (!layer.selected) {
		    	vectorMap.resetStyle(e.target);
			}
		}



		logger("vectorMap")
		logger(vectorMap._layers);

		/*
		//map.fitBounds(vectorMap._layers[56].getBounds());

		console.log("vectorMap._layers.length: " + vectorMap._layers.length);
		for (var i = 0; i < vectorMap._layers.length; i++){
			console.log("i: " + i + " -- " + vectorMap._layers[i])
		}
		*/

		var countryLayers__array = []
		var obj = vectorMap._layers;

		for (key in obj) {
	        if (obj.hasOwnProperty(key)) {
	        	countryLayers__array.push(key)
	        }
	    }
	    logger(countryLayers__array);



		function previousButton(){
			resetMapStyle();

			if ( currentCountry > 0 ){
				currentCountry--;
			} else {
				currentCountry = countryLayers__array.length - 1;
			}
			logger("currentCountry: " + currentCountry);
			logger("countryLayers__array[currentCountry]: " + countryLayers__array[currentCountry]);

			if ( vectorMap._layers[ countryLayers__array[currentCountry] ].feature.properties.name != "Russia" ){
				map.fitBounds(vectorMap._layers[ countryLayers__array[currentCountry] ].getBounds());
			} else {
				logger("russia");
				map.fitBounds([
					[75, 175],
					[45, 25]
				]);
			}

			vectorMap._layers[ countryLayers__array[currentCountry] ].openPopup();
			vectorMap._layers[ countryLayers__array[currentCountry] ].selected = true;

			vectorMap._layers[ countryLayers__array[currentCountry] ].setStyle({
				fillColor: '#cf542c',//'#900',
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
			console.log("currentCountry: " + currentCountry);
			console.log("countryLayers__array[currentCountry]: " + countryLayers__array[currentCountry]);

			if ( vectorMap._layers[ countryLayers__array[currentCountry] ].feature.properties.name != "Russia" /* Russia */ ){
				map.fitBounds(vectorMap._layers[ countryLayers__array[currentCountry] ].getBounds());
			} else {
				console.log("russia");
				map.fitBounds([
					[75, 175],
					[45, 25]
				]);
			}
			vectorMap._layers[ countryLayers__array[currentCountry] ].openPopup();
			vectorMap._layers[ countryLayers__array[currentCountry] ].selected = true;

			vectorMap._layers[ countryLayers__array[currentCountry] ].setStyle({
				fillColor: '#cf542c',//'#900',
				fillOpacity: .8
			}) 
		}

		function resetMapStyle(){
			vectorMap.eachLayer(function (layer) {  
				layer.setStyle(myCustomStyle/*{
					fillColor :'#900',
					fillOpacity: .5
				}*/);
				layer.selected = false;
			})
		}

		$("#previous").click(function(){
			previousButton();
		})
		$("#next").click(function(){
			nextButton();
		})



		function zoomToFeature(e) {
			resetMapStyle();
			e.target.selected = true;

			e.target.setStyle({
				fillColor : '#cf542c',//'#900',
				fillOpacity: .8
			})

			//e.target.layer.bindPopup(e.target.feature.properties.name);
			if ( e.target.feature.properties.name != "Russia" /* Russia */ ){
				map.fitBounds(e.target.getBounds());
				//map.fitBounds(vectorMap._layers[ countryLayers__array[currentCountry] ].getBounds());
			} else {
				console.log("russia");
				map.fitBounds([
					[75, 175],
					[45, 25]
				]);
			}

		}

    })


});
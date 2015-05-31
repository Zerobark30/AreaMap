var NYmapData = {
	lat: 41.057,
	lng: -73.844,
	zoom: 11
}

var NYmarkers = [{
	name: "Rando1",
	lat: 41.12,
	lng: -73.6
	},
	{
	name: "Rando2",
	lat: 41.13,
	lng: -73.61
	}
]

var viewModel = function() {
	self = this;

	this.map = ko.observable(NYmapData);
	this.markers = ko.observable(NYmarkers);

	self.myMap = ko.observable({
		lat: this.map().lat,
		lng: this.map().lng,
		zoom: this.map().zoom,
		markers: this.markers()
	});
}

ko.bindingHandlers.map = {
	//create mapview centered over specified area
	init: function(element, valueAccesor) {
		var lat = ko.utils.unwrapObservable(valueAccesor()).lat;
		var lng = ko.utils.unwrapObservable(valueAccesor()).lng;
		var zoom = ko.utils.unwrapObservable(valueAccesor()).zoom;
		var markers =  ko.utils.unwrapObservable(valueAccesor()).markers;
		var mapOptions = {
		center: {lat, lng},
		zoom: zoom,
		streetViewControl: true
		};
		var map = new google.maps.Map(element,mapOptions);

		//function to place marker
		var makeMarker = function(location) {
			var markerLatLng = new google.maps.LatLng(parseFloat(location.lat), 
				parseFloat(location.lng));
			var marker = new google.maps.Marker({
				position: markerLatLng,
				map: map
			})
		};

		//itterates over all markers in array
		markers.forEach(function(e) {
			makeMarker(e)
		});
	}
}

ko.applyBindings(new viewModel());

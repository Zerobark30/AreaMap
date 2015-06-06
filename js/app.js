var NYMap = {
	lat: 40.87,
	lng: -73.854,
	zoom: 12,
	NYMarkers: [{
		name: "Montefiore Moses Campus",
		lat: 40.880151,
		lng: -73.879765,
		vis: true
		},
		{
		name: "Montefiore Weiler Campus",
		lat: 40.849066,
		lng: -73.845836,
		vis: true
		},
		{
		name: "Montefiore Wakefield Campus",
		lat: 40.893753,
		lng: -73.861124,
		vis: true
		}
	]
}

var model = function(data) {
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.zoom = ko.observable(data.zoom);
	this.vis = ko.observable(data.vis);
	this.markers = ko.computed(function() { 
	 for (marker in data.NYMarkers) {	
	 	if (searchBox() === "d" || searchBox() === data.NYMarkers[marker].name) {
	 		data.NYMarkers[marker].vis = false;
	 	}}
	 	return data.NYMarkers;
	});
	
}

var viewModel = function() {
	self = this;
	this.counter = function() {
		console.log(3);
	};

	searchBox = ko.observable("");
	mapData = new model(NYMap);

	self.myMap = ko.observable({
		lat: mapData.lat(),
		lng: mapData.lng(),
		zoom: mapData.zoom(),
		markers: mapData.markers(),
		vis: mapData.vis()
	});
}


ko.bindingHandlers.map = {
	//create mapview centered over specified area
	update: function(element, valueAccesor) {
		var lat = ko.utils.unwrapObservable(valueAccesor()).lat;
		var lng = ko.utils.unwrapObservable(valueAccesor()).lng;
		var zoom = ko.utils.unwrapObservable(valueAccesor()).zoom;
		var latLng = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
		var markers = ko.utils.unwrapObservable(valueAccesor()).markers;
		var mapOptions = {
			center: latLng,
			zoom: zoom
		};
		var map = new google.maps.Map(element,mapOptions);

		//function to place marker
		var makeMarker = function(location) {
			var markerLatLng = new google.maps.LatLng(parseFloat(location.lat), 
				parseFloat(location.lng));
			var marker = new google.maps.Marker({
				position: markerLatLng,
				map: map,
			})
			marker.setVisible(location.vis);
		};

		//itterates over all markers in array
		markers.forEach(function(e) {
			makeMarker(e)
		});

	}
}

ko.applyBindings(new viewModel());

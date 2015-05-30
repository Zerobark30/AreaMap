var NYmapData = {
	lat: 41.057,
	lng: -73.844,
	zoom: 11
}

var viewModel = function() {
	self = this;

	this.map = ko.observable(NYmapData);

	self.myMap = ko.observable({
		lat: this.map().lat,
		lng: this.map().lng,
		zoom: this.map().zoom
	});
}

ko.bindingHandlers.map = {

	init: function(element, valueAccesor) {
		var mapObj = ko.utils.unwrapObservable(valueAccesor());
		var lat =  ko.utils.unwrapObservable(mapObj.lat);
		var lng =  ko.utils.unwrapObservable(mapObj.lng);
		var zoom =  ko.utils.unwrapObservable(mapObj.zoom);
		var mapOptions = {
		center: {lat: lat, lng: lng},
		zoom: zoom,
		streetViewControl: true
		};
		var map = new google.maps.Map(element,mapOptions);
	}	
}

ko.applyBindings(new viewModel());

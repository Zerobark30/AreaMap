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
}

var viewModel = function() { 

	myMap = new model(NYMap);
}

ko.bindingHandlers.mapper = {
	update: function(element, valueAccessor) {
        var mapOptions = {
          center: { lat: -34.397, lng: 150.644},
          zoom: 8
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
	}
};

ko.applyBindings(new viewModel());

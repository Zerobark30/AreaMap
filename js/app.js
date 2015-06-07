var NYMap = {
	lat: 40.87,
	lng: -73.854,
	zoom: 12,
	NYMarkers: [{
		name: "Montefiore Moses Campus",
		lat: ko.observable(40.880151),
		lng: ko.observable(-73.879765),
		vis: ko.observable(true)
		},
		{
		name: "Montefiore Weiler Campus",
		lat: ko.observable(40.849066),
		lng: ko.observable(-73.845836),
		vis: ko.observable(true)
		},
		{
		name: "Montefiore Wakefield Campus",
		lat: ko.observable(40.893753),
		lng: ko.observable(-73.861124),
		vis: ko.observable(true)
		}
	]
}

var model = function(data) {
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.zoom = ko.observable(data.zoom);
	this.markers = ko.computed(function() {
		var searchLen = searchBox().length;
		data.NYMarkers.forEach(function(e){
		if (searchBox() === e.name.substring(0,searchLen))
			e.vis(true);
		else
			e.vis(false);
		});
		return data.NYMarkers},this);
}

var viewModel = function() { 
	var self = this;

	searchBox = ko.observable("");
	myMap = new model(NYMap);
}

ko.bindingHandlers.mapper = {
	
	update: function(element, valueAccessor) {
		var mapData = ko.unwrap(valueAccessor());
		var zoom = mapData.zoom();
		var latLng = new google.maps.LatLng(mapData.lat(), mapData.lng());
        var mapOptions = {
          center: latLng,
          zoom: zoom
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        
        mapData.markers().forEach(function(e) {
        	var markerLatLng = new google.maps.LatLng(e.lat(), e.lng());
        	var marker = new google.maps.Marker({
        		position: markerLatLng,
        		map: map});
        	marker.setVisible(e.vis());
    	});
	}
};

ko.applyBindings(new viewModel());

var NYMap = {
	lat: 40.87,
	lng: -73.854,
	zoom: 12,
	NYMarkers: [{
		name: "Montefiore Moses Campus",
		lat: ko.observable(40.880151),
		lng: ko.observable(-73.879765),
		vis: ko.observable(true),
		articles: ko.observableArray([]),
		infoWindow: ko.observable("")
		},
		{
		name: "Montefiore Einstein Campus",
		lat: ko.observable(40.849066),
		lng: ko.observable(-73.845836),
		vis: ko.observable(true),
		articles: ko.observableArray([]),
		infoWindow: ko.observable("")
		},
		{
		name: "Montefiore Wakefield Campus",
		lat: ko.observable(40.893753),
		lng: ko.observable(-73.861124),
		vis: ko.observable(true),
		articles: ko.observableArray([]),
		infoWindow: ko.observable("")
		}
	]
}

var model = function(data) {
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.latLng = new google.maps.LatLng(this.lat(), this.lng());
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

	this.articles = ko.computed(function() {
		data.NYMarkers.forEach(function(e) {
			$.getJSON('http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + e.name +
				'&api-key=0e6f14d30901c77cfe709f5ee430b971:10:72003949', function(NYTdata) {
	            for (i in NYTdata.response.docs) {
	            	if (i < 3) {
	                	e.infoWindow(e.infoWindow() + "<li><a href=" +
	                	NYTdata.response.docs[i].web_url + ">" +
	                	NYTdata.response.docs[i].headline.main + "</a></li>"
						);
	            	}
	            	else
	            		break;
	            }
        	}).error(function(e) {
            	e.infoWindow("<li>New York Times Articles Could Not Be Loaded</li>");
        	});
    	});
	},this);

}

var viewModel = function() { 
	var self = this;

	searchBox = ko.observable("");
	myMap = new model(NYMap);

}

ko.bindingHandlers.mapper = {
        
	update: function(element, valueAccessor) {        
        mapData = ko.utils.unwrapObservable(valueAccessor());

		map = ko.observable(new google.maps.Map(element,
            {center: mapData.latLng, zoom: mapData.zoom()}));

        mapData.markers().forEach(function(e) {
        	var content = "<div><h3>" + e.name + "</h3><ul>" + 
        		e.infoWindow() + "</ul><div>";
        	var infoWindow = new google.maps.InfoWindow({content: content});
        	var markerLatLng = new google.maps.LatLng(e.lat(), e.lng());
        	var marker = new google.maps.Marker({
        		position: markerLatLng,
        		animation: google.maps.Animation.DROP,
        		map: map()});
        	marker.setVisible(e.vis());
        	        	
        	google.maps.event.addListener(marker, 'click', function() {
        		infoWindow.open(map(),marker);
        	});
    	});
   	}
};

ko.applyBindings(new viewModel());

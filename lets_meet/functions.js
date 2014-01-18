var temp;
temp=new XMLHttpRequest();

var initializeCount = 0;
var count = 0;
var countDestination = 1;

function findPlaceOnMap(){
	alert("Hi!");
}

function removeInput(count1){
	var id = 'newdiv' + count1;
	var element = document.getElementById(id);
	element.parentNode.removeChild(element);
	count = count-1;
}

function removeInputDestination(count1){
	var id = 'placeDestination' + count1;
	var element = document.getElementById(id);
	element.parentNode.removeChild(element);
	countDestination = countDestination - 1;
}

function addInput(){
	count = count+1;
	var newdiv = document.createElement('div');
	newdiv.id = 'newdiv'+count;
	newdiv.classname = 'sidediv2';
	newdiv.innerHTML = 	"\
			<br>\
			Friend Location: <input id='text" + count + "'class='button1 button-rounded' type='text' name='Location' size='50'>\
			<button type='button' class='button5 glow button-rounded button-flat-primary' onclick='removeInput(" +count + ");'>-</button>\
			<br>\
		";
	var parentdiv = document.getElementById('left-pane-2');
	parentdiv.appendChild(newdiv);	
	var id = "text"+count;
	var map = new google.maps.Map(document.getElementById("map-canvas0"), {
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	var defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(-33.8902, 151.1759),
		new google.maps.LatLng(-33.8474, 151.2631)
	);
	var input = /** @type {HTMLInputElement} */(document.getElementById(id));
	var searchBox = new google.maps.places.SearchBox(input);
}

function addInputDestination(){
	if(countDestination > 2){
		alert("That is the maximum number of Destination Places we allow");
	}
	else{
		var div = document.getElementById('left-pane-3');
		div.innerHTML = div.innerHTML + "\
		<div id='placeDestination" + countDestination +"'>\
			<br>\
			<select id='Dest"+ countDestination + "' class='button button-rounded'>\
					<option value='RESTAURANT'>Restaurant</option>\
					<option value='THEATRE'>Movie Theatre</option>\
					<option value='ATM'>ATM</option>\
					<option value='ICECREAM'>Ice-Cream Parlour</option>	\
					<option value='HOTEL'>Hotel</option>\
			</select>\
		</div>\
		";
		countDestination = countDestination + 1;
	}
}


function initialize(number) {
		console.log("HHHHHHHHHHHHHHHHHHH");
	  var map = new google.maps.Map(document.getElementById("map-canvas0"), {
		mapTypeId: google.maps.MapTypeId.ROADMAP
	  });
	  var defaultBounds = new google.maps.LatLngBounds(
		  new google.maps.LatLng(-33.8902, 151.1759),
		  new google.maps.LatLng(-33.8474, 151.2631));
	  map.fitBounds(defaultBounds);
	  var id = "text0";
	  initializeCount = initializeCount +1;
	  var input = /** @type {HTMLInputElement} */(document.getElementById(id));
	  var searchBox = new google.maps.places.SearchBox(input);
	  var markers = [];

	  google.maps.event.addListener(searchBox, 'places_changed', function() {
		var places = searchBox.getPlaces();

		for (var i = 0, marker; marker = markers[i]; i++) {
		  marker.setMap(null);
		}

		markers = [];
		var bounds = new google.maps.LatLngBounds();
		for (var i = 0, place; place = places[i]; i++) {
		  var image = {
			url: place.icon,
			size: new google.maps.Size(71, 71),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(17, 34),
			scaledSize: new google.maps.Size(25, 25)
		  };

		  var marker = new google.maps.Marker({
			map: map,
			icon: image,
			title: place.name,
			position: place.geometry.location
		  });

		  markers.push(marker);

		  bounds.extend(place.geometry.location);
		}

		map.fitBounds(bounds);
	  });

	  google.maps.event.addListener(map, 'bounds_changed', function() {
		var bounds = map.getBounds();
		searchBox.setBounds(bounds);
	  });
}

function initialize1() {
	var map_options = {
		center: new google.maps.LatLng(26.4607,80.3334),
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var google_map = new google.maps.Map(document.getElementById("map-canvas"), map_options);

	var info_window = new google.maps.InfoWindow({
		content: 'loading'
	});

	var t = [];
	var x = [];
	var y = [];
	var h = [];

	t.push('Location Name 1');
	x.push(26.4607);
	y.push(80.3334);
	h.push('<p><strong>Location Name 1</strong><br/>Address 1</p>');

	t.push('Location Name 2');
	x.push(26.4607);
	y.push(80.3434);
	h.push('<p><strong>Location Name 2</strong><br/>Address 2</p>');

	var i = 0;
	
	var pinColor = "000000";
    var pinImage = new google.maps.MarkerImage(
		"http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor
	);
	for ( item in t ) {
		var m = new google.maps.Marker({
			map:       google_map,
			animation: google.maps.Animation.DROP,
			title:     t[i],
			position:  new google.maps.LatLng(x[i],y[i]),
			html:      h[i],
			icon: 		pinImage
		});
		
		google.maps.event.addListener(m, 'click', function() {
			info_window.setContent(this.html);
			info_window.open(google_map, this);
		});
		i++;
	}
}




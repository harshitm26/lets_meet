var geocoder;
var map;
var lat,longi;
var points = new Array();
var points_count = 0;
var found = 0;
var arr1=new Array();
var arr2=new Array();
var arr3=new Array();
var arr=new Array();
var directionsService = new google.maps.DirectionsService();
var directionsDisplay;
var pointsAll = new Array();
var allPointCount = 0;


function initialize2() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(22.7021083, 75.85828025);
  var mapOptions = {
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
}



function getnearby(loc, searchstring){
	
	//for(k=0;k<searchstring.length;k++) {
		var resultList = [];
		var service = new google.maps.places.PlacesService(map);  
		var request = {
			location: loc,
		//	radius: '500',
			types: [searchstring[0]],
			rankBy: google.maps.places.RankBy.DISTANCE
		};
		service.nearbySearch(request, function(results, status, pagination){
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				for(var i=0; i<results.length && i<10; i++){
					//plotResult(results[i]);
					arr1[arr1.length] = results[i];
					if(i==9 && searchstring.length>1){
						var resultList = [];
						var service = new google.maps.places.PlacesService(map);  
						var request = {
							location: loc,
						//	radius: '500',
							types: [searchstring[1]],
							rankBy: google.maps.places.RankBy.DISTANCE
						};
						service.nearbySearch(request, function(results, status, pagination){
							if (status == google.maps.places.PlacesServiceStatus.OK) {
								for(var j=0; j<results.length && j<10; j++){
									//plotResult(results[j]);
									arr2[arr2.length] = results[j];
									if(j==9 && searchstring.length>2){				
										var resultList = [];
										var service = new google.maps.places.PlacesService(map);  
										var request = {
											location: loc,
										//	radius: '500',
											types: [searchstring[2]],
											rankBy: google.maps.places.RankBy.DISTANCE
										};
										service.nearbySearch(request, function(results, status, pagination){
											if (status == google.maps.places.PlacesServiceStatus.OK) {
												for(var l=0; l<results.length && l<10; l++){
													//plotResult(results[l]);
													arr3[arr3.length] = results[l];
													if(l==9){
														var p1=new point(0,0);
														var p2=new point(0,0);
														var p3=new point(0,0);
														var dists=new Array();
														var a1,a2,a3;
														for(a1=0;a1<10;a1++) {
															for(a2=0;a2<10;a2++) {
																for(a3=0;a3<10;a3++) {
																	p1=new point(arr1[a1].geometry.location.mb,arr1[a1].geometry.location.nb);
																	p2=new point(arr2[a2].geometry.location.mb,arr2[a2].geometry.location.nb);
																	p3=new point(arr3[a3].geometry.location.mb,arr3[a3].geometry.location.nb);
																dists[dists.length]=getDist(p1,p2)+getDist(p2,p3);//+getDist(p3,p1);
																}
															}
														}
														index=new Array();
														for(a1=0;a1<dists.length;a1++)
															index[a1]=a1;
														sorted=false;
														while(!sorted) {
															sorted=true;
															for(a1=0;a1<(dists.length-1);a1++) {
																if(dists[a1]>dists[a1+1]) {
																	sorted=false;
																	var temp=dists[a1];
																	dists[a1]=dists[a1+1];
																	dists[a1+1]=temp;
																	temp=index[a1];
																	index[a1]=index[a1+1];
																	index[a1+1]=temp;
																}
															}
														}
														var arr=new Array();
														arr[0]=new Array();
														arr[1]=new Array();
														arr[2]=new Array();
														for(a1=0;a1<10;a1++) {
															var temp=(index[a1]-index[a1]%10)/10;
															arr[0][a1]=arr1[(temp-temp%10)/10];
															arr[1][a1]=arr2[temp%10];
															arr[2][a1]=arr3[index[a1]%10];
															/*
															plotResult(arr1[(temp-temp%10)/10]);
															plotResult(arr2[temp%10]);
															plotResult(arr3[index[a1]%10]);
															*/
														}
														console.log(arr);
														plotClusters(arr);
													}
												}
											}
										});
									}
									if(j==9 && searchstring.length==2){
										var p1=new point(0,0);
										var p2=new point(0,0);
										var dists=new Array();
										var a1,a2;
										for(a1=0;a1<10;a1++) {
											for(a2=0;a2<10;a2++) {
												p1=new point(arr1[a1].geometry.location.mb,arr1[a1].geometry.location.nb);
												p2=new point(arr2[a2].geometry.location.mb,arr2[a2].geometry.location.nb);
												dists[dists.length]=getDist(p1,p2);
											}
										}
										index=new Array();
										for(a1=0;a1<dists.length;a1++)
											index[a1]=a1;
										sorted=false;
										while(!sorted) {
											sorted=true;
											for(a1=0;a1<(dists.length-1);a1++) {
												if(dists[a1]>dists[a1+1]) {
													sorted=false;
													var temp=dists[a1];
													dists[a1]=dists[a1+1];
													dists[a1+1]=temp;
													temp=index[a1];
													index[a1]=index[a1+1];
													index[a1+1]=temp;
												}
											}
										}
										var arr=new Array();
										arr[0]=new Array();
										arr[1]=new Array();
										for(a1=0;a1<10;a1++) {
											arr[0][a1]=arr1[(index[a1]-index[a1]%10)/10];
											arr[1][a1]=arr2[index[a1]%10];
											/*
											plotResult(arr1[(index[a1]-index[a1]%10)/10]);
											plotResult(arr2[index[a1]%10]);
											*/
										}
										plotClusters(arr);
									}
								}
							}
						});
					}
					if(i==9 && searchstring.length==1){
						console.log(arr1);
						var arr=new Array();
						arr[0]=arr1;
						plotClusters(arr);
						/*
						for(var m=0;m<9;m++){
							plotResult(arr1[m]);
						}
						*/
					}
				}
			}
		});
	//}
}

function plotResult(result){
	var marker = new google.maps.Marker({
		map: map,
        position: new google.maps.LatLng(result.geometry.location.mb, result.geometry.location.nb),
		title: result.name,
		icon: getMarkerImage("green")
	});
}

function plotTypeA(result){
	var marker = new google.maps.Marker({
		map: map,
        position: new google.maps.LatLng(result.geometry.location.mb, result.geometry.location.nb),
		title: result.name,
		icon: getMarkerImage("blue")
	});
	pointsAll[allPointCount] = new point(result.geometry.location.mb, result.geometry.location.nb);
	allPointCount += 1;
}

function plotTypeB(result){
	var marker = new google.maps.Marker({
		map: map,
        position: new google.maps.LatLng(result.geometry.location.mb, result.geometry.location.nb),
		title: result.name,
		icon: getMarkerImage("green")
	});
	pointsAll[allPointCount] = new point(result.geometry.location.mb, result.geometry.location.nb);
	allPointCount += 1;
}

function plotTypeC(result){
	var marker = new google.maps.Marker({
		map: map,
        position: new google.maps.LatLng(result.geometry.location.mb, result.geometry.location.nb),
		title: result.name,
		icon: getMarkerImage("white")
	});
	pointsAll[allPointCount] = new point(result.geometry.location.mb, result.geometry.location.nb);
	allPointCount += 1;
}

function plotClusters(clusters){
	for(var i=0; i<clusters.length; i++){
		for(var j=0;j<clusters[i].length; j++){
			if(i==0){
				plotTypeA(clusters[i][j]);
			}else if(i==1){
				plotTypeB(clusters[i][j]);
				var pointA = new google.maps.LatLng(clusters[i-1][j].geometry.location.mb,clusters[i-1][j].geometry.location.nb);
				var pointB = new google.maps.LatLng(clusters[i][j].geometry.location.mb,clusters[i][j].geometry.location.nb);
				calcRoute(pointA, pointB);
				console.log(clusters[i][j].geometry.location);
			}else{
				plotTypeC(clusters[i][j]);
				var pointA = new google.maps.LatLng(clusters[i-1][j].geometry.location.mb,clusters[i-1][j].geometry.location.nb);
				var pointB = new google.maps.LatLng(clusters[i][j].geometry.location.mb,clusters[i][j].geometry.location.nb);
				calcRoute(pointA, pointB);
			}
		}
	}
	autoZoom();
}

function displayDirections(response, status){
	if (status == google.maps.DirectionsStatus.OK) {
	  directionsDisplay.setDirections(response);
	  console.log("displayDirections called");
	}
}

function calcRoute(start, end) {
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  directionsService.route(request, displayDirections);
}


function codeAddress(address, callback) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      addressCallback(results[0].geometry.location, results);
      found = found + 1;
      if(found == count){
		  	var mec=getCentralPoint(points);
			//console.log("Center");
			//console.log(mec.x);
			//console.log(mec.y);
			marklocation(mec.x,mec.y,"blue");
		    var loc = new google.maps.LatLng(mec.x,mec.y);
			map.setCenter(loc);
			//~ getnearby(loc, "restaurant");
	   }
      
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

}

function getMarkerImage(iconColor) {
	if ((typeof(iconColor)=="undefined") || (iconColor==null)) {
		iconColor = "red";
	}
    var	icons = new Array();
	icons[iconColor] = {
		url: "http://labs.google.com/ridefinder/images/mm_20_"+ iconColor +".png",
		size: new google.maps.Size(12, 20),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(6, 20)
	}; 
	return icons[iconColor];
} 

function point(x,y) {
	this.x=x;
	this.y=y;
}

function getDist(p1,p2) {
	return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
}

function getMax(a,b,c) {
	if(a>b) {
		if(a>c) return a;
		else return c;
	}
	else {
		if(b>c) return b;
		else return c;
	}
}

function getCenter3(p1,p2,p3) {/*
	var ma,mb;
	ma=(p2.y-p1.y)/(p2.x-p1.x);
	mb=(p3.y-p2.y)/(p3.x-p2.x);
	var x,y;
	x=(ma*mb*(p1.y-p3.y)+mb*(p1.x+p2.x)-ma*(p2.x+p3.x))/(2*(mb-ma));
	y=(-1/ma)*(x-(p1.x+p2.x)/2)+(p1.y+p2.y)/2;
	var center=new point(x,y);*/
	var x=(p1.x+p2.x+p3.x)/3;
	var y=(p1.y+p2.y+p3.y)/3;
	var center=new point(x,y);
	return center;
}

function getCenter2(p1,p2) {
	var x=(p1.x+p2.x)/2;
	var y=(p1.y+p2.y)/2;
	var center=new point(x,y);
	return center;
}

function circle(c,r) {
	this.c=c;
	this.r=r;
}

function minEnclosingCircle(points) {
	l=points.length;
	var i,j,k,m;
	var ec=new Array();
	var count1=0;
	for(i=0;i<l;i++) {
		for(j=i+1;j<l;j++) {
			for(k=j+1;k<l;k++) {
				var c=getCenter3(points[i],points[j],points[k]);
				var radius=getMax(getDist(c,points[i]),getDist(c,points[j]),getDist(c,points[k]));
				var isInside=true;
				for(m=0;m<l && m!=i && m!=j && m!=k;m++) {
					if(getDist(c,points[m])>radius) {
						isInside=false;
						break;
					}
				}
				if(isInside==true) {
					ec[count1++]=new circle(c,radius);
				}
			}
		}
	}
	for(i=0;i<l;i++) {
		for(j=i+1;j<l;j++) {
			var c=getCenter2(points[i],points[j]);
			var radius=getDist(c,points[i]);
			var isInside=true;
			for(m=0;m<l && m!=i && m!=j;m++) {
				if(getDist(c,points[m])>radius) {
					isInside=false;
					break;
				}
			}
			if(isInside==true) {
				ec[count1++]=new circle(c,radius);
			}
		}
	}
				
	//console.log(ec.length);
	var min=ec[0];
	for(i=1;i<ec.length;i++)
		if(min.r>ec[i].r)
			min=ec[i];
	
	var x=0,y=0;
	for(i=0;i<points.length;i++) {
		x=x+points[i].x;
		y=y+points[i].y;
	}
	min.c.x=x/points.length;
	min.c.y=y/points.length;
	return min;
}

function getCentralPoint(points){
	l = points.length;
	var i,x=0,y=0;
	for(i=0;i<l;i++){
		x = x + points[i].x;
		y = y + points[i].y;
	}
	return new point(x/l,y/l);
}

function marklocation(x,y,colour){
      var marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(x, y),
          icon: getMarkerImage(colour)
      });
}

function addressCallback(location, results){
    marklocation(results[0].geometry.location.mb,results[0].geometry.location.nb,"red");  
	//console.log("LOCATION");
	points[points_count] = new point(location.mb, location.nb); 
	//console.log(points[points_count]);
	points_count = points_count + 1;
}

function bakchodi(addresses, callback) {
	var cod=new Array();
	addresses.push("New York, NY");
	var i;
	for(i=0;i<addresses.length;i++) {
		var address=addresses[i];
		geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			addressCallback(results[0].geometry.location, results, cod);
			found = found + 1;
			if(found == (count+1)) {
				var mec=minEnclosingCircle(cod);
				//console.log(mec);
				var cen=mec.c;
				marklocation(cen.x,cen.y,"blue");
				var loc = new google.maps.LatLng(cen.x,cen.y);
				map.setCenter(loc);
				var arr=new Array();
				for(var j=0; j<countDestination; j++){
					arr[j] = document.getElementById("placeDestination"+j).value;
				}
				getnearby(loc, arr);
			}
		}
		else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
  }
}

function addressCallback(location, results, cod){
    marklocation(results[0].geometry.location.mb,results[0].geometry.location.nb,"red");  
	//console.log("LOCATION");
	points[points_count] = new point(location.mb, location.nb); 
	//console.log(points[points_count]);
	cod.push(points[points_count]);
	points_count = points_count + 1;
	pointsAll[allPointCount] = new point(location.mb, location.nb);
	allPointCount = allPointCount + 1;
}

function autoZoom(){
	alert("zoom karo yaar!");
	console.log("POINTS");
	console.log(points.length);
	
	
	for( var i=0;i<points.length;i++){
		console.log(points[i]);
	}
	// alert('autoZoom');
	//  Make an array of the LatLng's of the markers you want to show
	//var LatLngList = new Array (new google.maps.LatLng (52.537,-2.061), new google.maps.LatLng (52.564,-2.017));
	//  Create a new viewpoint bound
	var bounds = new google.maps.LatLngBounds ();
	//  Go through each...
	
	var latLong = new Array();
	for( var i=0;i<pointsAll.length;i++){
		latLong[i] = new google.maps.LatLng(pointsAll[i].x, pointsAll[i].y);
		//alert(console.log(pointsAll[i]));
		//console.log(pointsAll[i]);
	}
	for (var i = 0, LtLgLen = latLong.length; i < LtLgLen; i++) {
	  //  And increase the bounds to take this point
	  bounds.extend (latLong[i]);
	}
	//  Fit these bounds to the map
	//map.setCenter(bounds.getCenter(), map.getBoundsZoomLevel(bounds));
	console.log("ALL POINTS");
	
	//console.log(pointsAll);
	map.fitBounds(bounds);
	
}

function looping() {
	addresses=new Array();
	var i;
	for(i=0;i<=count;i++) {
		addresses.push(document.getElementById("text"+i).value);
	}
	//console.log(addresses);
	bakchodi(addresses, addressCallback);
}


google.maps.event.addDomListener(window, 'load', initialize2);


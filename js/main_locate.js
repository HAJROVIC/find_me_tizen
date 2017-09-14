function initialisation(){
	var positions = [[36.813597, 10.189506],[36.869026, 10.342274],[36.879060, 10.265714]];
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    var optionsCarte = {
          zoom: 10,
          center: new google.maps.LatLng(latitude, longitude),
          mapTypeId : google.maps.MapTypeId.ROADMAP,
            streetViewControl : false
        }       
        var map = new google.maps.Map(document.getElementById("EmplacementDeMaCarte"), optionsCarte);
        var marker1 = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(latitude, longitude),
                icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                title: 'ESPRIT!'
              }); 
        document.getElementById('span122').innerHTML= "bonjour";

        
        for(var i = 0 ; i < positions.length; i ++)
        {
          var marker = new google.maps.Marker({
              map: map,
              position: new google.maps.LatLng(positions[i][0],positions[i][1])
            });     
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
        	  var destination ='{"lat":"'+positions[i][0]+'","lng":"'+positions[i][1]+'"}';
  		  	sessionStorage.setItem("destination",destination);				  	
  	  	  
          }
      })(marker, i));
      google.maps.event.addListener(marker, 'dblclick', (function(marker, i) {
          return function() {
        	  var destination ='{"lat":"'+positions[i][0]+'","lng":"'+positions[i][1]+'"}';
  		  	sessionStorage.setItem("destination",destination);				  	
  	  	  window.location="directions.html";
          }
      })(marker, i));
      
      
        }

  }

  function error(err) {
      alert("ERROR(" + err.code + "): " + err.message);   
  }
  	navigator.geolocation.watchPosition(success, error,{maximumAge: 60000});
      }

function initMap() { 
	function success(position) {
		var latitude  = position.coords.latitude;
	    var longitude = position.coords.longitude;
	    var destLat;
	    var destLng;
      JSON.parse(sessionStorage.getItem("destination"),function(key,value){
        
        if(key=='lng'){
          destLng=value;

        }
        if(key=='lat'){

          destLat=value;
              }
        });
      var optionsCarte = {
    			zoom: 7 ,
    			center: new google.maps.LatLng(latitude, longitude),
    			mapTypeId : google.maps.MapTypeId.ROADMAP,
    			scrollwheel: true,
    		    streetViewControl : false
    		}		
    var map = new google.maps.Map(document.getElementById('EmplacementDeMaCarte'),optionsCarte);

    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    });

    // Set destination, origin and travel mode.
    var request = {
      destination:  new google.maps.LatLng(destLat,destLng),
      origin: new google.maps.LatLng(latitude, longitude),
      travelMode: 'DRIVING'
    };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        // Display the route on the map.
        directionsDisplay.setDirections(response);
      }
    });
	}
	function error(err) {
	      alert("ERROR(" + err.code + "): " + err.message);   
	  }
	  	navigator.geolocation.watchPosition(success, error,{maximumAge: 60000});
  }
function geocodeLatLng() {
	var destLat;
    var destLng;
    var geocoder = new google.maps.Geocoder;
  JSON.parse(sessionStorage.getItem("destination"),function(key,value){
    
    if(key=='lng'){
      destLng=value;

    }
    if(key=='lat'){

      destLat=value;
          }
    });
      var input = new google.maps.LatLng(destLat, destLng);
	  geocoder.geocode({'location': input}, function(results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
	      if (results[1]) {
	        
	        document.getElementById('span1').innerHTML= results[1].formatted_address;
	       
	      } else {
	        window.alert('No results found');
	      }
	    } else {
	      window.alert('Geocoder failed due to: ' + status);
	    }
	  });
	}
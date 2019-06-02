
var placesAutocomplete = places({
  container: document.querySelector('#address')
});
placesAutocomplete.on('change', function (e) {
  lat = e.suggestion.latlng.lat;
  lng = e.suggestion.latlng.lng;
  getInfos();
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}

function getPosition(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
  getInfos();
}

function getInfos () {
  $.getJSON( "https://api.breezometer.com/air-quality/v2/current-conditions?lat="+ lat +"&lon="+ lng +"&key=de4fef0f7fb349f29f3f21c275018069", function( response ){ 
    
    mark = response.data.indexes.baqi.aqi_display + '<span class="small">%</span>';
    description = response.data.indexes.baqi.category;
    color = response.data.indexes.baqi.color;

    updateView();
  }).fail(function(){
    mark = "N/A";
    description = "No data found";
    color = "";

    updateView();
    return;
  });
}

function updateView() {
  elemAqi.html(mark);
  elemDesc.html(description);
  elemMain.css('background', color);
}

// Lat Lng hardcoded to speed up
var lat = "3.15469";
var lng = "101.714";
placesAutocomplete.setVal("Kuala Lumpur, Malaysia");

var mark = '';
var description = '';
var color = '';
var elemMain = $('.card');
var elemAqi = $('.aqi');
var elemDesc = $('.description');

getInfos();
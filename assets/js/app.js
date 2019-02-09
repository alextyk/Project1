// on click that grabs in the input from the text box when submit is pressed
$("#submit").on("click", function() {
    var address = $("#input");
    var queryURL = "http://www.mapquestapi.com/geocoding/v1/address?key=Hh2Y6dWsZuA1C3ZM4fUcz1KEoUUAKHB2&location=" + address;
// ajax call of the URL
    $.ajax({
      url: queryURL,
      method: "GET"
// parse and store responses
    }).then(function(response) {
      console.log(response);
      console.log(response.results[0].locations[0].latLng);
      var lat = response.results[0].locations[0].latLng.lat;
      var lng = response.results[0].locations[0].latLng.lng;
      console.log(lat);
      console.log(lng);
      showResults(lat, long)
    });
});

function showResults(lat, long) {
  console.log(lat)
  console.log(long)
}

// on click that grabs in the input from the text box when submit is pressed
$("#button-override").on("click", function() {
    var address = $("#input-override").val().trim();
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
      showResults(lat, lng)
    });
});

function showResults(lat, lng) {
  console.log(lat)
  console.log(lng)
}

// ********** SIDEBAR FUNCTIONALITY **********
/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("side-nav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("side-nav").style.width = "0";

  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
  document.getElementById("side-nav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("side-nav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
}
}


// bypassing CORS
jQuery.ajaxPrefilter(function(options) {
  if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

// on click that grabs in the input from the text box when submit is pressed
$("#button-override").on("click", function() {
  $(".storage").empty();
  
  var input = $("#input-override").parsley();
  $("#input-override").attr('data-parsely-validate-if-empty', true);
  if (input.isValid()) {

    var address = $("#input-override").val().trim();
    var queryURL = "http://www.mapquestapi.com/geocoding/v1/address?key=Hh2Y6dWsZuA1C3ZM4fUcz1KEoUUAKHB2&location=" + address;
// ajax call of the URL to get last long
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
      showResults(lat, lng);
      get_woeid_from_latlong(lat, lng);
    });
  } else {
    var error = $('<div class="error">Location must not be empty</div>');
    $('.storage').append(error);
    setTimeout(() => $(".storage").empty(), 5000);
  }
});

function showResults(lat, lng) {
  console.log(lat)
  console.log(lng)
}


// ********** SIDEBAR FUNCTIONALITY **********
/* width of side bar 250px */
function openNav() {
  document.getElementById("side-nav").style.width = "250px";
}

/* close nav bar */
function closeNav() {
  document.getElementById("side-nav").style.width = "0";
  function openNav() {
    document.getElementById("side-nav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  function closeNav() {
    document.getElementById("side-nav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
  }
}

  // function that calls API that gets the WOEID from lat long
function get_woeid_from_latlong(lat, lng) {
  $.ajax({
      url: "https://api.twitter.com/1.1/trends/closest.json?lat=" + lat + "&long=" + lng,
      method: "GET",
      headers: {
          "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAKH%2F5gAAAAAAN9kwQVJuDJk%2Fm1KHHjEugsyFn7c%3DDzSgSVav4KccD3cvoIwEG5lpjoMTjCJVVartb5jfmICvzupeme"
      }
  //parse and store responses
  }).then(function(response) {
      console.log(response);
      console.log(response[0].woeid);
      var woeid = response[0].woeid;
      get_trending_topics(woeid);
  });
}
  // function that calls the Twitter API for trends
function get_trending_topics(woeid) {
 $.ajax({
  url: "https://api.twitter.com/1.1/trends/place.json?id=" + woeid,
  method: "GET",
  headers: {
      "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAKH%2F5gAAAAAAN9kwQVJuDJk%2Fm1KHHjEugsyFn7c%3DDzSgSVav4KccD3cvoIwEG5lpjoMTjCJVVartb5jfmICvzupeme"
  }
  //parse and store responses
 }).then(function(response) {
     console.log(response);
     $(".storage").append(("<h2>")).prepend($("#input-override").val());     
     for (var i = 0; i < 20; i++) {
      $(".storage").append(response[0].trends[i].name);
      $(".storage").append($("<br>"));
     }
     $("#sticky-footer").css("position", "static");
     $("#input-override").val("");
 });
}
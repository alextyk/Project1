jQuery.ajaxPrefilter(function(options) {
  if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

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
      showResults(lat, lng);
      get_woeid_from_latlong(lat, lng);
    });
});

function showResults(lat, lng) {
  console.log(lat)
  console.log(lng)
}

function get_woeid_from_latlong(lat, lng) {
  //console.log("getting woeid from twitter");

  
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
      // console.log(response.result);
      var woeid = response[0].woeid;
      get_trending_topics(woeid);
      // var woeid = response.result.places[0].contained_within[0].id; //haven't tested this yet
      // console.log(woeid);
      //here, we get the trends
      // get_trending_topics(woeid);
  });
}

// function parseTweets(tweets) {
//   console.log(tweets)
// }

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
     
    //  geo_trending_topics.push(response.trends);
     /*
    geotrending topics will contain:
    geo_trending_topics[0].name = "#SomeTopic"
    geo_trending_topics[0].url = "http://twitter.com/search?q=%23SomeTopic"
    geo_trending_topics[0].promoted_content = null
    geo_trending_topics[0].tweet_volume = 57
  //here, we get the trends*/


 });

}

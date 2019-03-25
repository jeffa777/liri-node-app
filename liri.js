  //call to config dotenv file
require("dotenv").config();

  // defining variables
var moment = require("moment");

var keys = require("./keys.js");

var axios = require("axios");

var fs = require("fs");

var nodeArgs = process.argv;

var action = nodeArgs[2];

var value = nodeArgs[3];

    // for loop for all functions
for (i = 4; i < nodeArgs.length; i++) { 
  value += '+' + nodeArgs[i];
}

function sayswho() {
    // defining switch
switch (action) {
    case "concert-this":
      concert();
      break;
    
    case "spotify-this-song":
      spotifythis();
      break;
    
    case "movie-this":
      movie();
      break;
    
    case "do-what-it-says":
      says();
      break;
    }
  }
    sayswho();

    // concert this function
function concert() {

// Run axios request to Bands in Town artist Events API with the band specified
var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);
    // axios get call to pull data for response
axios.get(queryUrl).then(
    function(response) {
      for (i = 0; i < response.data.length; i++){
      console.log("Name of the venue: " + response.data[0].venue.name);
      console.log("City: " + response.data[i].venue.city);
      console.log("Date of the event: " + moment(response.data[i].datetime).format("L"));
      }
    }
  );
}

    //spotify this song function
function spotifythis() {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    
    spotify
        .search({ type: 'track', query: value })
        .then(function(response) {
            console.log(value);
            console.log(response.tracks.items[0].album.artists[0].name);
            console.log(response.tracks.items[0].name);
            console.log(response.tracks.items[0].preview_url);
            console.log(response.tracks.items[0].album.name);  
    })
        .catch(function(err) {
            console.log(err);
        });
}



    //movie function
function movie() {

// Run request with axios to OMDB API with the movie name specified
var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=2fb74768";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);
//axios get call to pull response data
axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country produced: " + response.data.Country);
    console.log("Language of movie: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  }
)}


  //do what it says function
function says() {

      // function to read random.txt file
    fs.readFile("random.txt", "utf8", function(err, data) {
      if(err) {
        return console.log(err);
      }
      var datatext = data.split(",");
      console.log(datatext);
      var result = datatext[1].split(" ");

      console.log(result);
      action = datatext[0];
      value = result[0];

      for (i = 1; i < result.length; i++) {
        value += "+" + result[i];
      }
      console.log(value);
      console.log(action);
      sayswho()
    })
}
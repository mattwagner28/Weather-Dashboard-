var userInput = document.getElementById("user-input");
var searchButton = document.querySelector("#search");

function getAPI(event) {
    event.preventDefault();
    var searchTerms = userInput.value.replaceAll(" ", "");
    var apiKey = '527555cb025cd56f732a616f11737fe5';
    var apiCity = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchTerms + '&limit=' + 1 + '&appid=' + apiKey;
    // var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=' + apiKey;
    fetch(apiCity)
    .then(function (data) {
    return data.json();
    })
    .then(function (data) {
    console.log(data);
    var latitude = data[0].lat;
    var longitude = data[0].lon;
    console.log(latitude);
    console.log(longitude);
    })


}

searchButton.addEventListener("click", getAPI);
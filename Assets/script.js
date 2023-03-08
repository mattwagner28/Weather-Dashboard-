var userInput = document.getElementById("user-input");
var searchButton = document.querySelector("#search");
var currentWeather = document.querySelector("#current-weather");

function getApi(event) {
  event.preventDefault();
  var searchTerms = userInput.value.replaceAll(" ", "");
  var apiKey = "527555cb025cd56f732a616f11737fe5";
  var apiCity =
    "http://api.openweathermap.org/geo/1.0/direct?q=" + searchTerms + "&limit=" + 1 + "&appid=" + apiKey;

  
  fetch(apiCity)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";

            var cityName = data[0].name;
          var cityHeading = document.createElement("h2");
          cityHeading.textContent = cityName;
          document.getElementById("today").appendChild(cityHeading);

      //Gets the 5-day forecast
      fetch(forecastAPI)
        .then(function (forecast) {
          return forecast.json();
        })
        .then(function (forecast) {


          for (i = 0; i < 41; i += 8) {
            //adds date
            var date = dayjs(forecast.list[i].dt_txt).format(
              "dddd MMMM D, YYYY"
            );
            var dateText = document.createElement("p");
            dateText.textContent = date;
            document.getElementById("day-div" + i).appendChild(dateText);

            // // adds weather icon
            var icon = forecast.list[i].weather[0].icon;
            var iconURL = 'https://openweathermap.org/img/wn/' + icon + '.png';
            var iconIMG = document.createElement("img");
            iconIMG.setAttribute("src", iconURL);
            document.getElementById("day-div" + i).appendChild(iconIMG);

            //adds degrees in Farenheit
            var temp = forecast.list[i].main.temp;
            var tempText = document.createElement("p");
            tempText.textContent = "Temp: " + temp + " °F";
            document.getElementById("day-div" + i).appendChild(tempText);

            //adds humidity
            var humidity = forecast.list[i].main.humidity;
            var humidityText = document.createElement("p");
            humidityText.textContent = "Humidity: " + humidity + "%";
            document.getElementById("day-div" + i).appendChild(humidityText);

            //adds Wind speed
            var wind = forecast.list[i].wind.speed;
            var windText = document.createElement("p");
            windText.textContent =
              "Wind: " + Math.round(Number(wind) * 2.23694) + " MPH";
            document.getElementById("day-div" + i).appendChild(windText);
          }
        });
    });
}

searchButton.addEventListener("click", getApi);

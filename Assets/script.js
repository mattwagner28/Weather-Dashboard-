var userInput = document.getElementById("user-input");
var searchButton = document.querySelector("#search");
var currentWeather = document.querySelector("#current-weather");

function getApi(event) {
    event.preventDefault();
    var searchTerms = userInput.value.replaceAll(" ", "");
    var apiKey = '527555cb025cd56f732a616f11737fe5';
    var apiCity = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchTerms + '&limit=' + 1 + '&appid=' + apiKey;
    
        fetch(apiCity)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            var latitude = data[0].lat;
            var longitude = data[0].lon;
            var weatherApi = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey + '&units=imperial';

            fetch(weatherApi)
            .then(function (forecast) {
                return forecast.json();
            })
            .then(function (forecast) {
            console.log(forecast);

                var cityName = forecast.city.name;
                var cityHeading = document.createElement("h2");
                cityHeading.textContent = cityName;
                currentWeather.appendChild(cityHeading);

                
                for (i = 0; i < 41; i+=8) {

                        //adds date
                        var date = dayjs(forecast.list[i].dt_txt).format("dddd MMMM D, YYYY");   
                        var dateText = document.createElement("p");
                        dateText.textContent = date;
                        document.getElementById("day-div" + i).appendChild(dateText);

                        // adds main weather description

                        //adds degrees in Farenheit 
                        var temp = forecast.list[i].main.temp;
                        var tempText = document.createElement("p");
                        tempText.textContent = "Temp: " + temp + " °F";
                        document.getElementById("day-div" + i).appendChild(tempText);

                        //adds Wind speed
                        var wind = forecast.list[i].wind.speed;
                        var windText = document.createElement("p");
                        windText.textContent = "Wind: " + Math.round((Number(wind) * 2.23694)) + " MPH";
                        document.getElementById("day-div" + i).appendChild(windText);

                }

            })

    })
}


searchButton.addEventListener("click", getApi);


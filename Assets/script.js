const userInput = document.getElementById("user-input");
const searchButton = document.querySelector("#search");
const currentWeather = document.querySelector("#current-weather");

function getApi(event) {
    event.preventDefault();
    const searchTerms = userInput.value.replaceAll(" ", "");
    const apiKey = '527555cb025cd56f732a616f11737fe5';
    const apiCity = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchTerms + '&limit=' + 1 + '&appid=' + apiKey;
    
        fetch(apiCity)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            const weatherApi = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey;

            fetch(weatherApi)
            .then(function (forecast) {
                return forecast.json();
            })
            .then(function (forecast) {
            console.log(forecast);

                const cityName = forecast.city.name;
                const cityHeading = document.createElement("h2");
                cityHeading.textContent = cityName;
                currentWeather.appendChild(cityHeading);

        
                for (i = 0; i < 41; i++) {
                    if (i % 8 === 0) {
                date = dayjs(forecast.list[i].dt_txt).format("dddd MMMM D, YYYY");
                console.log(date);
                const dateText = document.createElement("p");
                dateText.textContent = date;
                currentWeather.appendChild(dateText);

                // console.log(dayjs(date).format("D, M, YYYY"));
                }}
            })



    })
}


searchButton.addEventListener("click", getApi);


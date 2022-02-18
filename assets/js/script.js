//list of variables
var searchBtnEl = document.getElementById('search-button');
var searchInputEl = document.getElementById('search-input');
var cityEl = document.getElementById('city');
var dateEl = document.getElementById('date');
var iconEl = document.getElementById('icon');
var tempEl = document.getElementById('temp');
var wind_speedEl = document.getElementById('wind_speed');
var humidityEl = document.getElementById('humidity');
var uviEl = document.getElementById('uvindex');
var daysEl = document.getElementById('days');

//function to call the weather data from openweathermap api by city
function findWeatherByCity(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + '0ca9bd63c01393dc4b98bf32eef9fed8')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('weather: ', data);
            return { lat: data.coord.lat, lon: data.coord.lon }
        })
        .then(function (data) {
            return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.lat + '&lon=' + data.lon + '&units=imperial&appid=0ca9bd63c01393dc4b98bf32eef9fed8')
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('one call', data);
            cityEl.textContent = city
            var timeNow = new Date();

            //displays the current weather data
            dateEl.textContent = timeNow.toLocaleString('en-US', { weekday: "long", month: "long", day: "numeric", year: "numeric" });
            iconEl.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
            tempEl.textContent = "Tempurature: " + data.current.temp + "°F";
            wind_speedEl.textContent = "Wind Speed: " + data.current.wind_speed + " MPH";
            humidityEl.textContent = "Humidity: " + data.current.humidity + "%";
            uviEl.textContent = "UV Index: " + data.current.uvi;

            //loop through weather attributes for the 5 day forecast
            for (let i = 1; i < 6; i++) {
                if (i === 7) { break; }
                var date = new Date(data.daily[i].dt * 1000).toLocaleString('en-US', { weekday: "long", month: "long", day: "numeric", year: "numeric" });
                var icon = data.daily[i].weather[0].icon;
                var temp =  "Tempurature: " + data.daily[i].temp.day + "°F";
                var wind = "Wind Speed: " + data.daily[i].wind_speed + " MPH";
                var humidity = "UV Index: " + data.daily[i].humidity + "%";

                //create element to hold each days data
                var divDay = document.createElement('div')

                //data for each of the 5 days in the 5 days forecast:

                //dates for each day in the 5 day forecast
                var pDate = document.createElement('p')
                divDay.classList.add('weatherdata')
                pDate.textContent = date;
                divDay.append(pDate)
                daysEl.append(divDay)

                //images for each day in the 5 day forecast
                var imgIcon = document.createElement('img')
                divDay.classList.add('weatherdata')
                imgIcon.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                console.log(icon)
                divDay.append(imgIcon)
                daysEl.append(divDay)

                //tempuratures for each day in the 5 day forecast
                var pTemp = document.createElement('p')
                divDay.classList.add('weatherdata')
                pTemp.classList.add('eachdata')
                pTemp.textContent = temp;
                divDay.append(pTemp)
                daysEl.append(divDay)

                // wind speeds for each day in the 5 day forecast
                var pWind = document.createElement('p')
                divDay.classList.add('weatherdata')
                pWind.classList.add('eachdata')
                pWind.textContent = wind;
                divDay.append(pWind)
                daysEl.append(divDay)

                // humidity percentages for each day in the 5 day forecast
                var pHumidity = document.createElement('p')
                divDay.classList.add('weatherdata')
                pHumidity.classList.add('eachdata')
                pHumidity.textContent = humidity;
                divDay.append(pHumidity)
                daysEl.append(divDay)
            }

            // UV Index Color
            var currentUvi = data.current.uvi
            if (currentUvi <= 2) {
                uviEl.classList.add("favorable");
            } else if (currentUvi > 2 && currentUvi < 6) {
                uviEl.classList.add("moderate");
            } else if (currentUvi >= 6) {
                uviEl.classList.add("severe");
            }
        })
};

// Local storage
var addSearchHistory = function(city) {
    searchHistory(city);
    localStorage.setItem("", JSON.stringify(searchHistory));
}








// searchBtnEl.addEventListener('click', function () {
//     var userInput = searchInputEl.value
//     findWeatherByCity(userInput);
  

// $('.searchBtn').click(function () {
//     console.log($(this).siblings('textarea').attr('id'))
//     console.log($(this).siblings('.description').val())

//     localStorage.setItem($(this).siblings('textarea').attr('id'), $(this).siblings('.description').val());
//     console.log('clicked');
// });



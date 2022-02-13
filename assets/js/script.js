var searchBtnEl = document.getElementById('search-button');
var searchInputEl = document.getElementById('search-input');
var cityEl = document.getElementById('city');
var dateEl = document.getElementById('date');
var iconEl = document.getElementById('icon');
var tempEl = document.getElementById('temp');
var wind_speedEl = document.getElementById('wind_speed');
var humidityEl = document.getElementById('humidity');
var uviEl = document.getElementById('uvindex');
var sunriseEl = document.getElementById('sunrise');
var sunsetEl = document.getElementById('sunset');

// const timeInGMT = new Date(epochTime * 1000);

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
            //add date later with datejs
            // iconEl.src ="http://openweathermap.org/img/wn/"+data.weather[0].icon+".png";
            tempEl.textContent = data.current.temp;
            wind_speedEl.textContent = data.current.wind_speed;
            humidityEl.textContent = data.current.humidity;
            uviEl.textContent = data.current.uvi;  
            // sunriseEl.textContent = data.current.sunrise;
            // sunsetEl.textContent = data.current.sunset;


            //loop through all 7 weather attributes for each of the 5 days in the forecast
            for (let i = 1; i < tempEl; i++) {

                console.log(daily(i));
            }
        })
};

searchBtnEl.addEventListener('click', function () {
    var userInput = searchInputEl.value
    findWeatherByCity(userInput);
    // localStorage.setItem('userInput', searchInputEl.value());

    var searchHistory = function () {
        localStorage.setItem("userInput", JSON.stringify(data));
      };
      

})


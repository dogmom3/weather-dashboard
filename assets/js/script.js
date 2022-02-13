var searchBtnEl = document.getElementById('search-button');
var searchInputEl = document.getElementById('search-input');
var cityEl = document.getElementById('city');
var dateEl = document.getElementById('date');
var iconEl = document.getElementById('icon');
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var uvindexEl = document.getElementById('uvindex');


function findWeatherByCity(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + '0ca9bd63c01393dc4b98bf32eef9fed8')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log( 'weather: ', data );
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
            //add icon later
            tempEl.textContent = data.current.temp;
            windEl.textContent = data.current.wind;
            humidityEl.textContent = data.current.humidity;
            uvindexEl.textContent = data.current.uxindex;
        })
    };

searchBtnEl.addEventListener('click', function(){
    var userInput = searchInputEl.value
findWeatherByCity(userInput);
})

//loop through all 7 weather attributes for each of the 5 days in the forecast
for(let i = 1; i < tempEl; i++) {

console.log('i');
}
var submitBtnEl = document.getElementById('submit-button');
var searchInputEl = document.getElementById('search-input');

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
            return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.lat + '&lon=' + data.lon + '&appid=0ca9bd63c01393dc4b98bf32eef9fed8')
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('one call', data);
        })
    };
   

submitBtnEl.addEventListener('click', function(){
var userInput = searchInputEl.value
findWeatherByCity(userInput);
})
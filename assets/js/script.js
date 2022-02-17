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
            var timeNow =  new Date();

           
            
            dateEl.textContent = timeNow.toLocaleString('en-US', {weekday:"long", month:"long", day:"numeric", year:"numeric"});
            iconEl.src ="http://openweathermap.org/img/wn/"+data.current.weather[0].icon+"@2x.png";
            tempEl.textContent = data.current.temp+ ' F';
            wind_speedEl.textContent = data.current.wind_speed;
            humidityEl.textContent = data.current.humidity;
            uviEl.textContent = data.current.uvi;  
        
            //loop through weather attributes the 5 day forecast
            for (let i = 1; i < 6; i++) {
                if (i === 7) {break;}
                var date = new Date(data.daily[i].dt * 1000).toLocaleString('en-US', {weekday:"long", month:"long", day:"numeric", year:"numeric"});
                var icon = data.daily[i].weather[0].icon;
                var temp = data.daily[i].temp.day;
                var wind = data.daily[i].wind_speed;
                var humidity = data.daily[i].humidity;
                
                //5 day forecast data
                var divDay = document.createElement('div')
                var pDate = document.createElement('p')
                divDay.classList.add('weatherdata')
                pDate.classList.add('eachdata')
                pDate.textContent = date;
                divDay.append(pDate)
                daysEl.append(divDay)

                // var divDay = document.createElement('div')
                var imgIcon = document.createElement('img')
                divDay.classList.add('weatherdata')
                imgIcon.src = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
                console.log(icon)
                divDay.append(imgIcon)
                daysEl.append(divDay)

            //    var divDay = document.createElement('div')
                var pTemp = document.createElement('p')
                divDay.classList.add('weatherdata')
                pTemp.textContent = temp;
                divDay.append(pTemp)
                daysEl.append(divDay)

                // var divDay = document.createElement('div')
                var pWind = document.createElement('p')
                divDay.classList.add('weatherdata')
                pWind.textContent = wind;
                divDay.append(pWind)
                daysEl.append(divDay)

                // var divDay = document.createElement('div')
                var pHumidity = document.createElement('p')
                divDay.classList.add('weatherdata')
                pHumidity.textContent = humidity;
                divDay.append(pHumidity)
                daysEl.append(divDay)
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


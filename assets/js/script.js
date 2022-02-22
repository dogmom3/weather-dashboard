var input = document.querySelector("#input");
var searchInputEl = document.querySelector("#search-input");
var searchBtnEl = document.querySelector("#search-button");
var historyEl = document.getElementById("history");
var cityEl = document.getElementById('city');
var dateEl = document.getElementById('date');
var iconEl = document.getElementById('icon');
var tempEl = document.getElementById('temp');
var wind_speedEl = document.getElementById('wind_speed');
var humidityEl = document.getElementById('humidity');
var uviEl = document.getElementById('uvindex');
var daysEl = document.getElementById('days');
var eachDay = document.getElementById('each-day');

//function to call the weather data from openweathermap api by city
function findWeatherByCity(city) {
    daysEl.innerHTML = ''
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + "0ca9bd63c01393dc4b98bf32eef9fed8")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("weather: ", data);
            return { lat: data.coord.lat, lon: data.coord.lon }
        })
        .then(function (data) {
            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.lat + "&lon=" + data.lon + "&units=imperial&appid=0ca9bd63c01393dc4b98bf32eef9fed8")
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("one call", data);
            cityEl.textContent = city
            var timeNow = new Date();

            //displays the current weather data
            dateEl.textContent = timeNow.toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
            iconEl.src = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
            tempEl.textContent = "Tempurature: " + data.current.temp + "°F";
            wind_speedEl.textContent = "Wind Speed: " + data.current.wind_speed + " MPH";
            humidityEl.textContent = "Humidity: " + data.current.humidity + "%";
            uviEl.textContent = "UV Index: " + data.current.uvi;

            //loop through weather attributes for the 5 day forecast
            for (let i = 1; i < 6; i++) {
                if (i === 7) { break; }

                //variables
                var date = new Date(data.daily[i].dt * 1000).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
                var icon = data.daily[i].weather[0].icon;
                var temp = "Tempurature: " + data.daily[i].temp.day + "°F";
                var wind = "Wind Speed: " + data.daily[i].wind_speed + " MPH";
                var humidity = "Humidity: " + data.daily[i].humidity + "%";

                //create element to contain each individual day of the 5 day forecast
                var divEl = document.createElement("div")
                divEl.classList.add("each-day")

                //dates for each date in the 5 day forecast
                var pDate = document.createElement("p")
                pDate.textContent = date;
                divEl.append(pDate)

                //images for each day in the 5 day forecast
                var imgIcon = document.createElement("img")
                imgIcon.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                console.log(icon)
                divEl.append(imgIcon)

                //tempuratures for each day in the 5 day forecast
                var pTemp = document.createElement("p")
                pTemp.textContent = temp;
                divEl.append(pTemp)

                // wind speeds for each day in the 5 day forecast
                var pWind = document.createElement("p")
                pWind.textContent = wind;
                divEl.append(pWind)

                // humidity percentages for each day in the 5 day forecast
                var pHumidity = document.createElement("p")
                pHumidity.textContent = humidity;
                divEl.append(pHumidity)

                //append new element for each day to the dom
                daysEl.append(divEl)
            }

            // UV Index Color
            var currentUvi = data.current.uvi
            if (currentUvi <= 0 || currentUvi <= 2) {
                uviEl.classList.add("favorable");
            } else if (currentUvi > 2 || currentUvi < 6) {
                uviEl.classList.add("moderate");
            } else if (currentUvi >= 6) {
                uviEl.classList.add("severe");
            }
        })

    //add city to search history function
    var addToSearchHistory = function (city) {
        localStorage.setItem("searchInput", JSON.stringify());
    };
}

//event listener for the search button 
searchBtnEl.addEventListener('click', function (event) {
    // prevents browser from reloading on click
    event.preventDefault()
    var searchInput = searchInputEl.value
    findWeatherByCity(searchInput);
    //add search to history
    button = document.createElement("button")
    button.classList.add("historyBtn")
    button.appendChild(document.createTextNode(searchInput))
    button.addEventListener('click', function (event) {
        console.log(event.target.textContent)
        findWeatherByCity(event.target.textContent)
    })
    //displays search on history button
    historyEl.appendChild(button)
    console.log(historyEl)
    searchInputEl.value = " ";
    localStorage.setItem("searchInputEl", historyEl.innerHTML);
})


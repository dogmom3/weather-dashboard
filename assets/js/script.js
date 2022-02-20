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

            //create element to hold each days data
            var divDay = document.createElement("div")
            divDay.classList.add("weatherdata")

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
                var date = new Date(data.daily[i].dt * 1000).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
                var icon = data.daily[i].weather[0].icon;
                var temp = "Tempurature: " + data.daily[i].temp.day + "°F";
                var wind = "Wind Speed: " + data.daily[i].wind_speed + " MPH";
                var humidity = "UV Index: " + data.daily[i].humidity + "%";

                //dates for each date in the 5 day forecast
                var pDate = document.createElement("p")
                divDay.classList.add("weatherdata")
                pDate.textContent = date;
                divDay.append(pDate)
                daysEl.append(divDay)

                //images for each day in the 5 day forecast
                var imgIcon = document.createElement("img")
                divDay.classList.add("weatherdata")
                imgIcon.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                console.log(icon)
                divDay.append(imgIcon)
                daysEl.append(divDay)

                //tempuratures for each day in the 5 day forecast
                var pTemp = document.createElement("p")
                divDay.classList.add("weatherdata")
                pTemp.textContent = temp;
                divDay.append(pTemp)
                daysEl.append(divDay)

                // wind speeds for each day in the 5 day forecast
                var pWind = document.createElement("p")
                divDay.classList.add("weatherdata")
                pWind.textContent = wind;
                divDay.append(pWind)
                daysEl.append(divDay)

                // humidity percentages for each day in the 5 day forecast
                var pHumidity = document.createElement("p")
                divDay.classList.add("weatherdata")
                pHumidity.textContent = humidity;
                divDay.append(pHumidity)
                daysEl.append(divDay)
            }

            // UV Index Color
            var currentUvi = data.current.uvi
            if (currentUvi <= 0 && currentUvi <= 2) {
                uviEl.classList.add("favorable");
            } else if (currentUvi > 2 && currentUvi < 6) {
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


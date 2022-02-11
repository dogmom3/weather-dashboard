var forecast = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
var requestUrl = 'http://openweathermap.org';

fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (var i = 0; i < data.length; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = data[i].html_url;
            forecast.appendChild(listItem);
          }
        console.log(data)
    });
}


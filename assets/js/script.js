fetch ('http://api.openweathermap.org/geo/1.0/direct?q={Raleigh},{NC},{USA}&limit={5}&appid={key1}')
.then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })


// fetch('https://api.openweathermap.org/data/2.5/weather?q=' + 'Raleigh' + '&appid=' + 0ca9bd63c01393dc4b98bf32eef9fed8)
//     .then(function (response) {
//         return res.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     })




// api_key = '0ca9bd63c01393dc4b98bf32eef9fed8'

// var forecast = document.querySelector('ul');
// var fetchButton = document.getElementById('fetch-button');

// function getApi() {
// var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
// fetch(requestUrl)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         for (var i = 0; i < data.length; i++) {
//             var listItem = document.createElement('li');
//             listItem.textContent = data[i].html_url;
//             forecast.appendChild(listItem);
//           }
//         console.log(data)
//     });
// }


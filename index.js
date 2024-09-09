var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var descrip = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');

var apik = "6714d54767968342eaa4105a8310bf56";

function conversion(val) {
    return (val - 273.15).toFixed(2);  // Correct conversion from Kelvin to Celsius
}

btn.addEventListener('click', function() {
    var cityName = inputvalue.value.trim();  // Trim any leading or trailing spaces

    if (!cityName) {
        alert('Please enter a city name.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apik}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('City not found');
            }
            return res.json();
        })
        .then(data => {
            var nameval = data.name;
            var descripText = data.weather[0].description;
            var temperature = data.main.temp;
            var windspeed = data.wind.speed;

            city.innerHTML = `Weather of <span>${nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${conversion(temperature)} °C</span>`;
            descrip.innerHTML = `Sky Conditions: <span>${descripText}</span>`;
            wind.innerHTML = `Wind Speed: <span>${windspeed} km/h</span>`;
        })
        .catch(err => {
            console.error(err);  // Log error to console for debugging
            alert('Error: ' + err.message);
        });
});

var userInput;
var searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    userInput = e.target.children[0].value;
    getApi();
});
//today's date
var todaysDate = moment().format("D MMMM YYYY")


//DOM elements
var currentCity = document.getElementById('current-city')
var currentDay = document.getElementById('current-day')
var currentTemp = document.getElementById('current-temp')
var currentUvi = document.getElementById('current-uvi');
var currentIcon = document.getElementById('current-icon');
var forecastSection = document.getElementById('forecast-section')


function getApi() {

    currentDay.textContent = todaysDate;

    var requestUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=029bba2a4f5f9352670594571d57d373`;

    fetch(requestUrl1).then(function (response) {
        return response.json()
    }).then(function (data) {
        currentCity.textContent = data.name;
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;

        var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly&appid=029bba2a4f5f9352670594571d57d373`
        console.log(requestUrl)
        fetch(requestUrl).then(function (response2) {
            return response2.json()
        }).then(function (data2) {
            console.log('DATA FETCHED BY LON LAT')
            console.log(data2)
            var current = data2.current;
            currentUvi.textContent = current.uvi;
            currentTemp.textContent = Math.round(current.temp);
            iconSlug = current.weather[0].icon;
            currentIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconSlug}.png"/><div>${current.weather[0].description}</div>`

            for (var i = 1; i < data2.daily.length - 2; i++) {
                var eachDay = data2.daily[i];
                var eachDate = new Date(eachDay.dt * 1000)
                var formattedDate = eachDate.toLocaleDateString('en-US', { weekday: 'long' });
                var newForecast = document.createElement('div');
                newForecast.innerHTML = `<div class="card">
                <div class="card-body">
                  <h5 class="card-title">${formattedDate}</h5>
                  <p class="card-text">humidity: ${eachDay.humidity}%</p>
                  <p class="card-text">wind speed: ${Math.round(eachDay.wind_speed)} mph</p>
                  <p class="card-text">Temperature: ${Math.round(eachDay.temp.day)} °F</p>
                </div>
              </div>`
                forecastSection.appendChild(newForecast)
                // console.log('this is the daily high ' + eachDay.temp.day);
                // console.log('this is the daily low ' + eachDay.temp.night);
                // console.log('this is the daily UV index ' + eachDay.uvi);
            }
        });
    });

}

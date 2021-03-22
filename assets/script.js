var userInput;
var searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    userInput = e.target.children[0].value;
    if (userInput.trim() !== '') { getApi(); }

});
//today's date
var todaysDate = moment().format("MMM Do YYYY")

searchItemsFromStorage = JSON.parse(localStorage.getItem("city-search"));



//DOM elements
var currentCity = document.getElementById('current-city');
var currentDay = document.getElementById('current-day');
var currentTemp = document.getElementById('current-temp')
var currentUvi = document.getElementById('current-uvi');
var currentIcon = document.getElementById('current-icon');
var currentWind = document.getElementById('current-wind');
var forecastSection = document.getElementById('forecast-section');
var searchHistory = document.getElementById('search-history');
var city = document.getElementById('city');

for (var i = 0; i < searchItemsFromStorage.length; i++) {
    var listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = searchItemsFromStorage[i]
    //dynamically generate a LI

    //append it to searchHistory
    searchHistory.prepend(listItem)
}

function getApi() {

    currentDay.textContent = todaysDate;

    var requestUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=029bba2a4f5f9352670594571d57d373`;

    fetch(requestUrl1).then(function (response) {
        return response.json()
    }).then(function (data) {
        currentCity.textContent = data.name;

        //LOCAL STORAGE
        if (localStorage.getItem("city-search")) {
            var arrayFromStorage = JSON.parse(localStorage.getItem('city-search'));
            arrayFromStorage.push(data.name);
            localStorage.setItem("city-search", JSON.stringify(arrayFromStorage));
        } else {
            localStorage.setItem("city-search", JSON.stringify([data.name]))

        }
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;

        var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly&appid=029bba2a4f5f9352670594571d57d373`
        fetch(requestUrl).then(function (response2) {
            return response2.json()
        }).then(function (data2) {
            console.log(data2);
            var current = data2.current;
            currentUvi.textContent = current.uvi;
            currentTemp.textContent = Math.round(current.temp);
            currentWind.textContent = Math.round(current.wind_speed);
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
                  <img src="https://openweathermap.org/img/wn/${eachDay.weather[0].icon}.png"/><div>${eachDay.weather[0].description}</div>
                </div>
              </div>`
                forecastSection.appendChild(newForecast)
            }
        });
    });
}
function showHide() {
    var displaySetting = city.style.display
    if (displaySetting == 'block') {
        currentCity.style.display = 'none'
    }
    else { currentCity.style.display = 'block' }
};
showHide();



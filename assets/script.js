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

function getApi() {

    currentDay.textContent = todaysDate;

    var requestUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=029bba2a4f5f9352670594571d57d373`;

    fetch(requestUrl1).then(function (response) {
        return response.json()
    }).then(function (data) {
        currentCity.textContent = data.name;
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;

        var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=029bba2a4f5f9352670594571d57d373`
        console.log(requestUrl)
        fetch(requestUrl).then(function (response2) {
            return response2.json()
        }).then(function (data2) {
            console.log('DATA FETCHED BY LON LAT')
            console.log(data2)
            var current = data2.current;
            currentUvi.textContent = current.uvi;
            currentTemp.textContent = Math.round(current.temp);
            for (var i = 0; i < data2.daily.length; i++) {
                eachDay = data2.daily[i];
                console.log('this is the daily high ' + eachDay.temp.day);
                console.log('this is the daily low ' + eachDay.temp.night);
                console.log('this is the daily UV index ' + eachDay.uvi);
            }
            var weatherData1 = eachDay.temp.day;
            var weatherData2 = eachDay.temp.night;
            var weatherdata3 = eachDay.uvi;

        });
    });

}

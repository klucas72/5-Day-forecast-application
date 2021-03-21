
// var requestUrlAtlanta = 'https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=029bba2a4f5f9352670594571d57d373';

// var requestUrlChicago = 'https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=029bba2a4f5f9352670594571d57d373';
// var requestUrlPhiladelphia = 'https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=029bba2a4f5f9352670594571d57d373';

var userInput;
var searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    userInput = e.target.children[0].value;
    getApi();
});

function getApi() {

    var requestUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=029bba2a4f5f9352670594571d57d373`;

    fetch(requestUrl1).then(function (response) {
        return response.json()
    }).then(function (data) {
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;

        var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=029bba2a4f5f9352670594571d57d373`

        fetch(requestUrl).then(function (response2) {
            return response2.json()
        }).then(function (data2) {
            console.log('DATA FETCHED BY LON LAT')
            console.log(data2)
            for (var i = 0; i < data2.length; i++) {
                // var weatherData = data2.daily[array].temp.day; 
            }
            console.log('this is data2 ' + data2.daily[Array, 7].temp.day);
            console.log('this is data2 ' + data2.daily[Array, 7].temp.night);
        });
    })
    
}

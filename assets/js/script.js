var searchBtn = document.querySelector("#searchBtn");
var searchInputEl = document.querySelector("#city-name");

var theCity = function (city) {
  var apiUrl =
    // "https://api.openweathermap.org/data/2.5/forecast?appid=c1ecab3291362f3fe61c8735f3bd9de6&q=" +

    `https://api.openweathermap.org/data/2.5/weather?q=` +
    city +
    `&units=imperial&appid=c1ecab3291362f3fe61c8735f3bd9de6&q`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log("city", data);
        // data["city"]["coord"]["lat"];

        var lat = data["coord"]["lat"];
        var lon = data["coord"]["lon"];
        var cityName = data["name"];
        console.log(lat, lon, cityName);
        oneCall(lat, lon, cityName);
      });
    }
  });
};
var oneCall = function (lat, lon, cityName) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely,hourly,alerts}&units=imperial&appid=c1ecab3291362f3fe61c8735f3bd9de6&q`;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        display(data, cityName);
        display5(data);
        console.log("data", data);
      });
    }
  });
};

function searchButton(event) {
  event.preventDefault();
  var city = searchInputEl.value.trim();
  if (city) {
    theCity(city);
    console.log(city);
  }
}

var display = function (data, cityName) {
  var currentCity = document.getElementById("date0");
  console.log(cityName, currentCity);
  currentCity.textContent = cityName;

  var temp0 = document.getElementById("temp0");
  temp0.textContent = `Temp: ${data.current.temp} °F`;

  var wind0 = document.getElementById("wind0");
  wind0.textContent = `wind: ${data.current.wind_speed} MPH`;

  var humidity0 = document.getElementById("humidity0");
  humidity0.textContent = `humidity: ${data.current.humidity} %`;

  var uv0 = document.getElementById("uv0");
  uv0.textContent = `UV Index: ${data.current.uvi}`;
};

var display5 = function (data) {
  for (let i = 1; i < 6; i++) {
    var temp = document.getElementById(`temp${i}`);
    var wind = document.getElementById(`wind${i}`);
    var humidity = document.getElementById(`humidity${i}`);

    temp.textContent = `Temp: ${data.daily[i].temp.day} °F`;
    wind.textContent = `wind: ${data.daily[i].wind_speed} MPH`;
    humidity.textContent = `humidity: ${data.daily[i].humidity} %`;
  }
};

searchBtn.addEventListener("click", searchButton);

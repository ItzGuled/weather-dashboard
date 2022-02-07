var searchBtn = document.querySelector("#searchBtn");
var searchInputEl = document.querySelector("#city-name");


var theCity = function (city) {
  var apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=` +
    city +
    `&appid=c1ecab3291362f3fe61c8735f3bd9de6`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log("city", data);
        console.log("icon", data.weather[0].icon);
        var icon = data.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";

        var lat = data["coord"]["lat"];
        var lon = data["coord"]["lon"];
        var cityName = data["name"];
        console.log(lat, lon, cityName);
        oneCall(lat, lon, cityName, iconUrl);
      });
    }
  });
};
var oneCall = function (lat, lon, cityName, iconUrl) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely,hourly,alerts}&units=imperial&appid=c1ecab3291362f3fe61c8735f3bd9de6`;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        display(data, cityName, iconUrl);
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

var display = function (data, cityName, iconUrl) {
  var currentCity = document.getElementById("date0");
  console.log(cityName, currentCity);
  currentCity.textContent = cityName;

  var temp0 = document.getElementById("temp0");
  temp0.textContent = `Temp: ${data.current.temp} °F`;

  var wind0 = document.getElementById("wind0");
  wind0.textContent = `Wind: ${data.current.wind_speed} MPH`;

  var humidity0 = document.getElementById("humidity0");
  humidity0.textContent = `Humidity: ${data.current.humidity}%`;

  var uv0 = document.getElementById("uv0");
  uv0.textContent = `UV Index: ${data.current.uvi}`;

  var icon0 = document.getElementById("icon0");
  icon0.src = iconUrl;
  console.log(icon0.src);

  var today = new Date()
  date.textContent = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()

  
};

var display5 = function (data, icon) {
  var today = new Date()
  for (let i = 1; i < 6; i++) {
    var temp = document.getElementById(`temp${i}`);
    var wind = document.getElementById(`wind${i}`);
    var humidity = document.getElementById(`humidity${i}`);
    var icon = document.getElementById(`icon${i}`);
    var dates = document.getElementById(`date${i}`);
    console.log(icon);
    
    var iconDaily = `${data.daily[i].weather[0].icon}`;
    console.log(iconDaily);
    var iconUrl = "https://openweathermap.org/img/w/" + iconDaily + ".png";

    temp.textContent = `Temp: ${data.daily[i].temp.day} °F`;
    wind.textContent = `Wind: ${data.daily[i].wind_speed} MPH`;
    humidity.textContent = `Humidity: ${data.daily[i].humidity}%`;
    icon.src = iconUrl;
   
    dates.textContent = (today.getMonth()+1)+'/'+ (today.getDate()+ + i)+'/'+today.getFullYear()
  }
};

searchBtn.addEventListener("click", searchButton);

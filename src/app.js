// DATE
function displayDateTime() {
  let now = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];
  let hour = (now.getHours() % 12) || 12;
  let minute = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  let AM_PM = now.getHours() > 11 && now.getHours() < 24 ? `PM` : `AM`; 
  document.querySelector("#todayDate").innerHTML = `${day} ${hour}:${minute} ${AM_PM}`;
}

// Display forecast days
function formatForecastDay(dateStamp) {
  let date = new Date(dateStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// API
let apiKey = "91a36f02a0aeea3d3c4881c6580e425f";

function forecast(coordinates) {
  // console.log(coordinates);
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`
  console.log(apiUrl);
  // Get api then display forecast
  axios.get(apiUrl).then(displayWeatherForecast);
}

function displayWeather(response) {
  displayDateTime();
  let icon = document.querySelector("#currentIcon");

  temperature = response.data.main.temp
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#currentTemp").innerHTML = Math.round(temperature);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  // console.log(response.data);

  forecast(response.data.coord);

}

function displayWeatherForecast(response) {
  // console.log(response.data.daily);
  let forecast_day = response.data.daily;
  let weather_forecast = document.querySelector("#weather-forecast");
  let forecast_card = `<div class="card-group">`
  forecast_day.forEach(function (forecast, index) {        
    if (index > 0 && index < 6) {
      forecast_card += `
        <div class="card-group">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title forecast-day">${formatForecastDay(forecast.dt)}</h5>
              <p class="card-text">
                <span>
                  <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
                </span>            
                <br />
                <span class="text-dark maxTemp" id="max-temp">
                  ${Math.round(forecast.temp.max)}&deg;                 
                </span>
                <span class="text-muted minTemp" id="min-temp">
                  ${Math.round(forecast.temp.min)}&deg;
                </span>
              </p>
            </div>
          </div>
        </div>
      `;
    }
  })
               
  forecast_card += `</div>`;
  weather_forecast.innerHTML = forecast_card;  
}

// Search current location
function searchCurrentLocation(location) {
  let unit = "imperial";
  let currentLocationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(currentLocationApiUrl).then(displayWeather);
}

// To get current location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function searchLocation(location) {
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

// Search location box
let searchForm = document.querySelector("#search-form");
// Handle the form submit
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  searchLocation(searchInput);
});

let currentLocationBtn = document.querySelector("#current-btn");
currentLocationBtn.addEventListener("click", getCurrentLocation);

// Default search
searchLocation("Salt Lake City");


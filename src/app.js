
// API
let apiKey = "91a36f02a0aeea3d3c4881c6580e425f";

function displayWeather(response) {
  let location = document.querySelector("#location");
  let temperature = document.querySelector("#currentTemp");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#currentIcon");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  location.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  // console.log(response.data);
}

function searchLocation(location) {
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
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

// Search location box
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  searchLocation(searchInput);
});

let currentLocationBtn = document.querySelector("#current-btn");
currentLocationBtn.addEventListener("click", getCurrentLocation);

// Default search
searchLocation("Paris");

// DATE

let todayDate = document.querySelector("#todayDate");
let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let h = now.getHours();
let hour = get_12_hours(h);
let minute = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
let AM_PM = get_AM_PM(h);

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function get_12_hours(hour) {
  return (hour % 12) || 12;
}

function get_AM_PM(hour) {
  return hour > 11 && hour < 24 ? `PM` : `AM`;
}

// Display Date
todayDate.innerHTML = `${day} ${hour}:${minute} ${AM_PM}`;

// Conversion
let toFahrenheit = (event) => {
  event.preventDefault();
  let celcius = 19
  let temp = Math.floor(celcius * (9 / 5) + 32);
  f_temp.style.fontWeight = 'bold';
  c_temp.style.fontWeight = 'normal';
  current_temp.innerHTML = `${temp}`;
}

let toCelcius = (event) => {
  event.preventDefault();
  let fahrenheit = 66
  let temp = Math.floor((fahrenheit - 32) * (5 / 9));
  c_temp.style.fontWeight = 'bold';
  f_temp.style.fontWeight = 'normal';
  current_temp.innerHTML = `${temp}`;
}

let f_temp = document.querySelector("#f-temp");
let c_temp = document.querySelector("#c-temp");
let current_temp = document.querySelector("#currentTemp");

f_temp.addEventListener("click", toFahrenheit)

c_temp.addEventListener("click", toCelcius)


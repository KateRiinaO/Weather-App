//challenge1
let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let formattedDate = `${currentDay}  ${hours}:${minutes}, ${currentDate}/${currentMonth}/${currentYear}`;

  return formattedDate;
}
console.log(formatDate(currentTime));

let dayTime = document.querySelector("#date-time");
dayTime.innerHTML = formatDate(currentTime);
///////////////////////////////////////////////////
function showWeather(response) {
  console.log(response);
  let temp = document.querySelector("#temperature-now");
  let temperatureCelsius = Math.round(response.data.main.temp);
  temp.innerHTML = `Temperature: ${temperatureCelsius}℃`;

  let wind = document.querySelector("#wind-now");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `WIND: ${windSpeed} m/s`;

  let humidity = document.querySelector("#humidity-now");
  let hum = response.data.main.humidity;
  humidity.innerHTML = `HUMIDITY: ${hum} %`;

  let maxMin = document.querySelector("#temp-max-min-now");
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  console.log(minTemp);
  console.log(maxTemp);
  maxMin.innerHTML = `MAX/MIN: ${maxTemp}℃/${minTemp}℃`;
}
///// challenge 2
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  console.log(searchInput.value);
  let apiKey = "faf90a5bc03e42145a435bf92d2bbff7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
///////////////////////////
function displayInformation(response) {
  console.log(response);
  let h1 = document.querySelector("#cityMain");
  console.log(response.data.name);
  h1.innerHTML = `${response.data.name}`;
  let temp = document.querySelector("#temperature-now");
  let temperatureCelsius = Math.round(response.data.main.temp);
  temp.innerHTML = `Temperature: ${temperatureCelsius}℃`;
}

function findCurrentLocationWeather(position) {
  let apiKey = "faf90a5bc03e42145a435bf92d2bbff7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayInformation);
}

function clickCurrentButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentLocationWeather);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", clickCurrentButton);

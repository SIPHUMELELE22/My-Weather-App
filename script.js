function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector(".current-city");
  cityElement.innerHTML = searchInput.value;

  let apiKey = "a8410f837a6231f43oc1a1t6c91926bb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let city = response.data.city;
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = `${city}`;

  let iconUrl = response.data.condition.icon_url;
  let iconCode = response.data.condition.icon;
  let iconElement = document.querySelector(".current-temperature-icon");
  iconElement.innerHTML = `<img src=${iconUrl} alt="Weather icon">`;

  let temperatureElement = document.querySelector(".current-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature} `;

  let humidityElement = document.querySelector(".current-humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `HUMIDITY <br /> <strong> ${humidity} % </strong>`;

  let windSpeedElement = document.querySelector(".current-windSpeed");
  let windSpeed = response.data.wind.speed;
  windSpeedElement.innerHTML = `WIND <br /> <strong> ${windSpeed} km/h </strong>`;

  let conditionDescription = document.querySelector(
    ".current-weather-condition"
  );
  let description = response.data.condition.description;
  conditionDescription.innerHTML = `${description}`;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDate = days[day];
  return `${formattedDate}, ${hours}: ${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

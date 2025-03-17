function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchInput(searchInput.value);
}
function search(city) {
  let apiKey = "a8410f837a6231f43oc1a1t6c91926bb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let city = response.data.city;
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = `${city}`;

  let iconElement = document.querySelector(".current-temperature-icon");
  iconElement.innerHTML = `<img src=${response.data.condition.icon_url} alt="Weather icon">`;

  let temperatureElement = document.querySelector(".current-temperature-value");
  let temperature = Math.floor(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature} `;

  let unitElement = document.querySelector(".current-temperature-unit");
  let units = "metric";
  unitElement.innerHTML = units === "metric" ? "°C" : "°F";

  let conditionDescription = document.querySelector(
    ".current-weather-condition"
  );
  let description = response.data.condition.description;
  description = description.charAt(0).toUpperCase() + description.slice(1);
  conditionDescription.innerHTML = `${description}`;

  let humidityElement = document.querySelector(".current-humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `Humidity <br /> <strong> ${humidity} % </strong>`;

  let windSpeedElement = document.querySelector(".current-windSpeed");
  let windSpeed = response.data.wind.speed;
  windSpeedElement.innerHTML = `Wind <br /> <strong> ${windSpeed} km/h </strong>`;

  let currentDateElement = document.querySelector("#current-date");
  let currentDate = new Date(response.data.time * 1000);
  currentDateElement.innerHTML = formatDate(currentDate);

  getForecast(city, units);
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

  return `${day}, ${hours}:${minutes}`;
}

function getForecast(city) {
  let apiKey = "a8410f837a6231f43oc1a1t6c91926bb";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
            <div class="forecast">
              <h3>${formatDay(day.time)}</h3>
              <img src="${day.condition.icon_url}" class="forecast-icon" />
              <div class="forecast-temperature">
                <strong>${Math.floor(
                  day.temperature.maximum
                )}°</strong>  ${Math.floor(day.temperature.minimum)}°
              </div>
            </div>
        `;
    }
  });

  let forecastElement = document.querySelector(".daily-forecast");
  forecastElement.innerHTML = forecastHtml;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = days[date.getDay()];
  let dayOfMonth = date.getDate();

  return `${day} ${dayOfMonth}`;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

search("Paris");

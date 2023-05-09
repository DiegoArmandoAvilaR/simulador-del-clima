const apiKey = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}';

// Selecting DOM elements
const locationInput = document.querySelector('.location-input');
const searchBtn = document.querySelector('.search-btn');
const cityName = document.querySelector('.city-name');
const weatherIcon = document.querySelector('.weather-icon');
const weatherDesc = document.querySelector('.weather-desc');
const temperature = document.querySelector('.temperature');
const feelsLike = document.querySelector('.feels-like');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const error = document.querySelector('.error');

// Function to get weather data
const getWeatherData = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    error.textContent = 'Could not fetch weather data.';
  }
};

// Function to display weather data
const displayWeatherData = (data) => {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherDesc.textContent = data.weather[0].description;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} km/h`;
};

El error que mencionas generalmente ocurre cuando tratas de acceder a un elemento que aún no ha sido cargado en la página. En este caso, el error se produce en la línea 39, lo que sugiere que es probable que el elemento que intenta agregar el EventListener no exista en la página aún.

Una posible solución es asegurarte de que el DOM se haya cargado completamente antes de agregar el EventListener. Puedes hacer esto envolviendo el código en un evento DOMContentLoaded, de la siguiente manera:

javascript

document.addEventListener('DOMContentLoaded', () => {
  // Colocar el código aquí
});

// Event listener for search button click
searchBtn.addEventListener('click', async () => {
  error.textContent = '';
  const city = locationInput.value.trim();
  if (!city) {
    error.textContent = 'Please enter a valid location.';
    return;
  }
  const weatherData = await getWeatherData(city);
  if (weatherData) {
    displayWeatherData(weatherData);
  }
});

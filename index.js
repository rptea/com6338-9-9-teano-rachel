// Your code here
// On page load
// DOM elements
const form = document.querySelector("form");
const input = document.getElementById("weather-search");
const weatherSection = document.getElementById("weather");

// Event listener to form for "submit"
form.addEventListener("submit", function (e){
    e.preventDefault();

    // Clear previous weather data
    weatherSection.innerHTML="";
    // Get user's search input - city name
    var location = input.value.trim();
    // If input is empty, stop function
    if (location === "") return;
    // Reset input value to empty string
    input.value = "";
    // Call fetchWeatherData() with user's input
    fetchWeatherData(location);  
});

/*function fetchWeatherData(location) {
    // Build URL to request weather data
    var apiKey = "721783f86b3969993c78fb01e288d8f7";
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather";
    var queryString = `?units=imperial&appid=${apiKey}&q=${location}`;
    var url = weatherURL + queryString;

    // fetch() to make the request
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Location not found");
            }
            return response.json();
        })
        // Pass successful data to another function to display it
        .then((data) => { 
            showWeatherInfo(data);
        })
        // Handle issues
        .catch((error) => {
            showError();
        });
}*/

// Convert function to arrow function
const fetchWeatherData = async (location) => {
        // Build URL to request weather data
    const apiKey = "721783f86b3969993c78fb01e288d8f7";
    const weatherURL = "https://api.openweathermap.org/data/2.5/weather";
    const queryString = `?units=imperial&appid=${apiKey}&q=${location}`;
    const url = weatherURL + queryString;

    try {
        const response = await fetch(url) //async/await
        if (!response.ok) {
            throw new Error("Location not found");
        }
        const data = await response.json();
        showWeatherInfo(data);
    } catch (error) {
        showError();
    }
}

// Function to display weather data
//function showWeatherInfo(data) {
const showWeatherInfo = (data) => {
    // clear data
    weatherSection.innerHTML = "";

    // Create elements and add:
    const { name, sys: { country } } = data;

    const location = document.createElement("h2");
    location.textContent = `${name}, ${country}`; 
    weatherSection.appendChild(location);

    // <a>link to Google Maps using coords
    /*var lat = data.coord.lat;
    var lon = data.coord.lon;*/
    const { coord: { lat, lon } } = data;

    const mapLink = document.createElement("a");
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    mapLink.textContent = "Click to view map";
    mapLink.target = "_blank";
    weatherSection.appendChild(mapLink);

    // <img> for weather icon using icon code
    const weatherIconCode = data.weather[0].icon;
    const weatherIconUrl = "https://openweathermap.org/img/wn/" + weatherIconCode + "@2x.png";

    const weatherIconImg = document.createElement("img");
    weatherIconImg.src = weatherIconUrl;
    weatherSection.appendChild(weatherIconImg);

    // <p> with weather description
    const [{ description }] = data.weather;
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.style.textTransform = "capitalize";
    weatherSection.appendChild(descriptionElement);

    // <p> with actual temp
    //var actualTemp = document.createElement("p");
    const { temp, feels_like } = data.main;

    const actualTemp = document.createElement("p");
    actualTemp.textContent = `Current: ${temp}° F`;
    weatherSection.appendChild(actualTemp);

    // <p> feels like temp
    const feelsLikeTemp = document.createElement("p");
    feelsLikeTemp.textContent = `Feels like: ${feels_like}° F`;
    weatherSection.appendChild(feelsLikeTemp);

    // <p> with "Last updated: timeString"
    const timestamp = data.dt;
    const date = new Date(timestamp * 1000);
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
    // updated time
    const updatedTime = document.createElement("p");
    updatedTime.textContent = `Last updated: ${timeString}`;
    weatherSection.appendChild(updatedTime);
}
// Show error for invalid location
//function showError() {
const showError = () => {
    // Clear the weather section
    weatherSection.innerHTML = "";
    //add <h2> that says "location not found"
    const errorMessage = document.createElement("h2");
    errorMessage.textContent = "Location Not Found";
    weatherSection.appendChild(errorMessage);

}
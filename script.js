function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        showError("Please enter a city name");
        return;
    }

    // For demo purposes - in a real app, you would use a real API key
    const apiKey = "da14e943e68e680efa77b581d3741e17"; // Replace with your actual OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Show loading state
    document.getElementById("weatherResult").innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i> Loading weather data...
        </div>
    `;

    // In a real app, you would use fetch(url) with error handling
    // For this demo, we'll simulate the API response
    setTimeout(() => {
        // This is a simulation - replace with actual API call
        simulateWeatherResponse(city);
    }, 1000);
}

function simulateWeatherResponse(city) {
    // Simulate API response - in a real app, remove this and use the fetch API
    const weatherData = {
        name: city,
        main: {
            temp: Math.round(Math.random() * 30 - 5), // Random temp between -5 and 25
            humidity: Math.round(Math.random() * 50 + 30) // Random humidity between 30 and 80
        },
        weather: [{
            main: ["Clear", "Clouds", "Rain", "Snow", "Thunderstorm"][Math.floor(Math.random() * 5)]
        }],
        wind: {
            speed: (Math.random() * 10).toFixed(1)
        }
    };

    displayWeather(weatherData);
}

function displayWeather(data) {
    const weatherIcon = getWeatherIcon(data.weather[0].main);
    
    const weatherHTML = `
        <div class="weather-info">
            <h2><i class="fas fa-map-marker-alt"></i> ${data.name}</h2>
            <div class="weather-icon">${weatherIcon}</div>
            <p><i class="fas fa-temperature-high"></i> Temperature: ${data.main.temp}°C</p>
            <p><i class="fas fa-cloud"></i> Weather: ${data.weather[0].main}</p>
            <p><i class="fas fa-tint"></i> Humidity: ${data.main.humidity}%</p>
            <p><i class="fas fa-wind"></i> Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
    
    document.getElementById("weatherResult").innerHTML = weatherHTML;
}

function showError(message) {
    document.getElementById("weatherResult").innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i> ${message}
        </div>
    `;
}

function getWeatherIcon(weatherCondition) {
    const icons = {
        "Clear": '<i class="fas fa-sun" style="color: #FFD700;"></i>',
        "Clouds": '<i class="fas fa-cloud" style="color: #CCCCCC;"></i>',
        "Rain": '<i class="fas fa-cloud-rain" style="color: #4682B4;"></i>',
        "Snow": '<i class="fas fa-snowflake" style="color: #B0E0E6;"></i>',
        "Thunderstorm": '<i class="fas fa-bolt" style="color: #FFA500;"></i>'
    };
    
    return icons[weatherCondition] || '<i class="fas fa-cloud" style="color: #CCCCCC;"></i>';
}

// Allow searching by pressing Enter key
document.getElementById("cityInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
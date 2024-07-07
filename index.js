function weatherFn() {
    const cityName = document.getElementById('city-input').value.trim();
    const weatherInfo = document.getElementById('weather-info');

    if (cityName === "") {
        alert("Please enter a city name");
        return;
    }
    
    const apiKey = 'eddd6abb55048fdc3100af690be64884'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
    .then(response => {
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            weatherInfo.style.display = 'none';
            throw new Error('City not found');
        }
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.querySelector(".error").style.display = "none";
        updateWeather(data);
    })
    .catch(error => {
        if (error.message !== 'City not found') {
            alert("An error occurred fetching weather data. Please try again.");
        }
        console.error('Error:', error);
    });
}

function updateWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const cityNameElement = document.getElementById('city-name');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');

    cityNameElement.textContent = data.name;
    temperatureElement.textContent = `${data.main.temp}°C`;
    descriptionElement.textContent = `${data.weather[0].description}`;

    weatherInfo.style.display = 'block';
    document.querySelector(".error").style.display = "none";

    weatherInfo.classList.add('fade-in');
}

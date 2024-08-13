const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const todaysWeather = document.querySelector(".todaysWeather");
const apiKey = "a3119791f73bef8f6770d1ff48a96fb1";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);
        } catch(error) {
            //displayError(error);
        }
    } else{
        todaysWeather.textContent = "";
        displayError("Enter a City name!");
    }
})

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        todaysWeather.textContent = "";
        displayError("Could not get Weather data.");
        hide3Day();
    }
    return await response.json();
}

function displayWeatherData(data) {
    console.log(data);
    const cityName = data.city.name;
    const currDate = data.list[0].dt_txt.split(" ");
    const date = currDate[0];
    const tempToday = (data.list[0].main.temp - 273.15).toFixed(2);
    const humidityToday = data.list[0].main.humidity;
    const windToday = data.list[0].wind.speed;
    const descToday = data.list[0].weather[0].description;
    const weatherId = data.list[0].weather[0].id;

    todaysWeather.textContent = "";
    todaysWeather.style.display = "flex";
    todaysWeather.style.color = "black";
    const cityDisplay = document.createElement("h1");
    const dateDisplay = document.createElement("p");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const windDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const iconDisplay = document.createElement("p");

    cityDisplay.textContent = cityName.toUpperCase();
    cityDisplay.style.textDecoration = "underline";
    iconDisplay.textContent = weatherEmoji(weatherId);
    dateDisplay.textContent = date;
    dateDisplay.style.fontWeight = "bold";
    tempDisplay.textContent = "Temperature : " + tempToday + "°C";
    humidityDisplay.textContent = "Humidity : " + humidityToday + "%";
    windDisplay.textContent = "Wind speed : " + windToday + "m/s";
    descDisplay.textContent = descToday;
    descDisplay.style.fontWeight = "bold";
    iconDisplay.classList.add("iconDisplay");

    todaysWeather.appendChild(cityDisplay);
    todaysWeather.appendChild(dateDisplay);
    todaysWeather.appendChild(iconDisplay);
    todaysWeather.appendChild(tempDisplay);
    todaysWeather.appendChild(humidityDisplay);
    todaysWeather.appendChild(windDisplay);
    todaysWeather.appendChild(descDisplay);

    const nextDaysContainer = document.querySelector(".nextDays");
    nextDaysContainer.style.display = "flex";

    for (let i = 1; i <= 3; i++) {
        const nextDate = data.list[(8*i)].dt_txt.split(" ");
        const nDate = nextDate[0];
        const temperature = (data.list[(8*i)].main.temp - 273.15).toFixed(2);
        const humidity = data.list[(8*i)].main.humidity;
        const windSpeed = data.list[(8*i)].wind.speed;
        const description = data.list[(8*i)].weather[0].description;
        const iconId = data.list[(8*i)].weather[0].id; 
        const container = document.querySelector(`.daysLater:nth-child(${i})`);
        container.textContent = "";
    
        const fDateDisplay = document.createElement("p");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const windDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const iconShow = document.createElement("p");
        tempDisplay.textContent = "Temperature : " + temperature + "°C";
        humidityDisplay.textContent = "Humidity : " + humidity + "%";
        windDisplay.textContent = "Wind speed : " + windSpeed + "m/s";
        descDisplay.textContent = description;
        descDisplay.style.fontWeight = "bold";
        iconShow.textContent = weatherEmoji(iconId);
        fDateDisplay.textContent = nDate;
        fDateDisplay.style.fontWeight = "bold";
        iconShow.classList.add("iconShow");
        tempDisplay.classList.add("futureForecast");
        humidityDisplay.classList.add("futureForecast");
        windDisplay.classList.add("futureForecast");
        descDisplay.classList.add("futureForecast");
        container.appendChild(fDateDisplay);
        container.appendChild(iconShow);
        container.appendChild(tempDisplay);
        container.appendChild(humidityDisplay);
        container.appendChild(windDisplay);
        container.appendChild(descDisplay);
        console.log(weatherId);
    }
    

}

function weatherEmoji(weatherId) {
    if(weatherId === 800){
        return "☀️";
    } else if(weatherId >= 200 && weatherId < 300) {
        return "⛈️";
    } else if(weatherId >= 300 && weatherId < 400) {
        return "🌧️";
    } else if(weatherId >= 500 && weatherId < 600) {
        return "🌧️";
    } else if(weatherId >= 600 && weatherId < 700) {
        return "❄️";
    } else if(weatherId >= 700 && weatherId < 800) {
        return "🌫️";
    } else if(weatherId >= 801 && weatherId < 810) {
        return "☁️";
    }
    return "☀️";
}

function displayError(msg) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = msg;
    errorMessage.classList.add("todaysWeather");
    todaysWeather.style.display ="flex";
    todaysWeather.style.color = "red";
    todaysWeather.appendChild(errorMessage);
    hide3Day();
}

function hide3Day() {
    const nextDaysContainer = document.querySelector(".nextDays");
    nextDaysContainer.style.display = "none";
}
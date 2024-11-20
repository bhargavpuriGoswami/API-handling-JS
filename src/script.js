document.addEventListener("DOMContentLoaded",()=>{
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

    APIKEY="get your API from open weather website"

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

    async function fetchWeatherData(city){
        
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKEY}`;
        
        
        const response = await fetch(url);
        console.log(response);
        const data = await response.json();
        console.log(data[0].name);
        
        if (!data[0].name) {
            console.log("Error");
            throw new Error(" City Not found");
          }
          return data;
    }

    async function displayWeatherData(data){
        //console.log(data);
        const {name, lat, lon}=data[0];
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${APIKEY}`
        const response = await fetch(url);
        const data2= await response.json();
        console.log(data2);
        errorMessage.classList.add("hidden")
        weatherInfo.classList.remove("hidden")
        const {main,weather}=data2;
        cityNameDisplay.textContent=name;
        temperatureDisplay.textContent=`${main.temp}`
        descriptionDisplay.textContent= `${weather[0].description}`
    }

    function showError(){
        errorMessage.classList.remove('hidden')
        weatherInfo.classList.add("hidden")
    }
})

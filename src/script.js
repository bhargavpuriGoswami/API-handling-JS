document.addEventListener("DOMContentLoaded",()=>{
    const cityInput=document.getElementById("city-input");
    const getWeatherBtn= document.getElementById("get-weather-btn");
    const weatherInfo=document.getElementById("weather-info");
    const cityName=document.getElementById("city-name");
    const temperature=document.getElementById("temperature");
    const description=document.getElementById("description");
    const errorMessage=document.getElementById("error-message");


    APIKEY="263e54af96a5f50b025610a20d4f9b73"
    getWeatherBtn.addEventListener("click",async()=>{
        const city= cityInput.value.trim();
        if(!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

    })

    async function fetchWeatherData(city){
        
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKEY}`;
        const response = await fetch(url);
        const data= await response.json();

        if (data.length()==0){
            throw new Error("city not found");
        }

        return data;
    }

    async function displayWeatherData(data){
        console.log(data);
        const {name, lat, lon}=data[0];
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${APIKEY}`
        const response = await fetch(url);
        const data2= await response.json();
        const {main,weather}=data2;
        console.log(data2);
        cityName.textContent=name;
        temperature.textContent=`Temperature : ${main.temp}`
        description.textContent= `Weather : ${weather[0].description}`
    }

    function showError(){
        errorMessage.classList.remove('hidden')
    }
})
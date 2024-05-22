const apikey = "5d50cb77a4d850371ce5a430e31c9b24";
const cityInputEl = document.getElementById('city-input');
const weatherDataEl = document.getElementById('weather-data');
const formEl = document.querySelector('form');

const getWeatherData = async (cityValue) =>{
    console.log(`City: ${cityValue}`);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //数据相关的都用await
        const data = await response.json();
        console.log('data',data);
        //处理数据
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed:${data.wind.speed} m/s`
        ];
        //insert the icon,在li里面直接差一个img element
        weatherDataEl.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon"/>`
        //set li.temperature content
        weatherDataEl.querySelector('.temperature').textContent = `${temperature}°C`;
        //set li.description content
        weatherDataEl.querySelector('.description').textContent = description;
        //map the details data
        //map():every element of details array from detail to <div>${detail}</div>`
        //join(""): return a new string by concatenating all elements, seperated by nothing
        weatherDataEl.querySelector('.details').innerHTML = details.map(detail =>`<div>${detail}</div>`).join("");
    } catch (error) {
        
    }
}

formEl.addEventListener('submit',(event)=>{
    event.preventDefault();//prevent turn to other page
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
})
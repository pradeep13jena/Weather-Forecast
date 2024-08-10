// For Search bar
const searchBar = document.querySelector('#search-bar');
const suggestions = document.querySelector('#suggestion-box');
const useLocation = document.getElementById('use-location');

// For button
const btn = document.querySelector('button');

// For Date 

const now = new Date()
const date = now.toISOString().split('T')[0];


// Finding the value of currect weather data to display
const degreeValue = document.getElementById('degreeValue')
const cityLocattion = document.getElementById('cityLocattion')
const dateAndTime = document.getElementById('dateAndTime')
const imageWeather = document.getElementById('imageWeather')
const preciToday = document.getElementById('preciToday')
const humiToday = document.getElementById('humiToday')
const windToday = document.getElementById('windToday')
const valueText = document.getElementById('valueText')

// Finding the value of Current + 1 weather data to display
const imageWeatherOne = document.getElementById('imageWeatherOne')
const tempTodayOne = document.getElementById('tempTodayOne')
const humiTodayOne = document.getElementById('humiTodayOne')
const windTodayOne = document.getElementById('windTodayOne')
const dateOne = document.getElementById('dateForecasrOne')

// Finding the value of Current + 2 weather data to display
const imageWeatherTwo = document.getElementById('imageWeatherTwo')
const tempTodayTwo = document.getElementById('tempTodayTwo')
const humiTodayTwo = document.getElementById('humiTodayTwo')
const windTodayTwo = document.getElementById('windTodayTwo')
const dateTwo = document.getElementById('dateForecasrTwo')

// Finding the value of Current + 3 weather data to display

const imageWeatherThree = document.getElementById('imageWeatherThree')
const tempTodayThree = document.getElementById('tempTodayThree')
const humiTodayThree = document.getElementById('humiTodayThree')
const windTodayThree = document.getElementById('windTodayThree')
const dateThree = document.getElementById('dateForecasrThree')

// Finding the value of Current + 4 weather data to display

const imageWeatherFour = document.getElementById('imageWeatherFour')
const tempTodayFour = document.getElementById('tempTodayFour')
const humiTodayFour = document.getElementById('humiTodayFour')
const windTodayFour = document.getElementById('windTodayFour')
const dateFour = document.getElementById('dateForecasrFour')

// Finding the value of Current + 5 weather data to display

const imageWeatherFive = document.getElementById('imageWeatherFive')
const tempTodayFive = document.getElementById('tempTodayFive')
const humiTodayFive = document.getElementById('humiTodayFive')
const windTodayFive = document.getElementById('windTodayFive')
const dateFive = document.getElementById('dateForecasrFive')

function updateDateTime(){
    dateAndTime.innerHTML = `${date}`
}

window.onload = updateDateTime()

searchBar.addEventListener('focus', () => {
    suggestions.classList.remove('suggestion');
    suggestions.classList.add('active');
});

searchBar.addEventListener('blur', () => {
    setTimeout(() => {
        suggestions.classList.remove('active');
        suggestions.classList.add('suggestion');
    }, 400);
});

useLocation.addEventListener('click', () => {
    alert("Using current location...");
    // Here you can add functionality to get the user's current location.
    // For example, using the Geolocation API.
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // You can now use the latitude and longitude for further processing.
    });
});

async function search(){
    divInSearchBar = document.createElement('div')
    divInSearchBar.innerText = searchBar.value
    suggestions.appendChild(divInSearchBar)

    localStorage.setItem("suggestionBox", suggestions.innerHTML);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    cityName = searchBar.value

    try{
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c3d1cab6249d4373bc3131136240608&q=${cityName}&days=5`, {
            signal: controller.signal, // Pass the AbortController signal
        });
    
        clearTimeout(timeoutId);
    
        // Check if the response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else{
            searchBar.value = ''
        }

        const data = await response.json()

        degreeValue.innerHTML = `${Math.trunc(data.current.temp_c)}&degc`
        cityLocattion.innerHTML = `${cityName}`
        dateAndTime.innerHTML = `${date}`
        imageWeather.src = `${data.current.condition.icon}`
        preciToday.innerHTML = `${data.current.precip_mm}%`
        humiToday.innerHTML = `${data.current.humidity}%`
        windToday.innerHTML = `${data.current.wind_kph}kph`
        valueText.innerHTML = `${data.current.condition.text}`

        // Updating 1st day forecast

        dateOne.innerHTML = data.forecast.forecastday[0].date
        imageWeatherOne.src = data.forecast.forecastday[0].day.condition.icon
        tempTodayOne.innerHTML = `Temp - ${Math.trunc(data.forecast.forecastday[0].day.avgtemp_c)}&degc`
        windTodayOne.innerHTML = `Wind - ${data.forecast.forecastday[0].day.maxwind_kph} kph`
        humiTodayOne.innerHTML = `Humi - ${data.forecast.forecastday[0].day.avghumidity}%`
        
        
        dateTwo.innerHTML = data.forecast.forecastday[1].date
        imageWeatherTwo.src = data.forecast.forecastday[1].day.condition.icon
        tempTodayTwo.innerHTML = `Temp - ${Math.trunc(data.forecast.forecastday[1].day.avgtemp_c)}&degc`
        windTodayTwo.innerHTML = `Wind - ${data.forecast.forecastday[1].day.maxwind_kph} kph`
        humiTodayTwo.innerHTML = `Humi - ${data.forecast.forecastday[1].day.avghumidity}%`

        dateThree.innerHTML = data.forecast.forecastday[2].date
        imageWeatherThree.src = data.forecast.forecastday[2].day.condition.icon
        tempTodayThree.innerHTML = `Temp - ${Math.trunc(data.forecast.forecastday[2].day.avgtemp_c)}&degc`
        windTodayThree.innerHTML = `Wind - ${data.forecast.forecastday[2].day.maxwind_kph} kph`
        humiTodayThree.innerHTML = `Humi - ${data.forecast.forecastday[2].day.avghumidity}%`

        dateFour.innerHTML = data.forecast.forecastday[3].date
        imageWeatherFour.src = data.forecast.forecastday[3].day.condition.icon
        tempTodayFour.innerHTML = `Temp - ${Math.trunc(data.forecast.forecastday[3].day.avgtemp_c)}&degc`
        windTodayFour.innerHTML = `Wind - ${data.forecast.forecastday[3].day.maxwind_kph} kph`
        humiTodayFour.innerHTML = `Humi - ${data.forecast.forecastday[3].day.avghumidity}%`

        dateFive.innerHTML = data.forecast.forecastday[4].date
        imageWeatherFive.src = data.forecast.forecastday[4].day.condition.icon
        tempTodayFive.innerHTML = `Temp - ${Math.trunc(data.forecast.forecastday[4].day.avgtemp_c)}&degc`
        windTodayFive.innerHTML = `Wind - ${data.forecast.forecastday[4].day.maxwind_kph} kph`
        humiTodayFive.innerHTML = `Humi - ${data.forecast.forecastday[4].day.avghumidity}%`

        
    } catch (error) {
        // Handle fetch-related errors and timeouts
        if (error.name === "AbortError") {
          alert("Request timed out. Please try again.")
        } else if (error.message.startsWith("HTTP error!")) {
           alert(`API error: ${error.message}`)
        } else {
          alert(`Network error: ${error.message}`)
        }
      }

    

}

function restoreElement(){
    savedValue = localStorage.getItem('suggestionBox')
    if (savedValue){
        suggestions.innerHTML = savedValue
    } else {
        suggestions.innerHTML = useLocation.innerHTML
    }
}

btn.addEventListener('click', search)

window.onload = restoreElement
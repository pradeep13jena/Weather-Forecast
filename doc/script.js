// For Search bar and search button
const searchBar = document.querySelector('#search-bar');
const suggestions = document.querySelector('#suggestion-box');
const useLocation = document.getElementById('use-location');
const onlyForUseCurrent = document.getElementById('onlyForUseCurrent')
const btn = document.querySelector('button');

// This is a regular expression which checks the value if it's a string or not
const regex = /^[A-Za-z\s]+$/

// Finding the date  
const now = document.getElementById('time')

// Finding the values from object model to display current weather data
const degreeValue = document.getElementById('degreeValue')
const cityLocattion = document.getElementById('cityLocattion')
const dateAndTime = document.getElementById('dateAndTime')
const imageWeather = document.getElementById('imageWeather')
const preciToday = document.getElementById('preciToday')
const humiToday = document.getElementById('humiToday')
const windToday = document.getElementById('windToday')
const valueText = document.getElementById('valueText')

// Finding the values from object model to display 1st day weather data
const imageWeatherOne = document.getElementById('imageWeatherOne')
const tempTodayOne = document.getElementById('tempTodayOne')
const humiTodayOne = document.getElementById('humiTodayOne')
const windTodayOne = document.getElementById('windTodayOne')
const dateOne = document.getElementById('dateForecasrOne')

// Finding the values from object model to display 2nd day weather data
const imageWeatherTwo = document.getElementById('imageWeatherTwo')
const tempTodayTwo = document.getElementById('tempTodayTwo')
const humiTodayTwo = document.getElementById('humiTodayTwo')
const windTodayTwo = document.getElementById('windTodayTwo')
const dateTwo = document.getElementById('dateForecasrTwo')

// Finding the values from object model to display 3rd day weather data
const imageWeatherThree = document.getElementById('imageWeatherThree')
const tempTodayThree = document.getElementById('tempTodayThree')
const humiTodayThree = document.getElementById('humiTodayThree')
const windTodayThree = document.getElementById('windTodayThree')
const dateThree = document.getElementById('dateForecasrThree')

// Finding the values from object model to display 4th day weather data
const imageWeatherFour = document.getElementById('imageWeatherFour')
const tempTodayFour = document.getElementById('tempTodayFour')
const humiTodayFour = document.getElementById('humiTodayFour')
const windTodayFour = document.getElementById('windTodayFour')
const dateFour = document.getElementById('dateForecasrFour')

// Finding the values from object model to display 5th day weather data
const imageWeatherFive = document.getElementById('imageWeatherFive')
const tempTodayFive = document.getElementById('tempTodayFive')
const humiTodayFive = document.getElementById('humiTodayFive')
const windTodayFive = document.getElementById('windTodayFive')
const dateFive = document.getElementById('dateForecasrFive')

// Function to do stuff when the page is reloaded
function restoreElement(){
    // Pull value from session storage to display the search box
    savedItem = sessionStorage.getItem('saveIT')
    savedCItyInSess = sessionStorage.getItem('savedCity')

    // IF value is null (as there is nothing in there) then display the "use current Location"
    if (savedItem === null) {
        suggestions.innerHTML = onlyForUseCurrent.innerHTML
    } else { // if it's not null display the stored data
        suggestions.innerHTML = savedItem
    }

    // IF savedCity is null (as there is nothing in there) in session storage then display 'Mumbai' as default city
    if(savedCItyInSess === null){
        feedUI('Mumbai')
    } else { //If there is some value in session storage for savedCIty then display that value
        feedUI(savedCItyInSess)
    }

}

// Calling the function everytime the window browser is reloaded
window.onload = restoreElement // this onload is at the top as it'll make it quicker to reload the page

// For the suggestion box, as soon as the search bar is focused you can see all the option of the cities that have been saved
searchBar.addEventListener('focus', () => {
    suggestions.classList.remove('suggestion');
    suggestions.classList.add('active');
});

// For the suggestion box, as soon as the search bar is out of focused you can see all the option of the cities get disappear
searchBar.addEventListener('blur', () => {
    setTimeout(() => {
        suggestions.classList.remove('active');
        suggestions.classList.add('suggestion');
    }, 300);
});  

// Created a async function which takes city name and then feed the UI of the app so we can use it again and again instead of writing it many times
async function feedUI(citie){

    // Initializing a controller for controlling timeout after 5 seconds
    const controller = new AbortController();
    // Function to abort the controller as soon as 5 second is completed
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try{
        // to fetch the data by taking the function variable from API
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c3d1cab6249d4373bc3131136240608&q=${citie}&days=5`, {
            signal: controller.signal, // Pass the AbortController signal
        });
    
        // clear the timeout if the data has return to be on safer side
        clearTimeout(timeoutId);
    
        // Check if the response is ok
        if (!response.ok) {
            // if the response is not okay then throw error
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else{ // if the response is okay then make the searchbar empty
            searchBar.value = ''
        }

        // Convert the returned data to javascript object format
        const data = await response.json()
        
        // Now fill the data on to screen
        now.innerHTML = `${data.location.localtime}` // Local date and time
        degreeValue.innerHTML = `${Math.trunc(data.current.temp_c)}&degc` // degree celcius
        cityLocattion.innerHTML = `${data.location.name.charAt(0).toUpperCase() + data.location.name.slice(1)}` //cityname 

        sessionStorage.setItem('savedCity', cityLocattion.innerText) // created this session storage

        dateAndTime.innerHTML = `(${data.location.region}, ${data.location.country})` //Country name
        imageWeather.src = `https:${data.current.condition.icon}` //icon to be displayed
        preciToday.innerHTML = `${data.current.precip_mm}%` //precipitation
        humiToday.innerHTML = `${data.current.humidity}%` //humidity
        windToday.innerHTML = `${data.current.wind_kph}kph` // wind speed
        valueText.innerHTML = `${data.current.condition.text}` // condition text

        // Updating 1st day forecasted weather data
        dateOne.innerHTML = data.forecast.forecastday[0].date // local date + 1 day
        imageWeatherOne.src = `https:${data.forecast.forecastday[0].day.condition.icon}` // icon to be displayed
        tempTodayOne.innerHTML = `Temp - ${Math.trunc(data.forecast.forecastday[0].day.avgtemp_c)}&degc` //degree
        windTodayOne.innerHTML = `Wind - ${data.forecast.forecastday[0].day.maxwind_kph} kph` //wind
        humiTodayOne.innerHTML = `Humi - ${data.forecast.forecastday[0].day.avghumidity}%` //humidity
        
        // Updating 2nd day forecasted weather data
        dateTwo.innerHTML = data.forecast.forecastday[1].date// local date + 1 day
        imageWeatherTwo.src = `https:${data.forecast.forecastday[1].day.condition.icon}` // icon to be displayed
        tempTodayTwo.innerHTML = `Temp - ${Math.trunc(data.forecast.forecastday[1].day.avgtemp_c)}&degc` //degree
        windTodayTwo.innerHTML = `Wind - ${data.forecast.forecastday[1].day.maxwind_kph} kph`//wind
        humiTodayTwo.innerHTML = `Humi - ${data.forecast.forecastday[1].day.avghumidity}%` //humidity

        // Updating 3rd day forecasted weather data
        dateThree.innerHTML = data.forecast.forecastday[2].date// local date + 1 day
        imageWeatherThree.src = `https:${data.forecast.forecastday[2].day.condition.icon}` // icon to be displayed
        tempTodayThree.innerHTML = `Temp - ${Math.trunc(data.forecast.forecastday[2].day.avgtemp_c)}&degc` //degree
        windTodayThree.innerHTML = `Wind - ${data.forecast.forecastday[2].day.maxwind_kph} kph`//wind
        humiTodayThree.innerHTML = `Humi - ${data.forecast.forecastday[2].day.avghumidity}%` //humidity

        // Updating 4th day forecasted weather data
        dateFour.innerHTML = data.forecast.forecastday[3].date// local date + 1 day
        imageWeatherFour.src = `https:${data.forecast.forecastday[3].day.condition.icon}` // icon to be displayed
        tempTodayFour.innerHTML = `Temp - ${Math.trunc(data.forecast.forecastday[3].day.avgtemp_c)}&degc` //degree
        windTodayFour.innerHTML = `Wind - ${data.forecast.forecastday[3].day.maxwind_kph} kph`//wind
        humiTodayFour.innerHTML = `Humi - ${data.forecast.forecastday[3].day.avghumidity}%` //humidity

        // Updating 5th day forecasted weather data
        dateFive.innerHTML = data.forecast.forecastday[4].date// local date + 1 day
        imageWeatherFive.src = `https:${data.forecast.forecastday[4].day.condition.icon}` // icon to be displayed
        tempTodayFive.innerHTML = `Temp - ${Math.trunc(data.forecast.forecastday[4].day.avgtemp_c)}&degc` //degree
        windTodayFive.innerHTML = `Wind - ${data.forecast.forecastday[4].day.maxwind_kph} kph`//wind
        humiTodayFive.innerHTML = `Humi - ${data.forecast.forecastday[4].day.avghumidity}%` //humidity

        
    } catch (error) { // If everything doesn't turns out good this is what should be run
        // Handle fetch-related errors and timeouts
        if (error.name === "AbortError") {
            alert("Request timed out. Please try again.") // If abort error happens this means it's been more than 5s of searching, thus displaying this error
        } else if (error.message.startsWith("HTTP error!")) {
            alert(`No Such city as "${citie}", Enter Correct name of city `) // If incorrect city name entered, display this error
        } else {
            alert(`Network error: ${error.message}`) // If network issue or internet issue, display this error
        }
    }
}

// This function takes the value from searchbar and then save it for temporary as session storage is used.
function searchBox(){
    // Included regex to check if the inserted value is a string or not
    if (regex.test(searchBar.value) === false) {
        // if it is false, then alert the user this
        alert("City name should only contain alphabets and it can't be blank. eg: New york")
    } else {
        // if it is true,then save the value in the search bar and return the value
        divInSearchBar = document.createElement('div') // creating the necessary div
        Line = document.createElement('hr') // creating the hr line
        Line.classList.add("mb-3"); // adding the class 
        divInSearchBar.innerHTML = searchBar.value.charAt(0).toUpperCase() + searchBar.value.slice(1)
        suggestions.appendChild(divInSearchBar)
        suggestions.appendChild(Line)
        sessionStorage.setItem("saveIT", suggestions.innerHTML); // initializing the session storage so that searched value should get saved for a single session
        return searchBar.value // Most important return the searched city if it is a string
    }

}

//==================================================================================
// This function makes sure the value clicked on the searched cities list should update the weather data and feed the UI accordingly
async function valueFromSearchBar(e){
    cityFromSearchBar = e.target.innerText
    
    // create a condition to check if the 'Use current Location' is clicked then return the longitude and latitude
    if (cityFromSearchBar === 'Use current Location') {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            cityInLongLang = `${latitude}, ${longitude}`
            feedUI(cityInLongLang)
        });
    } else { 
        // If something else gets clicked then update the weather data and feed the UI accordingly
        feedUI(cityFromSearchBar)
    }
}

// Calling the above function as soon as the recently searched city tiles is clicked
suggestions.addEventListener('click', valueFromSearchBar)

//==================================================================================
// This function makes sure the value entered on the search bar should update the weather data and feed the UI accordingly as soon it is search button is clicked
async function search(){

    // creating a variable to store the value from returned from searchBox() function
    const names  = searchBox()
    // if names has some value then it'll get called other wise nothing will happen, to make sure 'undefined' doesn't get triggered
    if (names) {
        feedUI(names)
    }
}

// Calling the above function as soon as the search button is clicked
btn.addEventListener('click', search)

//=================================================================================
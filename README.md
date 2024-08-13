Welcome to project "THUNDER". A bit exaggeration but stay with me ;)

**click on the searchbar to see all the option included Use current location**

In this we are trying to make Weather forecast app, We are going to use HTML, CSS, Tailwind (for front-end part) and Javascript (for backend part)to make our website dynamic.

We are using "https://api.weatherapi.com/v1/forecast.json?key=c3d1cab6249d4373bc3131136240608&q=${city Name}&days=5" as our API. As it is free and legitimate. Only city name has to be inserted to pull all weather data related to the city

First i designed my UI for the weather app, You can see it in the Asset folder the initial design which ultimately had to change to fit the requirements and UI. I desgined the main container which contains everything. And the main container was divided into two parts right and left and as soon as the specific screen size is met they will be like it otherwise they will be stacking upon each other. and The right part contain three more part the searchbox, the recently searched box and the display the current data part. The recently searched city box is not visible until the search bar is focused upon this required brainstorming to do this because initially there was some error and i did not achived this stage. But ultimately i did this. 

And after this the second part which is initially (if on desktop) is on right is further divided into two more part upper part and lower, Lower part contains five days forecast of the same city with details like wind, humidity & precipitation. The upper part contains few more details such as wind, precipitation, humidity and degree. And is mobile first project and can be used on any device. 

**click on the searchbar to see all the option included Use current location**

And to understand logic part of this website you can go to into the asset folder and see the image.

Things it can do: 

    1) When you enter city name it'll return the mentioned datas 
    2) Don't enter number, leave it blank or any special charachter in the searchbar it'll throw error, Error number 1
    3) As soon as the city is entered it'll get saved in the recently search box, But it'be only for single session as soon as the session is closed the searched cities will get vanished.
    4) You can select your cities from recently searched box
    5) It can show weather of your current location Just go to searchbar --> Use current Location (It'll ask for permission)

Types of error it contains: 

     1) If the citynames is blank or there are numbers - alert("City name should only contain alphabets and it can't be blank. eg: New york")
     2) If the enterred city is not correct or invalid or wrong, this led to no data being pull - alert(`No Such city as "${citie}", Enter Correct name of city`)
     3) If pulling the data taking too much time (5s in this case) - alert("Request timed out. Please try again.")
     4) If there's is no internet or Base URL is broken - alert(`Network error: ${error.message}`)

Types of data it'll return

    1) City Name, region name, Country name
    2) Local Time and Date (bottom left corner)
    3) Temperature
    4) Type of weather icon
    5) Precipitaion, Humidity, wind speed~
    6) 5 days of forecast, it'll contain Temparature, Wind speed, Humidity and future Dates


If you want to use this project for your own purpose feel free to use, But remember to generate your own key from "https://api.weatherapi.com/". As mine is free to use so only current + 3 future dates data is there to use.

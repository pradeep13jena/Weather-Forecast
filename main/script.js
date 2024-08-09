const searchBar = document.querySelector('#search-bar');
const suggestions = document.querySelector('#suggestion-box');
const useLocation = document.getElementById('use-location');

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
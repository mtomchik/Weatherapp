
// Brings in the fetch and display classes
const fc = new FetchClass();
const display = new Display();

// Event handlers for capturing user input on submit button click
const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
button.addEventListener("click", () => {
  const current = search.value;
  search.value = '';
  fc.fetchWeather(current).then((data) => {
    display.displayData(data);
    localStorage.setItem("local", current)
  });
});

// Once document is parsed, gets data from local storage and displays it 
window.addEventListener("DOMContentLoaded", () => {
  const savedData = localStorage.getItem("local");
  display.displayData(savedData);
});

async function fetchWeather (input){
      // My Key for weather API
      const myKey = "975aa03a6a36a51b07662a5c36266148";
      
      // Fetches city lat and lon for the city the user inputs
      const geo = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${myKey}`);

      // Stores return in order to access lat and lon coordinates
      const coordinates = await geo.json();
      

      // Fetches 5 day forecast using city coordinates and returns data
      const forecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates[0].lat}&lon=${coordinates[0].lon}&appid=${myKey}&units=imperial`
      );
      
      // Stores data in const
      const data = await forecast.json();

      // Returns data
      return data;
    };
  

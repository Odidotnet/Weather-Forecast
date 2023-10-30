let answer = document.getElementById("answer");
let searchBtn = document.getElementById("search-btn");
let cityLocation = document.getElementById("city");

// Your API key should be defined before using it.
const apiKey = "f764d8e34c6ad5bf9b4a1c680326ac66";

// function to fetch the weather status  from the API and display them
let getWeather = () => {
  let cityTag = cityLocation.value;
  // if the city input is empty
  if (cityTag.length == 0) {
    answer.innerHTML = `<h3 class="error-message">Please enter City name</h3>`;
  }
  // else statement
  else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityTag}&appid=${apiKey}&units=metric`;
    cityLocation.value = "";
    fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.name);
        console.log(data.main.temp_min);
        console.log(data.main.temp_max);

        answer.innerHTML = `
                <h2>${data.name}</h2>
                <h4 class="weather">${data.weather[0].main}</h4>
                <h4 class="desc">${data.weather[0].description}</h4>
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                <h1>${data.main.temp} &#176;</h1> 
                <div class="temp-container">
                    <div>
                        <h4 class="title">min</h4>
                        <h4 class="temp">${data.main.temp_min}</h4>
                    </div>

                    <div>
                        <h4 class="title">max</h4>
                        <h4 class="temp">${data.main.temp_max}</h4>
                    </div>
                </div>
                `;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        answer.innerHTML = `<h3 class="error-message">City not found</h3>`;
      });
  }
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      getWeather();
    }
  }
};

// Use "click" instead of "CLick"
searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);

// searchBtn.removeEventListener("click", getWeather);

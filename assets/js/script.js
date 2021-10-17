// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});



























/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
// const form = document.querySelector(".top-banner form");
// const input = document.querySelector(".top-banner input");
// const msg = document.querySelector(".top-banner .msg");
// const list = document.querySelector(".ajax-section .cities");

// const apiKey = "4d8fb5b93d4af21d66a2948710284366";

// form.addEventListener("submit", e => {
//   e.preventDefault();
//   let inputVal = input.value;

//   //check if there's already a city
//   const listItems = list.querySelectorAll(".ajax-section .city");
//   const listItemsArray = Array.from(listItems);

//   if (listItemsArray.length > 0) {
//     const filteredArray = listItemsArray.filter(el => {
//       let content = "";
//       //athens,gr
//       if (inputVal.includes(",")) {
//         //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
//         if (inputVal.split(",")[1].length > 2) {
//           inputVal = inputVal.split(",")[0];
//           content = el
//             .querySelector(".city-name span")
//             .textContent.toLowerCase();
//         } else {
//           content = el.querySelector(".city-name").dataset.name.toLowerCase();
//         }
//       } else {
//         //athens
//         content = el.querySelector(".city-name span").textContent.toLowerCase();
//       }
//       return content == inputVal.toLowerCase();
//     });

//     if (filteredArray.length > 0) {
//       msg.textContent = `You already know the weather for ${
//         filteredArray[0].querySelector(".city-name span").textContent
//       } ...otherwise be more specific by providing the country code as well 😉`;
//       form.reset();
//       input.focus();
//       return;
//     }
//   }

//   //ajax here
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const { main, name, sys, weather } = data;
//       const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
//         weather[0]["icon"]
//       }.svg`;

//       const li = document.createElement("li");
//       li.classList.add("city");
//       const markup = `
//         <h2 class="city-name" data-name="${name},${sys.country}">
//           <span>${name}</span>
//           <sup>${sys.country}</sup>
//         </h2>
//         <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup></div>
//         <figure>
//           <img class="city-icon" src="${icon}" alt="${
//         weather[0]["description"]
//       }">
//           <figcaption>${weather[0]["description"]}</figcaption>
//         </figure>
//       `;
//       li.innerHTML = markup;
//       list.appendChild(li);
//     })
//     .catch(() => {
//       msg.textContent = "Please search for a valid city 😩";
//     });

//   msg.textContent = "";
//   form.reset();
//   input.focus();
// });
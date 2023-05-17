const main = document.getElementById("main");
const search = document.getElementById("search");
const form = document.getElementById("form");

const apiKey = "b602e3bc41a197f353ed8f4a0afa8e1c";

const url = (city) => {
 return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
};

async function getWeatherByLocation(city) {
  try {
    const resp = await fetch(url(city), {
      origin: "cros",
    });

    const respData = await resp.json();
    addWeatherToPage(respData);
  } catch (err) {
    console.log(err);
  }
}

function addWeatherToPage(data) {
  const temp = ktoc(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
    <h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
    ${temp}°C
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
    </h2>
    <small>${data.weather[0].main}</small>
    `;

  // reset
  main.innerHTML = "";
  main.appendChild(weather);
}

function ktoc(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value;

  if (city) {
    getWeatherByLocation(city);
  }
});

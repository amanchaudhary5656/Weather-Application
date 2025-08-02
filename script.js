async function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) return alert("Please enter a city");

  try {
    const apiKey = '30a2b7d88bb806d5318c3c95124940a6'; 
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }

    
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].main;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${data.wind.speed} km/h`;

    
    document.getElementById('hourlyForecast').innerHTML = `
      <div class="hour">1 PM<br/>${Math.round(data.main.temp + 1)}°</div>
      <div class="hour">2 PM<br/>${Math.round(data.main.temp + 2)}°</div>
      <div class="hour">3 PM<br/>${Math.round(data.main.temp + 1)}°</div>
    `;

    
    const uvIndex = Math.floor(Math.random() * 11); 
    const uvFill = document.getElementById('uvFill');
    const uvText = document.getElementById('uvText');
    uvFill.style.width = `${uvIndex * 10}%`;
    uvFill.style.background = uvIndex < 3 ? "green" : uvIndex < 6 ? "yellow" : "red";
    uvText.textContent = `UV Index: ${uvIndex}`;

  } catch (error) {
    alert("Failed to fetch weather data.");
    console.error(error);
  }
}

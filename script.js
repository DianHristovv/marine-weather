const waveHeightOutput=document.getElementById("wave-height")
const portSelect=document.getElementById("port-select")
const forecastList=document.getElementById("forecast-list")
const seaTemperatureOutput=document.getElementById("sea-temperature")
const windOutput=document.getElementById("wind")
const seaWarning=document.getElementById("sea-warning")
const compassPoints = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
                       "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
const ports = [
  { name: "Varna",   latitude: 43.19, longitude: 27.95 },
  { name: "Balchik", latitude: 43.39, longitude: 28.18 },
  { name: "Burgas",  latitude: 42.48, longitude: 27.52 },
  { name: "Sozopol", latitude: 42.43, longitude: 27.72 }
];


async function loadMarineData(port) {
    const marineUrl = "https://marine-api.open-meteo.com/v1/marine?latitude=" + port.latitude + "&longitude=" + port.longitude + "&current=wave_height,sea_surface_temperature";
const weatherUrl="https://api.open-meteo.com/v1/forecast?latitude=" +port.latitude+ "&longitude=" +port.longitude + "&current=wind_speed_10m,wind_direction_10m&wind_speed_unit=kn"
const forecastUrl="https://marine-api.open-meteo.com/v1/marine?latitude=" +port.latitude + "&longitude="+port.longitude+ "&hourly=wave_height&forecast_days=1&timezone=auto"
    try{const seaResponse=await fetch(marineUrl)
    const seaData=await seaResponse.json()
    const weatherResponse=await fetch(weatherUrl)
    const weatherData=await weatherResponse.json()
    const forecastResponse=await fetch(forecastUrl)
    const forecastData=await forecastResponse.json()
    const hours=forecastData.hourly.time.map(function (time,i){
return{
    time:time.slice(11),
    wave:forecastData.hourly.wave_height[i]
}

    })
    const roughHours=hours.filter(function (hour){
        return hour.wave>1})
        if (roughHours.length===0){
            seaWarning.className="calm"
           seaWarning.textContent="✅ Calm seas all day"
        }
        else{
            seaWarning.className="rough"
            const roughTimes=roughHours.map(function(hour){return hour.time }).join(", ")
            seaWarning.textContent="⚠️ Waves over 1 m at: " + roughTimes
          
        }

    
    console.log(roughHours)
    forecastList.innerHTML=""
    for (let i=0;i<hours.length;i+=3){
        const item=document.createElement("li")
        item.textContent=hours[i].time + " → " + hours[i].wave + " m"
        forecastList.appendChild(item)
    }
    


    const index=Math.round(weatherData.current.wind_direction_10m/22.5)%16
    const direction=compassPoints[index]
    waveHeightOutput.textContent = "Wave height: " + seaData.current.wave_height + " m";
    seaTemperatureOutput.textContent="Sea temperature: "+seaData.current.sea_surface_temperature+"°C"
    windOutput.textContent = "Wind: " + weatherData.current.wind_speed_10m + " kn from " + direction + " (" + weatherData.current.wind_direction_10m + "°)";
    }catch(error){
    waveHeightOutput.textContent="Could not load data"
    seaTemperatureOutput.textContent=""
    windOutput.textContent=""
    console.log(error)
}
}
   for (const port of ports){
        const item=document.createElement("option")
        item.textContent=port.name
        portSelect.appendChild(item)

        
    }
portSelect.addEventListener("change",function(){
    const chosenPort=ports[portSelect.selectedIndex]
    loadMarineData(chosenPort)
    
})

loadMarineData(ports[0])
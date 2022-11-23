const API_KEY ='e4f273e6c4c93188f9964501de66d735'


window.onload = function(){
    var startPos;

    var geoSuccess = function (positon) {
        startPos = positon;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${startPos.coords.latitude}&lon=${startPos.coords.longitude}&units=metric&appid=${API_KEY}`)

        .then((data)=> data.json())

        .then((jsonData)=>{
            fetch(`https://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`)
            .then((res)=>res.blob())
            .then((result)=>{
                document.getElementById("text_location").innerHTML=jsonData.name
                document.getElementById("text_location_country").innerHTML=jsonData.sys.country

                document.getElementById("text_temp").innerHTML=Math.round(jsonData.main.temp)
                document.getElementById("text_feelslike").innerHTML=Math.round(jsonData.main.feels_like)

                document.getElementById("text_desc").innerHTML=jsonData.weather[0].description

                const imageObjectURL = URL.createObjectURL(result);
                document.getElementById("icon").src= imageObjectURL
            })
        })
    };

    navigator.geolocation.getCurrentPosition(geoSuccess);
}
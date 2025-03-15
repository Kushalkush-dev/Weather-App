import { Apikey } from "./api.js";
const weatherform=document.querySelector(".weather-form");
const card=document.querySelector(".display-card");
const inputcity=document.querySelector(".city-input")
const apikey=Apikey





weatherform.addEventListener("submit", async event=>{

  event.preventDefault();
  const city=inputcity.value.trim()
  if(inputcity){
    try{
      const data=await getweatherinfo(city);
      weatherdate(data);

    }catch(error){
      console.log(error);
      errorMessages(error);

    }
      
  }else{
    errorMessages("Enter a City")
  }

  inputcity.value="";
})


async function getweatherinfo(city){
  
  const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
  if(!response.ok){
    throw new Error("unable to fetch data")
  }else{

    return response.json()
  }


}

function weatherdate(data){
  console.log(data);

  const {name:cityname, main:{temp,humidity},weather:[{id ,description}]}=data;

  const name =document.createElement("h1")
  const temperature =document.createElement("p")
  const weatherhumidity = document.createElement("p")
  const weatherdescription = document.createElement("p")
  const weatheremoji=document.createElement("p")
  
  name.textContent=cityname;
  temperature.textContent=`${(temp-273.15).toFixed(1)}°C`;
  weatherhumidity.textContent=`Humidity:${humidity}%`;
  weatherdescription.textContent=description.toUpperCase();
  weatheremoji.textContent=getweatheremoji(id);
  
  
  name.classList.add("city")
  temperature.classList.add("temp-display")
  weatherhumidity.classList.add("humidity")
  weatherdescription.classList.add("desc-weather") 
  weatheremoji.classList.add("Weather-emoji")


  card.textContent="";
  card.appendChild(name);
  card.appendChild(temperature);
  card.appendChild(weatherhumidity);
  card.appendChild(weatherdescription);
  card.appendChild(weatheremoji);









}

function getweatheremoji(weatherid){
  switch(true){
    case (weatherid>=200 && weatherid<300):
        return "⛈️";
    case (weatherid>=300 && weatherid<400):
        return "🌨️";
    case (weatherid>=400 && weatherid<500):
         return "🌧️";
    case (weatherid>=500 && weatherid<600):
          return "❄️";    
    case (weatherid>=600 && weatherid<700):
          return "🌥️";
     case (weatherid>=700 && weatherid<800):
          return "🌤️";
    case (weatherid==800 ):
          return "☀️";
    case (weatherid>800 ):
          return "☁️";
    default:
          return "❓";
  }


}


function errorMessages(message){

  card.textContent=" ";
  let errorelement=document.createElement("p")
  errorelement.textContent=message
  errorelement.classList.add("disp-error-msg")
  card.appendChild(errorelement);
  
  

}

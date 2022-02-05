var theCity = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?appid=c1ecab3291362f3fe61c8735f3bd9de6&q="+city ;
  
    
    fetch(apiUrl).then(function(response) {
     
      if (response.ok) {
        response.json().then(function(data) {
       data["city"]["coord"]["lat"]
       var lat = data["city"]["coord"]["lat"]
       var lon = data["city"]["coord"]["lon"]

        })
        };
      }
      
  



var oneCall = function(data) {

  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=c1ecab3291362f3fe61c8735f3bd9de6&q`

 fetch(apiUrl).then(function(response) {
     
    if (response.ok) {
      response.json().then(function(data) {
      
});
    
    
    
  weather("edina");
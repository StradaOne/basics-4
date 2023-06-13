const serverUrl = 'http://api.openweathermap.org/data/2.5';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'; 

export async function getRequest(location, endpoin){
   const url = `${serverUrl}/${endpoin}?q=${location}&appid=${apiKey}`;
   const request = await fetch(url);
   const data = await request.json();
   if (!request.ok){
      throw new Error(data.message)
   }
   
   console.log(data);
   return data;
}


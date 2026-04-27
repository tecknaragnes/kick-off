// Vi kanske kan ha allt smapi och api relaterat här
import  { renderActivities } from "./render.js"

const results = document.querySelector(".results");

let allActivities = []

 export async function fetchActivities () {

  const types = ["activity"];
  const descriptions = ["Bowlinghall", "Gokart", "Golfbana"];
  const provinces = ["Småland", "Öland"]
  const params = new URLSearchParams({
    controller: "establishment",
    method: "getall",
    api_key: window.APIKEY,
    types: types.join(","),
    descriptions: descriptions.join(","),
    //provinces: provinces.join(","),

  });

  const response = await fetch(`https://smapi.lnu.se/api/?${params}`);

  if (!response.ok) {
    throw new Error("Sökningen misslyckades");
  }

  return response.json();
}

//const data = await fetchActivities ()
//console.log(data)





// try {
//   const data = await fetchActivities ()
//   console.log(data.payload);
//   allActivities = data.payload;
//   renderActivities(allActivities)
//   console.log(data.payload[0])

// } catch(error) {
//   console.error(error);
//   results.innerHTML = `<p>${error.message}</p>`
// }

renderActivities (allActivities)
//Lowkey filter.js
import  { renderActivities } from "./render.js"
import { fetchActivities } from "./api.js";
console.log("Helloooo")
let allActivities = []

const results = document.querySelector(".results");
const search = document.querySelector(".search")
const provinceFilter = document.getElementById("provincefilter");
const priceFilter = document.getElementById("pricefilter");
const bowlingCheckbox = document.getElementById("Bowling");
const GokartCheckbox = document.getElementById("Gokart");
const GolfCheckbox = document.getElementById("Golf");
const searchBtn = document.querySelector(".search-btn")



// async function fetchActivities () {

//   const types = ["activity"];
//   const descriptions = ["Bowlinghall", "Gokart", "Golfbana"];
//   const provinces = ["Småland", "Öland"]
//   const params = new URLSearchParams({
//     controller: "establishment",
//     method: "getall",
//     api_key: window.APIKEY,
//     types: types.join(","),
//     descriptions: descriptions.join(","),
//     //provinces: provinces.join(","),

//   });

//   const response = await fetch(`https://smapi.lnu.se/api/?${params}`);

//   if (!response.ok) {
//     throw new Error("Sökningen misslyckades");
//   }

//   return response.json();
// }

// //const data = await fetchActivities ()
// //console.log(data)





try {
  const data = await fetchActivities ()
  console.log(data.payload);
  allActivities = data.payload;
  renderActivities(allActivities)
  console.log(data.payload[0])

} catch(error) {
  console.error(error);
  results.innerHTML = `<p>${error.message}</p>`
}


provinceFilter.addEventListener("change", ()=> {
  const value = provinceFilter.value;

  if (value === "Alla") {
    renderActivities(allActivities);
  } else {
    const filtered = allActivities.filter(a => a.province === value);
    renderActivities(filtered)
  }
});

//lite hårkodat, fattig filter, funkar lite konstigt också
priceFilter.addEventListener("change", ()=> {

  const value = priceFilter.value;

  if(value === "Alla") {
    renderActivities(allActivities)
  } else {
    const filtered = allActivities.filter(a => a.price_range === value);
    renderActivities(filtered)
  }

})


function filterByCheckboxes() {
  const selectedDescriptions = [];

  if (bowlingCheckbox.checked) {
    selectedDescriptions.push("Bowlinghall");
  }

  if (GokartCheckbox.checked) {
    selectedDescriptions.push("Gokart");
  }

  if (GolfCheckbox.checked) {
    selectedDescriptions.push("Golfbana")
  }

  const filtered = allActivities.filter(activity => selectedDescriptions.includes(activity.description))

  renderActivities(filtered)
}
bowlingCheckbox.addEventListener("change", () => {
  filterByCheckboxes();
});

GokartCheckbox.addEventListener("change", () => {
  filterByCheckboxes();
});

GolfCheckbox.addEventListener("change", () => {
  filterByCheckboxes();
});


//sök för name, description och city endast, får fylla på resten

function applyFilters () {
  const searchText = search.value.trim().toLowerCase();

  if(searchText === "") {      
    renderActivities(allActivities);
    return;
    }

    const filteredActivities = allActivities.filter((activity) => {
      const name = (activity.name ?? "").toLowerCase();
      const description = (activity.description ?? "").toLowerCase();
      const city = (activity.city ?? "").toLowerCase();

      const matchesSearch = 
      name.includes(searchText) ||
      description.includes(searchText) ||
      city.includes(searchText);

      return matchesSearch;
    });

    renderActivities(filteredActivities);

    
  }

  search.addEventListener("input", applyFilters);
  searchBtn.addEventListener("click", applyFilters);
  
  


//search.addEventListener("search", (e) => {
  
//})

renderActivities (allActivities)


//pris och rating sortera efter det
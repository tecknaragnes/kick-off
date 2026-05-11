import { renderActivities } from "./render.js";
import { fetchActivities } from "./api.js";

console.log("Helloooo");

let allActivities = [];

const results = document.querySelector(".results");
const search = document.querySelector(".search");
const provinceFilter = document.getElementById("provincefilter");
const priceFilter = document.getElementById("pricefilter");
const bowlingCheckbox = document.getElementById("Bowling");
const GokartCheckbox = document.getElementById("Gokart");
const GolfCheckbox = document.getElementById("Golf");
const searchBtn = document.querySelector(".search-btn");
const sortFilter = document.getElementById("sortfilter");
const outdoorFilter = document.getElementById("outdoorfilter");



async function filterFromSmapi() {
  try {
    const data = await fetchActivities({
      sort: sortFilter.value,
      outdoors: outdoorFilter.value
    });

    console.log(data.payload);

    allActivities = data.payload ?? [];

    console.log("Första aktiviteten:", allActivities[0]);

    filterActivities();

  } catch (error) {
    console.error(error);
    results.innerHTML = `<p>${error.message}</p>`;
  }
  
}


function filterActivities() {

  let filtered = allActivities;

  const provinceValue = provinceFilter.value;
  if (provinceValue !== "Alla") {
    filtered = filtered.filter((activity) => {
      return activity.province === provinceValue;
    });
  }

  const priceValue = priceFilter.value;
  if (priceValue !== "Alla") {
    filtered = filtered.filter((activity) => {
      return activity.price_range === priceValue;
    });
  }

   const selectedDescriptions = [];

  if (bowlingCheckbox.checked) {
    selectedDescriptions.push("Bowlinghall");
  }

  if (GokartCheckbox.checked) {
    selectedDescriptions.push("Gokart");
  }

  if (GolfCheckbox.checked) {
    selectedDescriptions.push("Golfbana");
  }

  if (selectedDescriptions.length > 0) {
    filtered = filtered.filter((activity) => {
      return selectedDescriptions.includes(activity.description);
    });
  }

  const searchText =search.value.trim().toLowerCase();

   if (searchText !== "") {
    filtered = filtered.filter((activity) => {
      const name = (activity.name ?? "").toLowerCase();
      const description = (activity.description ?? "").toLowerCase();
      const city = (activity.city ?? "").toLowerCase();

      return (
        name.includes(searchText) ||
        description.includes(searchText) ||
        city.includes(searchText)
      );
    });
  }

  renderActivities(filtered);

  
 
}

export function listenerEvents () {
provinceFilter.addEventListener("change", filterActivities);
priceFilter.addEventListener("change", filterActivities);
bowlingCheckbox.addEventListener("change", filterActivities);
GokartCheckbox.addEventListener("change", filterActivities);
GolfCheckbox.addEventListener("change", filterActivities);
search.addEventListener("input", filterActivities);

searchBtn.addEventListener("click", (e)=> {
  e.preventDefault();
  filterActivities();
})


sortFilter.addEventListener("change", () => {
  filterFromSmapi();
});

outdoorFilter.addEventListener("change", () => {
  filterFromSmapi();
});


}



listenerEvents()
filterFromSmapi();

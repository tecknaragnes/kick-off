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
const entertainmentparkCheckbox = document.getElementById("Nöjespark");
const themeparkCheckbox = document.getElementById("Temapark");
const ziplineCheckbox = document.getElementById("Zipline");
const entertainmentcenterCheckbox = document.getElementById("Nöjescenter");
const paintballCheckbox = document.getElementById("Paintball");
const healthCheckbox = document.getElementById("Hälso");
const cinemaCheckbox = document.getElementById("Biograf");

const activityContainer = document.getElementById("selectActivity");
const searchBtn = document.querySelector(".search-btn");
const sortFilter = document.getElementById("sortfilter");
const outdoorFilter = document.getElementById("outdoorfilter");



export async function filterFromSmapi() {
  try {
    const data = await fetchActivities({
      sort: sortFilter.value,
      outdoors: outdoorFilter.value,
      descriptions: getSelectedDescriptions(),
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
//läser value på checkboxen från html
function getSelectedDescriptions() {
  const checkboxes = document.querySelectorAll(`input[name="aktiviteter"]`);
  const selectedDescriptions = [];

  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      selectedDescriptions.push(checkbox.value);
    }
  }

  return selectedDescriptions;
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
const selectedDescriptions = getSelectedDescriptions();

  //  const selectedDescriptions = [];

  // if (bowlingCheckbox.checked) {
  //   selectedDescriptions.push("Bowlinghall");
  // }

  // if (GokartCheckbox.checked) {
  //   selectedDescriptions.push("Gokart");
  // }

  // if (GolfCheckbox.checked) {
  //   selectedDescriptions.push("Golfbana");
  // }

  // // if (entertainmentparkCheckbox.checked) {
  // //   selectedDescriptions.push("Nöjescenter");
  // // }

  // if (themeparkCheckbox.checked) {
  //   selectedDescriptions.push("Temapark");
  // }

  // if (ziplineCheckbox.checked) {
  //   selectedDescriptions.push("Zipline");
  // }

  // if (entertainmentcenterCheckbox.checked) {
  //   selectedDescriptions.push("Nöjescenter");
  // }

  // if (paintballCheckbox.checked) {
  //   selectedDescriptions.push("Paintballcenter");
  // }

  // if (healthCheckbox.checked) {
  //   selectedDescriptions.push("Hälsocenter");
  // }

  // if (cinemaCheckbox.checked) {
  //   selectedDescriptions.push("Biograf");
  // }

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

bowlingCheckbox.addEventListener("change", filterFromSmapi);
GokartCheckbox.addEventListener("change", filterFromSmapi);
GolfCheckbox.addEventListener("change", filterFromSmapi);
entertainmentparkCheckbox.addEventListener("change", filterFromSmapi);
themeparkCheckbox.addEventListener("change", filterFromSmapi);
ziplineCheckbox.addEventListener("change", filterFromSmapi);
entertainmentcenterCheckbox.addEventListener("change", filterFromSmapi);
paintballCheckbox.addEventListener("change", filterFromSmapi);
healthCheckbox.addEventListener("change", filterFromSmapi);
cinemaCheckbox.addEventListener("change", filterFromSmapi);


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



// listenerEvents()
// filterFromSmapi();

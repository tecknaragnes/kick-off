import { renderActivities } from "./render.js";
import { fetchActivities } from "./api.js";

let allActivities = [];

const results = document.querySelector(".results");
const search = document.querySelector(".search");
const cityFilter = document.getElementById("cityFilter");
const priceFilter = document.getElementById("max-price");
const priceSpan = document.getElementById("price-span");
const priceArray = ["50", "100", "250", "500", "1000", "2000", "5000"];

const bowlingCheckbox = document.getElementById("Bowling");
const GokartCheckbox = document.getElementById("Gokart");
const GolfCheckbox = document.getElementById("Golf");
const entertainmentparkCheckbox = document.getElementById("Nöjespark");
const themeparkCheckbox = document.getElementById("Temapark");
const ziplineCheckbox = document.getElementById("Zipline");
const entertainmentcenterCheckbox = document.getElementById("Nöjescenter");
const paintballCheckbox = document.getElementById("Paintballcenter");
const healthCheckbox = document.getElementById("Hälsocenter");
const cinemaCheckbox = document.getElementById("Biograf");

const searchBtn = document.querySelector(".search-btn");
const sortFilter = document.getElementById("sortfilter");
const outdoorFilter = document.getElementById("outdoorfilter");

const physicalFilter = document.getElementById("physical");
const physicalSpan = document.getElementById("physical-span");
const timeFilter = document.getElementById("time");
const timeSpan = document.getElementById("time-span");
const timeArray = ["Snabbis", "Halvdag", "Heldag"]; //snabbis??? vad ska man skriva?
const distanceFilter = document.getElementById("distance");
const distanceSpan = document.getElementById("distance-span");


const allowedDescriptions = [
  "Bowlinghall",
  "Gokart",
  "Golfbana",
  "Nöjespark",
  "Temapark",
  "Zipline",
  "Nöjescenter",
  "Paintballcenter",
  "Hälsocenter",
  "Biograf"
];


export async function filterFromSmapi() { // för controller establishment
  try {
    const data = await fetchActivities({
      sort: sortFilter.value,
      outdoors: outdoorFilter.value,
      descriptions: getDescriptionsForSmapi(),
    });

    console.log(data.payload);
    allActivities = data.payload ?? [];
    filterActivities();

  } catch (error) {
    console.error(error);
    results.innerHTML = `<p>${error.message}</p>`;
  }
}

export async function filterFromSmapiConAct() {
  // För controller activity
  try {
    const data = await fetchActivitiesConAct({
      physical_effort: physicalFilter.value,
      estimated_duration: timeFilter.value,
      // disability_support: ,
    }); // hur sätter man in den? 

    console.log(data.payload);
    allActivities = data.payload ?? [];
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


//kollar om checkbox är vald, om inte skicka alloweddesc som är array listan
function getDescriptionsForSmapi() {
  const selectedDescriptions = getSelectedDescriptions();

  if (selectedDescriptions.length > 0) {
    return selectedDescriptions;
  } else {
    return allowedDescriptions;
  }

}


function filterActivities() {

  let filtered = allActivities;

  // const provinceValue = provinceFilter.value;
  // if (provinceValue !== "Alla") {
  //   filtered = filtered.filter((activity) => {
  //     return activity.province === provinceValue;
  //   });
  // }

  // const maxPriceValue = priceFilter.value;
  // if (maxPriceValue !== "Alla") {
  //   filtered = filtered.filter((activity) => {
  //     return activity.price_range === priceValue;
  //   });
  // }
  // const selectedDescriptions = getSelectedDescriptions();

  //  const selectedDescriptions = [];

  // if (selectedDescriptions.length > 0) {
  //   filtered = filtered.filter((activity) => {
  //     return selectedDescriptions.includes(activity.description);
  //   });
  // }

  const searchText = search.value.trim().toLowerCase();

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



export function listenerEvents() {
  cityFilter.addEventListener("change", () => {
    console.log(cityFilter.value);
    // filterFromSmapi()
  });

  priceFilter.addEventListener("change", () => { //sortera pris och ändra text bredvid slidern
    console.log(priceFilter.value);
    let priceIndex = priceFilter.value;
    priceSpan.textContent = `>=${priceArray[priceIndex]} kr/pers`; //hur ska man skriva detta kort och tydligt?
    // filterFromSmapi(); //sorterar inte på riktigt än
  });

  physicalFilter.addEventListener("change", () => { // sortera physisk ansträngning och ändra bild bredvid slidern
    console.log(physicalFilter.value);
    let physicalIndex = physicalFilter.value;
    physicalSpan.innerHTML = "";
    for (let i = 0; i < physicalIndex; i++) {
      physicalSpan.innerHTML += `<img src="../SVG/physical.svg" alt="nivå ${i + 1}">`;
    }
    // filterFromSmapi(); //sorterar inte på riktigt än
  });

  timeFilter.addEventListener("change", () => { // sortera tidsåtgång och ändra text/symbol bredvid slidern
    console.log(timeFilter.value);
    let timeIndex = timeFilter.value;
    timeSpan.textContent = `${timeArray[timeIndex]}`;
    // filterFromSmapi(); //sorterar inte på riktigt än
  });

  distanceFilter.addEventListener("change", () => { // sortera avstånd och ändra text bredvid slidern
    console.log(distanceFilter.value);
    let distanceIndex = distanceFilter.value;
    distanceSpan.textContent = `<=${distanceIndex} km`;
    // filterFromSmapi(); //sorterar inte på riktigt än
  });

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

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    filterActivities();
  })

  sortFilter.addEventListener("change", () => {
    filterFromSmapi();
  });

  outdoorFilter.addEventListener("change", () => {
    filterFromSmapi();
  });
};
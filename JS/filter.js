import { renderActivities } from "./render.js";
import { fetchActivities } from "./api.js";

let allActivities = [];

const results = document.querySelector(".results");
const search = document.querySelector(".search");
// const provinceFilter = document.getElementById("provincefilter");
const priceFilter = document.getElementById("max-price");

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
const timeFilter = document.getElementById("time");
const timeArray = ["Kort", "Timmar", "Heldag"];

// I spökhuset har jag för scareIndex "let index;" på toppnivå
// sen "let scareIndex = index ?? 0;" i filter-funktionen som lyssnarna kallar på
// och "scareSlider.addEventListener("input", () => {
//     index = Number(scareSlider.value) - 1;
//     scareValue.textContent = scareArray[index];
//     filterResult();
// });" i funktionen med alla lyssnare
// Går detta att använda sig av i pris, tid, och fysisk-filterna??


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


export async function filterFromSmapi() {
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
  // provinceFilter.addEventListener("change", filterActivities);
  priceFilter.addEventListener("change", filterActivities);
  physicalFilter.addEventListener("change", () => {
    index
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
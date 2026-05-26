import { renderActivities } from "./render.js";
import { fetchActivities, fetchActivitiesConAct } from "./api.js";

let allActivities = [];
let userLatitude = null;
let userLongitude = null;

const results = document.querySelector(".results");
const search = document.querySelector(".search");
const cityFilter = document.getElementById("cityFilter");
const priceFilter = document.getElementById("max-price");
const priceSpan = document.getElementById("price-span");
const priceArray = ["100", "250", "500", "1000", "2000", "5000"];

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
const accesabilityFilter = document.getElementById("accesability");


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

    const filters = {
      sort: sortFilter.value,
      outdoors: outdoorFilter.value,
      cities: cityFilter.value,
      price_ranges: priceFilter.value,
      descriptions: getDescriptionsForSmapi(),
      lat: userLatitude,
      lng: userLongitude,
      radius: distanceFilter.value,
    };

    const data = await fetchActivities(filters);

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
    const activityFilters = {
      physical_effort: physicalFilter.value,
      estimated_duration: timeFilter.value,
      disability_support: accesabilityFilter.checked,
      descriptions: getDescriptionsForSmapi()
    };
    //hämtar activitydatan som matchar obj ovanför, hitta rätt id
    const activityData = await fetchActivitiesConAct(activityFilters)
    // tom array för att spara id
    const activityIds = [];
    //loppa payloaden från smapi
    for (const activity of activityData.payload ?? []) {
      activityIds.push(activity.id)
    }

    // om activity sökningen inte gav några ids, visa inget
    if (activityIds.length === 0) {
      allActivities = [];
      renderActivities([]);
      return;
    }
    //nu använder vi idn för att hämta kortdat från est
    const establishmentFilters = {
      sort: sortFilter.value,
      outdoors: outdoorFilter.value,
      cities: cityFilter.value,
      price_ranges: priceFilter.value,
      descriptions: getDescriptionsForSmapi(),
      lat: userLatitude,
      lng: userLongitude,
      radius: distanceFilter.value,
      ids: activityIds,
    };

    // Vi hämtar establishment-data för de id:n vi fick från activity-sökningen
    const establishmentData = await fetchActivities(establishmentFilters);
    //Spara establishment payloaden i allActivities, denna data som renderactivities visar
    allActivities = establishmentData.payload ?? [];

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

//en funktion som frågar webbläsaren efter användarens position
function getUserLocation() {
  navigator.geolocation.getCurrentPosition(saveUserLocation, showLocationError);
}

function saveUserLocation(position) {

  //vi sparar användarens lat och long i vår globala variablar
  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;

  console.log("Användarens latitud:", userLatitude);
  console.log("Användarens longitud:", userLongitude);

  filterFromSmapi();
}

//körs endast om användaren nekar plats eller om webbläsaren inte kan hämta position
function showLocationError(error) {
  console.log("kunde inte hämta plats", error.message);
}

function filterActivities() {

  let filtered = allActivities;

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
    filterFromSmapi();
  });

  priceFilter.addEventListener("input", () => { //sortera pris och ändra text bredvid slidern
    let priceIndex = priceFilter.value;
    priceSpan.textContent = `${priceArray[priceIndex]} kr/pers`; //hur ska man skriva detta kort och tydligt?
    filterFromSmapi(); //sorterar inte på riktigt än
  });

  physicalFilter.addEventListener("input", () => { // sortera physisk ansträngning och ändra bild bredvid slidern
    let physicalIndex = physicalFilter.value;
    physicalSpan.innerHTML = "";
    for (let i = 0; i < physicalIndex; i++) {
      physicalSpan.innerHTML += `<img src="../SVG/physical.svg" alt="nivå ${i + 1}">`;
    }
    filterFromSmapiConAct(); //sorterar inte på riktigt än
  });

  timeFilter.addEventListener("input", () => { // sortera tidsåtgång och ändra text/symbol bredvid slidern
    let timeIndex = timeFilter.value;
    timeSpan.textContent = `${timeArray[timeIndex]}`;
    filterFromSmapiConAct(); //sorterar inte på riktigt än
  });

  distanceFilter.addEventListener("input", () => {
    const distanceIndex = distanceFilter.value;
    //om användaren inte filtrerat på avstånd och slidern står på max/auto läge
    if (distanceIndex === distanceFilter.max) {
      distanceSpan.textContent = "Alla avstånd";
      // Då är positionen null, så api.js använder getall istället för getfromlatlng.
      userLatitude = null;
      userLongitude = null;
      //hämta aktiviteter igen, eftersom position är null använder vi getall
      filterFromSmapi();

      return;
    }
    //om användaren har valt mindre än max så visar vi valt km
    distanceSpan.textContent = `${distanceIndex} km`;
    // om vi inte har användarens plats fråga först
    if (userLatitude === null || userLongitude === null) {
      getUserLocation();
    } else {//hämta aktiviteter igen, eftersom position inte är null använder vi getfrpmlatlng
      filterFromSmapi();
    }
  });

  accesabilityFilter.addEventListener("change", () => { // sortera tillgänglighet
    filterFromSmapiConAct(); //sorterar inte på riktigt än
  });

  bowlingCheckbox.addEventListener("change", filterFromSmapi);
  GokartCheckbox.addEventListener("change", filterFromSmapi);
  GolfCheckbox.addEventListener("change", filterFromSmapi);
  entertainmentparkCheckbox.addEventListener("change", filterFromSmapi);
  themeparkCheckbox.addEventListener("change", filterFromSmapi);
  ziplineCheckbox.addEventListener("change", filterFromSmapi);
  entertainmentcenterCheckbox.addEventListener("change", filterFromSmapi);
  paintballCheckbox.addEventListener("change", filterFromSmapi);
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



// justera filter för de specifika evenemangen
const stagnightBtn = document.getElementById("stag");
const awBtn = document.getElementById("aw");
const teamBtn = document.getElementById("team");
export const eventFiltering = () => { //denna funkar inte riktigt, hände inget när jag trycker på knappen
  if (stagnightBtn.classList.contains("on")) { // Om svensexa är på
    priceFilter.value = "6";

    physicalFilter.value = "3";
    physicalSpan.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      physicalSpan.innerHTML += `<img src="../SVG/physical.svg" alt="nivå ${i + 1}">`;
    }

    timeFilter.value = "2";
    timeSpan.textContent = `${timeArray[2]}`;

    distanceFilter.value = "100";

    outdoorFilter.value = "Alla";

    bowlingCheckbox.checked = false;
    GokartCheckbox.checked = true;
    GolfCheckbox.checked = false;
    entertainmentparkCheckbox.checked = true;
    themeparkCheckbox.checked = true;
    ziplineCheckbox.checked = true;
    entertainmentcenterCheckbox.checked = true;
    paintballCheckbox.checked = true;
    cinemaCheckbox.checked = false;

    filterFromSmapi(); // så att det faktiskt filtreras
  }

  else if (awBtn.classList.contains("on")) { //Om AW är tänd
    priceFilter.value = "3";

    physicalFilter.value = "2";
    physicalSpan.innerHTML = "";
    for (let i = 0; i < 2; i++) {
      physicalSpan.innerHTML += `<img src="../SVG/physical.svg" alt="nivå ${i + 1}">`;
    }

    timeFilter.value = "1";
    timeSpan.textContent = `${timeArray[1]}`;

    distanceFilter.value = "3";

    outdoorFilter.value = "N";

    bowlingCheckbox.checked = true;
    GokartCheckbox.checked = true;
    GolfCheckbox.checked = false;
    entertainmentparkCheckbox.checked = false;
    themeparkCheckbox.checked = false;
    ziplineCheckbox.checked = false;
    entertainmentcenterCheckbox.checked = true;
    paintballCheckbox.checked = false;
    cinemaCheckbox.checked = true;

    filterFromSmapi(); // så att det faktiskt filtreras
  }

  else if (teamBtn.classList.contains("on")) { //Om AW är tänd
    priceFilter.value = "6";

    physicalFilter.value = "3";
    physicalSpan.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      physicalSpan.innerHTML += `<img src="../SVG/physical.svg" alt="nivå ${i + 1}">`;
    }

    timeFilter.value = "2";
    timeSpan.textContent = `${timeArray[2]}`;

    distanceFilter.value = "6";

    outdoorFilter.value = "Alla";

    bowlingCheckbox.checked = false;
    GokartCheckbox.checked = true;
    GolfCheckbox.checked = true;
    entertainmentparkCheckbox.checked = true;
    themeparkCheckbox.checked = true;
    ziplineCheckbox.checked = true;
    entertainmentcenterCheckbox.checked = true;
    paintballCheckbox.checked = true;
    cinemaCheckbox.checked = false;

    filterFromSmapi(); // så att det faktiskt filtreras
  }

  else { //Om ingen är tänd
    priceFilter.value = "10";

    physicalFilter.value = "3";
    physicalSpan.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      physicalSpan.innerHTML += `<img src="../SVG/physical.svg" alt="nivå ${i + 1}">`;
    }

    timeFilter.value = "0";
    timeSpan.textContent = `${timeArray[0]}`;

    distanceFilter.value = "10";

    outdoorFilter.value = "Alla";

    bowlingCheckbox.checked = false;
    GokartCheckbox.checked = false;
    GolfCheckbox.checked = false;
    entertainmentparkCheckbox.checked = false;
    themeparkCheckbox.checked = false;
    ziplineCheckbox.checked = false;
    entertainmentcenterCheckbox.checked = false;
    paintballCheckbox.checked = false;
    healthCheckbox.checked = false;
    cinemaCheckbox.checked = false;

    filterFromSmapi(); // så att det faktiskt filtreras
  }
}
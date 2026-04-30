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

try {
  const data = await fetchActivities({
    sort: sortFilter.value,
    outdoors: outdoorFilter.value
  });

  console.log(data.payload);
  allActivities = data.payload;
  renderActivities(allActivities);
  console.log(data.payload[0]);
} catch (error) {
  console.error(error);
  results.innerHTML = `<p>${error.message}</p>`;
}

provinceFilter.addEventListener("change", () => {
  const value = provinceFilter.value;

  if (value === "Alla") {
    renderActivities(allActivities);
  } else {
    const filtered = allActivities.filter((a) => a.province === value);
    renderActivities(filtered);
  }
});

priceFilter.addEventListener("change", () => {
  const value = priceFilter.value;

  if (value === "Alla") {
    renderActivities(allActivities);
  } else {
    const filtered = allActivities.filter((a) => a.price_range === value);
    renderActivities(filtered);
  }
});

function filterByCheckboxes() {
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

  const filtered = allActivities.filter((activity) =>
    selectedDescriptions.includes(activity.description)
  );

  renderActivities(filtered);
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

function applyFilters() {
  const searchText = search.value.trim().toLowerCase();

  if (searchText === "") {
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

async function filterFromSmapi() {
  const data = await fetchActivities({
    sort: sortFilter.value,
    outdoors: outdoorFilter.value
  });

  allActivities = data.payload;
  renderActivities(allActivities);
}

sortFilter.addEventListener("change", () => {
  filterFromSmapi();
});

outdoorFilter.addEventListener("change", () => {
  filterFromSmapi();
});

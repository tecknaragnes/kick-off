import { fetchActivities } from "./api.js";
import { getImageForActivity } from "./pixabay.js";


///Visa rekommenderade aktiviteter på startsidan (mest poppis)
/// återanvända renderActivoties eller skapa en ny för bara main, 
//återanvända api.js hämtning

//let allActivities = [];


const popularActivities = document.getElementById("popular-activities")

const allowedDescriptions2 = [
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

async function loadPopularActivities() {
    const data = await fetchActivities({
        sort: "rating-high",
        descriptions: allowedDescriptions2,
    })

    console.log(data.payload)

    const activities = data.payload ?? [];
    const popularList= activities.slice(0,5);
    renderPopActivities (popularList)

    console.log(popularList)




}

loadPopularActivities();

function renderPopActivities (popularList) {
    popularActivities.innerHTML = "";

  for (const activity of popularList) {
    popularActivities.innerHTML += `
      <div class="activity-card">
        <div class="act-flex-card">
          <div class="act-img"></div>

          <div class="act-flex-info">
            <h3>${activity.name}</h3>
            <p>(${activity.description})</p>
            <p>
              <img src="SVG/location.svg" alt="">
              ${activity.city}, ${activity.province}
            </p>
            <p>${activity.price_range} kr</p>
            <p>Betyg: ${activity.rating}</p>
          </div>
        </div>

        <div class="act-symbols">
          <a href="HTML/details.html?id=${activity.id}">Läs mer</a>
        </div>
      </div>
    `;
  }

}

//renderPopActivities()
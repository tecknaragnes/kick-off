import { fetchActivities } from "./api.js";

///Visa rekommenderade aktiviteter på startsidan (mest poppis)
/// återanvända renderActivoties eller skapa en ny för bara main, 
//återanvända api.js hämtning

const popularActivities = document.getElementById("popular-activities")

async function loadPopularActivities () {
    const data = await fetchActivities ({
        sort: rating-Highlight,
        descriptions: [
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

        ]
    })
}
//Details.js, för detaljsidan ska oxå importeras länka med htmlen, mycket importer
import { renderDetailsPage, renderReviews } from "./render.js";

const urlParams = new URLSearchParams(window.location.search);
const activityId = urlParams.get("id");





async function loadActivityDetails() {

    try {
    const params = new URLSearchParams({
        controller: "establishment",
        method: "getall",
        api_key: window.APIKEY,
        types: "activity",
        ids: activityId,
    });

    const response = await fetch(`https://smapi.lnu.se/api/?${params}`);
    if (!response.ok) {
        throw new Error ("kkunde inte hitta/hämta aktivitet");
        }

        const data = await response.json();

        const activities = data.payload;

        const selectedActivity = activities.find ((a) => {
            return a.id ===activityId;

    });

    renderDetailsPage(selectedActivity);

    const reviewParams = new URLSearchParams ({
        controller: "establishment", 
        method:"getreviews",
        api_key: window.APIKEY,
        id: activityId,
    });

    const reviewResponse = await fetch(`https://smapi.lnu.se/api/?${reviewParams}`);

    if (!reviewResponse.ok) {
        throw new Error  ("Kunde inte hämta recensioner");
    }

    const reviewData = await reviewResponse.json();
    renderReviews(reviewData.payload)


    

     const map = L.map("map").setView([selectedActivity.lat, selectedActivity.lng], 13);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    } catch (error) {
        console.error(error);

    }


}

loadActivityDetails()


// renderReviews(info);

//Details.js, för detaljsidan ska oxå importeras länka med htmlen, mycket importer
import { renderDetailsPage, renderReviews } from "./render.js";
import { getImageForActivity } from "./pixabay.js";
import { fetchFood } from "./api.js";


const urlParams = new URLSearchParams(window.location.search);
const activityId = urlParams.get("id");
let foodmax = 0;

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
            throw new Error("Kunde inte hitta/hämta aktivitet");
        }

        const data = await response.json();

        const activities = data.payload ?? [];

        const selectedActivity = activities.find((a) => {
            return a.id === activityId;
        });

        if (!selectedActivity) {
            console.log("Ingen aktivitet hittades")
            return;
        }

        const conActParams = new URLSearchParams({
            controller: "activity",
            method: "getall",
            api_key: window.APIKEY,
            ids: activityId,
        });

        const conActResponse = await fetch(`https://smapi.lnu.se/api/?${conActParams}`);
        if (!conActResponse.ok) {
            throw new Error("Kunde inte hitta/hämta aktivitet");
        }
        const conActData = await conActResponse.json();
        const conActivities = conActData.payload[0] ?? [];

        renderDetailsPage(selectedActivity, conActivities);
        await loadReviews();

        const lat = selectedActivity.lat;
        const lng = selectedActivity.lng;
        const foodData = await fetchFood(lat, lng);
        const foodSect = document.getElementById("food-section")
        console.log(foodData.payload)

        const map = L.map("map").setView([selectedActivity.lat, selectedActivity.lng], 13);

        const foodMarker = L.icon({
            iconUrl: "../SVG/food.svg",
            iconSize: [26, 26]
        });

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`
        }).addTo(map);

        L.marker([lat, lng])
            .addTo(map)
            .bindPopup(selectedActivity.name);

        foodSect.innerHTML = "<h3>Matförslag:</h3>";
        if (!foodData) {
            console.log("Inga matförslag hittades")
        }
        else {
            for (let food of foodData.payload) {
                if (foodmax < 3) {
                    let foodCard = document.createElement("div");
                    let foodText = document.createElement("p");
                    let foodIcon = document.createElement("img");
                    console.log(food.alcohol_licence);
                    foodIcon.src = "../SVG/food.svg";
                    foodCard.append(foodIcon);
                    if (food.alcohol_licence == "Y") {
                        let drinkIcon = document.createElement("img");
                        drinkIcon.src = "../SVG/drink.svg";
                        foodCard.append(drinkIcon);
                        drinkIcon.classList.add("foodIcon");
                    }
                    foodCard.append(foodText);
                    foodSect.append(foodCard);
                    foodText.textContent = food.name + " | " + food.distance_in_km.toFixed(2) + " Km från " + selectedActivity.name;
                    foodCard.classList.add("foodCard");
                    foodIcon.classList.add("foodIcon");
                    console.log(foodmax);
                    foodmax += 1;
                }
                L.marker([food.lat, food.lng], { icon: foodMarker })
                    .addTo(map)
                    .bindPopup(food.name + " | " + food.distance_in_km.toFixed(2) + " Km från " + selectedActivity.name);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

loadActivityDetails();



async function loadReviews() {

    const reviewParams = new URLSearchParams({
        controller: "establishment",
        method: "getreviews",
        api_key: window.APIKEY,
        id: activityId,
    });

    const reviewResponse = await fetch(`https://smapi.lnu.se/api/?${reviewParams}`);

    if (!reviewResponse.ok) {
        throw new Error("Kunde inte hämta recensioner");
    }

    const reviewData = await reviewResponse.json();

    const reviews = reviewData.payload ?? [];
    renderReviews(reviews)
}
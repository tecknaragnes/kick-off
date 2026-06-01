//Details.js, för detaljsidan ska oxå importeras länka med htmlen, mycket importer
import { renderDetailsPage, renderReviews } from "./render.js";
import { getImageForActivity } from "./pixabay.js";
import { fetchActivities, fetchFood } from "./api.js";
import { listenToFavoriteClick } from "./favorite.js";

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

        await renderDetailsPage(selectedActivity, conActivities);
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
    renderSimilar()
}

async function renderSimilar() {
    const allowedDescriptions = {
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
    };

    const idData = await fetchActivities(allowedDescriptions);
    const allIds = idData.payload;

    const similarIds = []
    let similarActivities = [];

    for (let i = 1; i < 5; i++) {
        similarIds.push(Number(activityId) + i);
    }
    for (let i = 1; i < 5; i++) {
        similarIds.push(Number(activityId) - i);
    }

    for (let activity of allIds) {
        if (similarIds.includes(Number(activity.id))) {
            similarActivities.push(activity);
        }
    }
    console.log(similarActivities.length);
    if (similarActivities.length > 4) {
        let currentActivity = allIds.find(({ id }) => id === activityId);
        similarActivities = similarActivities.filter((activity) => activity.description === currentActivity.description)
        similarActivities.splice(0, 3);
    }
    console.log(similarActivities.length);
    renderSimilarActivities(similarActivities);
}

async function renderSimilarActivities(SimilarList) {
    const results = document.querySelector(".results");
    results.innerHTML = "";

    for (const activity of SimilarList) {

        const activityCard = document.createElement("a");
        activityCard.classList.add("activity-card");
        activityCard.href = `../HTML/details.html?id=${activity.id}`;

        const imageUrl = await getImageForActivity(activity, false);
        let rating = Number.parseFloat(activity.rating).toFixed(1);


        activityCard.innerHTML = `
            <div class="act-flex-card">
                <img class="act-img" src="${imageUrl}" alt="">

                <div class="act-flex-info">
                    <h3>${activity.name}</h3>
                    <p>(${activity.description})</p>
                    <p>
                    <img src="../SVG/location-alt.svg" alt="">
                    ${activity.city}, ${activity.province}
                    </p>
                </div>
                <button class="favorite-btn"><img src="../SVG/empty-save.svg" alt="Spara aktivitet"></button>
            </div>
            <div class="act-symbols">
                <div class="icon act-card"></div>
                <a href="../HTML/details.html?id=${activity.id}">Läs mer</a>
            </div>
        `;

        results.append(activityCard);

        const favoriteButton = activityCard.querySelector(".favorite-btn");
        listenToFavoriteClick(favoriteButton, activity);

        for (let i = 0; i < Math.floor(rating); i++) {
            const starIcon = document.createElement("img");
            starIcon.src = "../SVG/star.svg";
            starIcon.alt = "";
            activityCard.querySelector(".icon.act-card").append(starIcon);
        }
        // Om det finns en decimal del i rating, lägg till en halv stjärna
        if (rating - Math.floor(rating) >= 0.5) {
            const halfStarIcon = document.createElement("img");
            halfStarIcon.src = "../SVG/half-star.svg";
            halfStarIcon.alt = "";
            activityCard.querySelector(".icon.act-card").append(halfStarIcon);
        }
        // Lägg till tomma stjärnor för att fylla upp till 5 stjärnor
        if (rating < 5) {
            for (let i = 0; i < 5 - Math.ceil(rating); i++) {
                const emptyStarIcon = document.createElement("img");
                emptyStarIcon.src = "../SVG/empty-star.svg";
                emptyStarIcon.alt = "";
                activityCard.querySelector(".icon.act-card").append(emptyStarIcon);
            }
        }
    }
}
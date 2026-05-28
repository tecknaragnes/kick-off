//spelet här, här hade nog klass passat, ksk 3 olika val som spel och if användaren klickar ex inomhus eller afterwork så kan man === med hjälper av activity.filter retur bowlinghall eller liknande

const quiz = document.getElementById("quiz");

import { getImageForActivity } from "./pixabay.js";
import { listenToFavoriteClick } from "./favorite.js";
import { fetchActivities, fetchActivitiesConAct } from "./api.js";

const results = document.querySelector(".results");
const randomBtn = document.getElementById("random");

const dayBtn = document.getElementById("daysbox");
const hourBtn = document.getElementById("hoursbox");
const minBtn = document.getElementById("minsbox");

quiz.addEventListener("submit", async function (event) {
    event.preventDefault();
    const answer1 = document.querySelector(`input[name="fråga 1"]:checked`);
    if (!answer1) {
        console.log("error");
        return;
    }

    const answer3 = document.querySelector(`input[name="fråga 3"]:checked`);
    if (!answer3) {
        console.log("error");
        return;
    }

    const answer4 = document.querySelector(`input[name="fråga 4"]:checked`);
    if (!answer4) {
        console.log("error");
        return;
    }


    let answers = [answer1.value, answer3.value, answer4.value];

    let filters = {
        outdoors: "",
        descriptions: [],
        estimated_duration: "",
        physical_effort: ""
    };

    if (answers[0] == 1) {
        filters.physical_effort = "1";
    }
    if (answers[0] == 2) {
        filters.physical_effort = "2";
    }
    if (answers[0] == 3) {
        filters.physical_effort = "3";
    }
    if (answers[0] == 4 || answers[0] == 5) {
        filters.physical_effort = "4";
    }

    if (dayBtn.checked) {
        filters.estimated_duration = "2";
    }
    if (hourBtn.checked) {
        filters.estimated_duration = "3";
    }
    if (minBtn.checked) {
        filters.estimated_duration = "4";
    }

    if (answers[2] == 1) {
        filters.descriptions = ["Gokart", "Nöjespark", "Temapark", "Zipline", "Nöjescenter", "Paintballcenter"];
    }
    if (answers[2] == 2) {
        filters.descriptions = ["Bowlinghall", "Gokart", "Nöjescenter", "Biograf"];
    }
    if (answers[2] == 3) {
        filters.descriptions = ["Gokart", "Golfbana", "Nöjespark", "Temapark", "Zipline", "Nöjescenter", "Paintballcenter"];
    }

    if (answers[3] == 1) {
        filters.outdoors = "Y";
    }
    if (answers[3] == 3) {
        filters.outdoors = "N"
    }

    const data = await fetchActivitiesConAct(filters);
    const splicedData = data.payload.slice(0, 4);

    renderResults(splicedData);
});

async function renderResults(activities) {
    if (!results) return;

    results.innerHTML = "<h2>Resultat</h2>";

    if (!activities || activities.length === 0) {
        results.innerHTML = "<h2>Resultat</h2><p>Inga aktiviteter hittades</p>";
        return;
    }

    for (const activity of activities) {
        const activityCard = document.createElement("a");
        activityCard.classList.add("activity-card");
        activityCard.href = `details.html?id=${activity.id}`;

        let rating = Number.parseFloat(activity.rating).toFixed(1);

        let estimate = "";
        if (activity.estimated_duration == "DAYS") {
            estimate = `
            <img src="../SVG/clock.svg" alt="">
            <img src="../SVG/clock.svg" alt="">
            <img src="../SVG/clock.svg" alt="">
            `
        }
        else if (activity.estimated_duration == "HOURS") {
            estimate = `
            <img src="../SVG/clock.svg" alt="">
            <img src="../SVG/clock.svg" alt="">
            `
        }
        else {
            estimate = `
            <img src="../SVG/clock.svg" alt="">            `
        }
        let physical = "";
        if (activity.physical_effort == "HIGH") {
            physical = `
            <img src="../SVG/physical.svg" alt="">
            <img src="../SVG/physical.svg" alt="">
            <img src="../SVG/physical.svg" alt="">
            `
        }
        else if (activity.physical_effort == "MEDIUM") {
            physical = `
            <img src="../SVG/physical.svg" alt="">
            <img src="../SVG/physical.svg" alt="">
            `
        }
        else {
            physical = `
            <img src="../SVG/physical.svg" alt="">            `
        }
        const imageUrl = await getImageForActivity(activity);

        if (activity.description === "Hälsocenter") {
            activity.description = "Nöjescenter";
        }

        activityCard.innerHTML = `
                <div class="act-flex-card">
                    <img class="act-img" src="${imageUrl}" alt="">
                    <div class="act-flex-info">
                        <h3>${activity.name}</h3><p>(${activity.description})</p>
                    </div>
                    <button class="favorite-btn"><img src="../SVG/empty-save.svg" alt="Spara aktivitet"></button>
                </div>
                <div class="act-symbols">
                    <div>${physical}</div>
                    <div>${estimate}</div>
                    <div class="icon act-card"></div>
                    <a href="details.html?id=${activity.id}">Läs mer</a>
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
        if (rating - Math.floor(rating) > 0.1) {
            const halfStarIcon = document.createElement("img");
            halfStarIcon.src = "../SVG/half-star.svg";
            halfStarIcon.alt = "";
            activityCard.querySelector(".icon.act-card").append(halfStarIcon);
        }
        // Lägg till tomma stjärnor för att fylla upp till 5 stjärnor
        if (rating <= 4.1) { //vissa som har fel antal stjärnor???
            for (let i = 0; i < 5 - Math.ceil(rating); i++) {
                const emptyStarIcon = document.createElement("img");
                emptyStarIcon.src = "../SVG/empty-star.svg";
                emptyStarIcon.alt = "";
                activityCard.querySelector(".icon.act-card").append(emptyStarIcon);
            }
        }
    }
}

const allowedDescriptions = {descriptions: [
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
]};

const idData = await fetchActivities(allowedDescriptions);
const allIds = idData.payload;

randomBtn.addEventListener("click", function () {
    let rng = Math.floor(Math.random() * allIds.length)
    let randomId = allIds[rng].id
    window.location.href = `details.html?id=${randomId}`;
});

// const navToggle = document.querySelector("nav ul #nav-toggle");

// const showHideNav = () => {
//     const navUl = document.querySelector("nav ul");
//     const liToggle = document.querySelectorAll("nav li.toggle-li");

//     if (navUl.classList.contains("hidden")) {
//         navUl.classList.replace("hidden", "visible");
//         liToggle.forEach(li => li.style.display = "list-item");
//     } else {
//         navUl.classList.replace("visible", "hidden");
//         liToggle.forEach(li => li.style.display = "none");
//     }
// }

// navToggle.addEventListener("click", () => {
//     showHideNav();
// })
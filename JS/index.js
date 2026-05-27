import { fetchActivities } from "./api.js";
import { getImageForActivity } from "./pixabay.js";
import { listenToFavoriteClick } from "./favorite.js";

///Visa rekommenderade aktiviteter på startsidan (mest poppis)
/// återanvända renderActivoties eller skapa en ny för bara main, 
//återanvända api.js hämtning

const popularActivities = document.getElementById("popular-activities");

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

//Hämta populära aktiviteter från SMAPI, samma som på filter.js
async function loadPopularActivities() {
    popularActivities.innerHTML = "<div class='skeleton-loader'></div>";
    //api.js gör om detta till order by rating, high i detta fall, desc blir vår array ovanför
    const data = await fetchActivities({
        sort: "rating-high",
        descriptions: allowedDescriptions2,
    });
    const activities = data.payload ?? [];
    const popularList = activities.slice(0, 5);//vi tar de 5 högst rankade endast
    await renderPopActivities(popularList); //skickar topp 5 in i renderfunktionen

    console.log(popularList);
}

loadPopularActivities();


//renderar aktivitetskorten på startsdian, återanvänt 99% från renderActivities
async function renderPopActivities(popularList) {
    popularActivities.innerHTML = "";

    for (const activity of popularList) {

        const activityCard = document.createElement("a");
        activityCard.classList.add("activity-card");
        activityCard.href = `HTML/details.html?id=${activity.id}`;

        const imageUrl = await getImageForActivity(activity);
        let rating = Number.parseFloat(activity.rating).toFixed(1);


        activityCard.innerHTML = `
            <div class="act-flex-card">
                <img class="act-img" src="${imageUrl}" alt="">

                <div class="act-flex-info">
                    <h3>${activity.name}</h3>
                    <p>(${activity.description})</p>
                    <p>
                    <img src="SVG/location-alt.svg" alt="">
                    ${activity.city}, ${activity.province}
                    </p>
                </div>
                <button class="favorite-btn"><img src="../SVG/empty-save.svg" alt="Spara aktivitet"></button>
            </div>
            <div class="act-symbols">
                <div>pris</div>
                <div class="icon act-card"></div>
                <a href="HTML/details.html?id=${activity.id}">Läs mer</a>
            </div>
        `;

        popularActivities.append(activityCard);

        const favoriteButton = activityCard.querySelector(".favorite-btn");
        listenToFavoriteClick(favoriteButton, activity);

        for (let i = 0; i < Math.floor(rating); i++) {
            const starIcon = document.createElement("img");
            starIcon.src = "SVG/star.svg";
            starIcon.alt = "";
            activityCard.querySelector(".icon.act-card").append(starIcon);
        }
        // Om det finns en decimal del i rating, lägg till en halv stjärna
        if (rating - Math.floor(rating) >= 0.5) {
            const halfStarIcon = document.createElement("img");
            halfStarIcon.src = "SVG/half-star.svg";
            halfStarIcon.alt = "";
            activityCard.querySelector(".icon.act-card").append(halfStarIcon);
        }
        // Lägg till tomma stjärnor för att fylla upp till 5 stjärnor
        if (rating < 5) {
            for (let i = 0; i < 5 - Math.ceil(rating); i++) {
                const emptyStarIcon = document.createElement("img");
                emptyStarIcon.src = "SVG/empty-star.svg";
                emptyStarIcon.alt = "";
                activityCard.querySelector(".icon.act-card").append(emptyStarIcon);
            }
        }
    }
}

// const navToggle = document.querySelector("nav ul #nav-toggle");

// const showHideNav = () => {
//     const navUl = document.querySelector("nav ul");
//     const liToggle = document.querySelectorAll("nav li.li-hidden");

//     if (navUl.classList.contains("hidden")) {
//         console.log("nav gömd, ska visa");
//         navUl.classList.replace("hidden", "visible");
//         liToggle.forEach(li => li.classList.replace("li-hidden", "li-visible"));
//     } else {
//         console.log("nav synlig, ska gömma");
//         navUl.classList.replace("visible", "hidden");
//         liToggle.forEach(li => li.classList.replace("li-visible", "li-hidden"));
//     }
// }

// navToggle.addEventListener("click", () => {
//     showHideNav();
// })
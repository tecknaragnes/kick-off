//endast rendering här, här kan vi nog använda klass
import { listenToFavoriteClick } from "./favorite.js"
import { getImageForActivity } from "./pixabay.js";


// aktivitetskort ----------------------------------
const results = document.querySelector(".results");

export async function renderActivities(activities, conActivities) {
    if (!results) return;

    results.innerHTML = "";

    if (!activities || activities.length === 0) {
        results.innerHTML = "<p>Inga aktiviteter hittades</p>";
        return;
    }

    let actNmb = 0;
    let physRender = "";
    let timeRender = "";

    for (const activity of activities) {
        const activityCard = document.createElement("a");
        activityCard.classList.add("activity-card");
        activityCard.href = `details.html?id=${activity.id}`;

        let rating = Number.parseFloat(activity.rating).toFixed(1);

        const imageUrl = await getImageForActivity(activity);

        if (activity.description === "Hälsocenter") {
            activity.description = "Nöjescenter";
        }

        if (conActivities[actNmb].physical_effort == "HIGH") {
            physRender = `
            <img src="../SVG/physical.svg" alt="">
            <img src="../SVG/physical.svg" alt="">
            <img src="../SVG/physical.svg" alt="">
            `
        }
        else if (conActivities[actNmb].physical_effort == "MEDIUM") {
            physRender = `
            <img src="../SVG/physical.svg" alt="">
            <img src="../SVG/physical.svg" alt="">
            `
        }
        else {
            physRender = `
            <img src="../SVG/physical.svg" alt="">
            `
        }

        if (conActivities[actNmb].estimated_duration == "DAYS") {
            timeRender = `
            <img src="../SVG/clock.svg" alt="">
            <img src="../SVG/clock.svg" alt="">
            <img src="../SVG/clock.svg" alt="">
            `
        }
        else if (conActivities[actNmb].estimated_duration == "HOURS") {
            timeRender = `
            <img src="../SVG/clock.svg" alt="">
            <img src="../SVG/clock.svg" alt="">
            `
        }
        else {
            timeRender = `
            <img src="../SVG/clock.svg" alt="">
            `
        }

        activityCard.innerHTML = `
                <div class="act-flex-card">
                    <img class="act-img" src="${imageUrl}" alt="">
                    <div class="act-flex-info">
                        <h3>${activity.name}</h3><p>(${activity.description})</p>
                        <p><img src="../SVG/location-alt.svg" alt="">${activity.city}, ${activity.province}</p>
                        <p>${activity.price_range ?? "Pris saknas"} kr</p>
                    </div>
                    <button class="favorite-btn"><img src="../SVG/empty-save.svg" alt="Spara aktivitet"></button>
                </div>
                <div class="act-symbols">
                    <div>${physRender ?? "Fysisk data saknas"}</div>
                    <div>${timeRender ?? " Tidsestimering saknas"}</div>
                    <div class="icon act-card"></div>
                    <a href="details.html?id=${activity.id}">Läs mer</a>
                </div>
        `;
        results.append(activityCard);
        actNmb += 1;
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


// detaljsidan ----------------------------------
export const renderDetailsPage = async (activity, conActivity) => {
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    const h2 = document.createElement("h2");

    h2.textContent = activity.name;
    header.append(h2);

    let estimate = "";
    if (conActivity.estimated_duration == "DAYS") {
        estimate = "En dag";
    }
    else if (conActivity.estimated_duration == "HOURS") {
        estimate = "Timmar";
    }
    else {
        estimate = "En snabbis";
    }

    let physical = "";
    if (conActivity.physical_effort == "HIGH") {
        physical = "Hög";
    }
    else if (conActivity.physical_effort == "MEDIUM") {
        physical = "Mellan";
    }
    else {
        physical = "Låg";
    }

    let wheelchair = "";
    if (conActivity.disability_support == "Y") {
        wheelchair = "Ja";
    }
    else {
        wheelchair = "Nej";
    }

    const imageUrl = await getImageForActivity(activity);

    main.innerHTML = "";

    let rating = Number.parseFloat(activity.rating).toFixed(1);

    main.innerHTML = `
        <div class="details-grid-right">
            <p>${activity.city}, ${activity.province}</p>
            <p>${activity.text}</p>
            <p>${activity.abstract}</p>
            <div class="details-flex-symbols">
                <button class="favorite-btn"><img src="../SVG/empty-save.svg" alt="Spara aktivitet"></button>
                <span id="icon-rating">
                    <p>Betyg: ${rating}</p>
                </span>
                <span id="icon-price">
                    <p>${activity.price_range} Kr</p>
                </span>
                </span>
                <span id="icon-time">
                    <img src="../SVG/clock.svg" alt="Tid">
                    <p>${estimate}</p>
                </span>
                <span id="icon-physical">
                    <img src="../SVG/physical.svg" alt="Fysisk utmaning">
                    <p>${physical}</p>
                </span>
                </span>
                <span id="icon-accesability">
                    <img src="../SVG/wheelchair.svg" alt="Tillgänglighet">
                    <p>${wheelchair}</p>
                </span>
            </div>
            <img class="det-img" src="${imageUrl}" alt="">
            <section id="contact-section">
                <h3>Kontakt:</h3>
                <p class="li-icon phone"><img src="../SVG/phone.svg" alt="">Telefon: ${activity.phone_number ?? "saknas"}</p>
                <p class="li-icon web"><img src="../SVG/globe.svg" alt="">Webbplats: <a href="${activity.website ?? "saknas"}">${activity.website}</a></p>
                <p class="li-icon adress"><img src="../SVG/location.svg" alt="">Adress: ${activity.address ?? "saknas"}, ${activity.zip_code} ${activity.city}</p>
            </section>
        </div>
        <div class="details-grid-left">
            <div id="map"></div>
            <section id="food-section">
                <h3>Matförslag:</h3>
            </section>
            <section id="review-section">
                <h3>Recensioner:</h3>
            </section>
            <section id="activities-section">
                <h3></h3>
            </section>
        </div>
    `;

    const favoriteButton = main.querySelector(".favorite-btn");
    listenToFavoriteClick(favoriteButton, activity);

    // Lägg till tomma stjärnor för att fylla upp till 5 stjärnor
    if (rating < 5) {
        for (let i = 0; i < 5 - Math.ceil(rating); i++) {
            const emptyStarIcon = document.createElement("img");
            emptyStarIcon.src = "../SVG/empty-star.svg";
            emptyStarIcon.alt = "";
            main.querySelector("#icon-rating").prepend(emptyStarIcon);
        }
    }
    // Om det finns en decimal del i rating, lägg till en halv stjärna
    if (rating - Math.floor(rating) >= 0.5) {
        const halfStarIcon = document.createElement("img");
        halfStarIcon.src = "../SVG/half-star.svg";
        halfStarIcon.alt = "";
        main.querySelector("#icon-rating").prepend(halfStarIcon);
    }
    // lägga till hela stjärnor
    for (let i = 0; i < Math.floor(rating); i++) {
        const starIcon = document.createElement("img");
        starIcon.src = "../SVG/star.svg";
        starIcon.alt = "";
        main.querySelector("#icon-rating").prepend(starIcon);
    } // de är i "fel" ordning för att det ska bli rätt med prepend
}

// recensioner ----------------------------------
export const renderReviews = (reviews) => {
    const reviewSection = document.querySelector("#review-section");

    if (!reviews || reviews.length === 0) {
        reviewSection.innerHTML += "<p>Inga recensioner hittades</p>";
    } else {
        for (const review of reviews) {
            let rating = Number.parseFloat(review.rating).toFixed(1);
            const reviewCard = document.createElement("div");
            reviewCard.classList.add("review-card");
            reviewCard.innerHTML = `
            <div class="rev-flex-header">
                <h4>${review.name}</h4>
                <div class="rev-rating"></div>
            </div>
            <p>${review.comment}</p>
            <p>${review.timestamp}</p>
            `;
            reviewSection.append(reviewCard);

            for (let i = 0; i < Math.floor(rating); i++) {
                const starIcon = document.createElement("img");
                starIcon.src = "../SVG/star.svg";
                starIcon.alt = "";
                reviewCard.querySelector(".rev-rating").append(starIcon);
            }
            // Om det finns en decimal del i rating, lägg till en halv stjärna
            if (rating - Math.floor(rating) >= 0.5) {
                const halfStarIcon = document.createElement("img");
                halfStarIcon.src = "../SVG/half-star.svg";
                halfStarIcon.alt = "";
                reviewCard.querySelector(".rev-rating").append(halfStarIcon);
            }
            // Lägg till tomma stjärnor för att fylla upp till 5 stjärnor
            if (rating < 5) {
                for (let i = 0; i < 5 - Math.ceil(rating); i++) {
                    const emptyStarIcon = document.createElement("img");
                    emptyStarIcon.src = "../SVG/empty-star.svg";
                    emptyStarIcon.alt = "";
                    reviewCard.querySelector(".rev-rating").append(emptyStarIcon);
                }
            }
        }
    }
}
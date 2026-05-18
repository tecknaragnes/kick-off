//endast rendering här, här kan vi nog använda klass
import { listenToFavoriteClick } from "./favorite.js"
import { getImageForActivity } from "./pixabay.js";

// aktivitetskort ----------------------------------
const results = document.querySelector(".results");

export async function renderActivities(activities) {
    if (!results) return;

    results.innerHTML = "";

    if (!activities || activities.length === 0) {
        results.innerHTML = "<p>inget hittat</p>";
        return;
    }

    for (const activity of activities) {
        const activityCard = document.createElement("div");
        activityCard.classList.add("activity-card");

        let rating = Number.parseFloat(activity.rating).toFixed(1);

        const imageUrl = await getImageForActivity(activity);

        activityCard.innerHTML = `
                <div class="act-flex-card">
                    <img class="act-img" src="${imageUrl}" alt="">
                    <div class="act-flex-info">
                        <h3>${activity.name}</h3><p>(${activity.description})</p>
                        <p><img src="../SVG/location.svg" alt="">${activity.city}, ${activity.province}</p>
                        <p>${activity.price_range ?? "Pris saknas"} kr</p>
                    </div>
                    <button class="favorite-btn">Spara favorit</button>
                </div>
                <div class="act-symbols">
                    <div>pris</div>
                    <div>tid</div>
                    <div>antal pers</div>
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


// detaljsidan ----------------------------------
export const renderDetailsPage = (activity) => {
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    const h2 = document.createElement("h2");

    h2.textContent = activity.name;
    header.append(h2);

    main.innerHTML = "";
    const detailsPage = document.createElement("div");
    detailsPage.classList.add("details-page");

    let rating = Number.parseFloat(activity.rating).toFixed(1);

    detailsPage.innerHTML = `
        <p>${activity.city}, ${activity.province}</p>
        <p>${activity.text}</p>
        <p>${activity.abstract}</p>
        <div class="details-flex-symbols">
            <span id="icon-rating"><p>Betyg: ${rating}</p></span>
            <span id="icon-price"><p>${activity.price_range}</p></span>
            <span id="icon-time"><p>tid</p></span>
            <span id="icon-ppl"><p>antal pers</p></span>
            <span id="icon-food"><img src="../SVG/food.svg" alt="Mat finns"><p>Mat</p></span>
            <span id="icon-drink"><img src="../SVG/drink.svg" alt="Dryck finns"><p>Dryck</p></span>
        </div>
        <div class="det-img"></div>
        <section id="contact-section">
            <h3>Kontakt:</h3>
            <p class="li-icon phone"><img src="../SVG/phone.svg" alt="">Telefon: ${activity.phone_number ?? "saknas"}</p>
            <p class="li-icon email">Email: (finns inte i smapi)</p>
            <p class="li-icon web">Webbplats: <a href="${activity.website ?? "saknas"}">${activity.website}</a></p>
            <p>Öppettider: (finns inga i smapi)</p>
            <p class="li-icon adress"><img src="../SVG/location.svg" alt="">Adress: ${activity.address ?? "saknas"}, ${activity.zip_code} ${activity.city}</p>
            <a href="booking">Boka nu</a>
        </section>
        <div id="map"></div>
        <section id="food-section">
            <h3>Matförslag:</h3>
        </section>
        <section id="review-section">
            <h3>Recensioner:</h3>
        </section>
        <section id="activities-section">
            <h3>Aktivitetsförslag:</h3>
        </section>
    `;
    main.append(detailsPage);

    for (let i = 0; i < Math.floor(rating); i++) {
        const starIcon = document.createElement("img");
        starIcon.src = "../SVG/star.svg";
        starIcon.alt = "";
        detailsPage.querySelector("#icon-rating").append(starIcon);
    }
    // Om det finns en decimal del i rating, lägg till en halv stjärna
    if (rating - Math.floor(rating) >= 0.5) {
        const halfStarIcon = document.createElement("img");
        halfStarIcon.src = "../SVG/half-star.svg";
        halfStarIcon.alt = "";
        detailsPage.querySelector("#icon-rating").append(halfStarIcon);
    }
    // Lägg till tomma stjärnor för att fylla upp till 5 stjärnor
    if (rating < 5) {
        for (let i = 0; i < 5 - Math.ceil(rating); i++) {
            const emptyStarIcon = document.createElement("img");
            emptyStarIcon.src = "../SVG/empty-star.svg";
            emptyStarIcon.alt = "";
            detailsPage.querySelector("#icon-rating").append(emptyStarIcon);
        }
    }
}

// recensioner ----------------------------------
export const renderReviews = (reviews) => {
    const reviewSection = document.querySelector("#review-section");

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
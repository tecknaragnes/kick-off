//endast rendering här, här kan vi nog använda klass

const results = document.querySelector(".results");

export function renderActivities(activities) {
    if (!results) return;

    results.innerHTML = "";

    if (!activities || activities.length === 0) {
        results.innerHTML = "<p>inget hittat</p>";
        return;
    }

    for (const activity of activities) {
        const article = document.createElement("article");

        article.innerHTML = `
            <div class="activity-card">
                <div class="act-flex-card">
                    <div class="act-img">i</div>
                    <div class="act-flex-info">
                        <h3>${activity.name}</h3><p>(${activity.description})</p>
                        <p>${activity.city}, ${activity.province}</p>
                        <p>${activity.price_range ?? "Pris saknas"} kr</p>
                    </div>
                </div>
                <div class="act-symbols">
                    <p>pris</p>
                    <p>tid</p>
                    <p>antal pers</p>
                    <p>rating</p>
                    <a href="details.html?id=${activity.id}">Läs mer</a>
                </div>
            </div>
        `;
        results.append(article);
    }
}


export const renderDetailsPage = (activity) => {
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    const h2 = document.createElement("h2");

    h2.textContent = activity.name;
    header.append(h2);

    main.innerHTML = "";
    const detailsPage = document.createElement("div");
    detailsPage.classList.add("details-page");
    detailsPage.innerHTML = `
        <p>${activity.city}, ${activity.province}</p>
        <div class="details-flex-symbols">
            <span id="icon-rating"><p>${activity.rating}</p></span>
            <span id="icon-price"><p>${activity.price_range}</p></span>
            <span id="icon-time"><p>tid</p></span>
            <span id="icon-ppl"><p>antal pers</p></span>
            <span id="icon-food"><img src="SVG/food.svg" alt="Mat finns"><p>Mat</p></span>
            <span id="icon-drink"><img src="SVG/drink.svg" alt="Dryck finns"><p>Dryck</p></span>
        </div>
        <p>${activity.text}</p>
        <p>${activity.abstract}</p>
        <div class="det-img">i</div>
        <p>Öppettider: (finns inga i smapi)</p>
        <section id="contact-section">
            <h3>Kontakt:</h3>
            <ul>
                <li class="li-icon phone">Telefon: ${activity.phone_number ?? "saknas"}</li>
                <li class="li-icon email">Email: (finns inte i smapi)</li>
                <li class="li-icon web">Webbplats: <a href="${activity.website ?? "saknas"}">${activity.website}</a></li>
                <li class="li-icon adress">Adress: ${activity.address ?? "saknas"}, ${activity.zip_code} ${activity.city}</li>
            </ul>
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
}


export const renderReviews = (reviews) => {
    const reviewSection = document.querySelector("#review-section");

    for (const review of reviews) {
        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");
        reviewCard.innerHTML = `
            <div class="rev-flex-header">
                <h4>${review.name}</h4>
                <span>${review.rating}</span>
            </div>
            <p>${review.comment}</p>
            <p>${review.timestamp}</p>
        `;
        reviewSection.append(reviewCard);
    }


    // for (let star of rating) {
    //     const starIcon = document.createElement("img");
    //     starIcon.src = "SVG/star.svg";
    //     starIcon.alt = "stjärna";
    //     reviewCard.querySelector(".rev-flex-header span").append(starIcon);
    // }
}
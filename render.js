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

    header.innerHTML = `<h2>${activity.name}</h2>`;

    main.innerHTML = "";
    const detailsPage = document.createElement("div");
    detailsPage.innerHTML = `
        <p>${activity.city}, ${activity.province}</p>
        <div class="details-flex-symbols">
            <span>betyg</span>
            <span>pris</span>
            <span>tid</span>
            <span>antal pers</span>
            <span>mat/dryck</span>
        </div>
        <p>${activity.text}</p>
        <div class="det-img">i</div>
        <p>Öppettider: (finns inga i smapi)</p>
        <section>
            <h3>Kontakt:</h3>
            <ul>
                <li>Telefon: ${activity.phone_number ?? "saknas"}</li>
                <li>Email: (finns inte i smapi)</li>
                <li>Webbplats: ${activity.website ?? "saknas"}</li>
                <li>Adress: ${activity.address ?? "saknas"}, ${activity.zip_code} ${activity.city}</li>
            </ul>
            <a href="booking">Boka nu<a/>
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
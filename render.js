//endast rendering här, här kan vi nog använda klass
// import { fetchActivities } from "./api.js"
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
                    <a href="details.html?id=">Läs mer</a>
                </div>
            </div>
        `;
        results.append(article);
    }


}

//fetchActivities ()

//endast rendering här, här kan vi nog använda klass
// import { fetchActivities } from "./api.js"
const results = document.querySelector(".results");

export function renderActivities (activities) {
    if (!results) return;
    
    results.innerHTML = "";

    if (!activities || activities.length === 0) {
        results.innerHTML = "<p>inget hittat</p>";
    return;
    }

    for (const activity of activities) {
        const article = document.createElement("article");

        article.innerHTML = `
         <h2>${activity.name}</h2>
      <p>${activity.description}</p>
      <p>${activity.province}</p>

      <p>${activity.city}</p>
      <p>${activity.price_range ?? "Pris saknas"}</p>
      <p>${activity.address ?? "Adress saknas"}</p>
        
        `
        results.append(article)
    }


}

//fetchActivities ()
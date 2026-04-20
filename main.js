console.log("Helloooo")

const results = document.getElementById("results");

async function searchActivities () {
  const params = new URLSearchParams({
    controller: "establishment",
    method: "getall",
    api_key: "2rJ8Mq3V",
    types: "activity",
    descriptions: "Bowlinghall",
    provinces: "Småland"
  });

  const response = await fetch(`https://smapi.lnu.se/api/?${params}`);

  if (!response.ok) {
    throw new Error("Sökningen misslyckades");
  }

  return response.json();
}

const data = await searchActivities ()
console.log(data)



function showResult (activities) {
    //results.innerHTML = ""
    if (activities.length === 0) {
            results.innerHTML ="<p>inget hittat</p>"
            return
    } 

    for (const activity of activities) {
        const article = document.createElement("article");

        article.innerHTML = `
         <h2>${activity.name}</h2>
      <p>${activity.description}</p>
      <p>${activity.city}</p>
      <p>${activity.price_range ?? "Pris saknas"}</p>
      <p>${activity.address ?? "Adress saknas"}</p>
        
        `
        results.append(article)
    }


}

showResult(data.payload)

console.log(data.payload[0])


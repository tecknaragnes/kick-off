console.log("Helloooo")
let activities = []

const results = document.getElementById("results");
const provinceFilter = document.getElementById("provincefilter")
const priceFilter = document.getElementById("pricefilter")

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

//const data = await searchActivities ()
//console.log(data)



function showResult (activities) {
    results.innerHTML = ""
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



try {
  const data = await searchActivities ()
  console.log(data.payload);
  showResult(data.payload);
  console.log(data.payload[0])

} catch(error) {
  console.error(error);
  results.innerHTML = `<p>${error.message}</p>`
}


provinceFilter.addEventListener("change", ()=> {
  const value = provinceFilter.value;

  if (value === "Alla") {
    showResult(activities);
  } else {
    const filtered = activities.filter(a => a.province === value);
    showResult(filtered)
  }
});


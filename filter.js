//Lowkey filter.js
console.log("Helloooo")
let allActivities = []

const results = document.getElementById("results");
const provinceFilter = document.getElementById("provincefilter");
const priceFilter = document.getElementById("pricefilter");
const bowlingCheckbox = document.getElementById("Bowling");
const GokartCheckbox = document.getElementById("Gokart");
const GolfCheckbox = document.getElementById("Golf");



async function fetchActivities () {

  const types = ["activity"];
  const descriptions = ["Bowlinghall", "Gokart", "Golfbana"];
  const provinces = ["Småland", "Öland"]
  const params = new URLSearchParams({
    controller: "establishment",
    method: "getall",
    api_key: "2rJ8Mq3V",
    types: types.join(","),
    descriptions: descriptions.join(","),
    //provinces: provinces.join(","),

  });

  const response = await fetch(`https://smapi.lnu.se/api/?${params}`);

  if (!response.ok) {
    throw new Error("Sökningen misslyckades");
  }

  return response.json();
}

//const data = await fetchActivities ()
//console.log(data)



function renderActivities (activities) {
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
      <p>${activity.province}</p>

      <p>${activity.city}</p>
      <p>${activity.price_range ?? "Pris saknas"}</p>
      <p>${activity.address ?? "Adress saknas"}</p>
        
        `
        results.append(article)
    }


}



try {
  const data = await fetchActivities ()
  console.log(data.payload);
  allActivities = data.payload;
  renderActivities(allActivities)
  console.log(data.payload[0])

} catch(error) {
  console.error(error);
  results.innerHTML = `<p>${error.message}</p>`
}


provinceFilter.addEventListener("change", ()=> {
  const value = provinceFilter.value;

  if (value === "Alla") {
    renderActivities(allActivities);
  } else {
    const filtered = allActivities.filter(a => a.province === value);
    renderActivities(filtered)
  }
});

//lite hårkodat, fattig filter, funkar lite konstigt också
priceFilter.addEventListener("change", ()=> {

  const value = priceFilter.value;

  if(value === "Alla") {
    renderActivities(allActivities)
  } else {
    const filtered = allActivities.filter(a => a.price_range === value);
    renderActivities(filtered)
  }

})


function filterByCheckboxes() {
  const selectedDescriptions = [];

  if (bowlingCheckbox.checked) {
    selectedDescriptions.push("Bowlinghall");
  }

  if (GokartCheckbox.checked) {
    selectedDescriptions.push("Gokart");
  }

  if (GolfCheckbox.checked) {
    selectedDescriptions.push("Golfbana")
  }

  const filtered = allActivities.filter(activity => selectedDescriptions.includes(activity.description))

  renderActivities(filtered)
}
bowlingCheckbox.addEventListener("change", () => {
  filterByCheckboxes();
});

GokartCheckbox.addEventListener("change", () => {
  filterByCheckboxes();
});

GolfCheckbox.addEventListener("change", () => {
  filterByCheckboxes();
});

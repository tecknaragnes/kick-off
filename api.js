// Vi kanske kan ha allt smapi och api relaterat här

//const results = document.querySelector(".results");

//let allActivities = []

export async function fetchActivities(filters) {

  if (!filters) {
    filters = {};
  }

  const types = ["activity"];
  const descriptions = ["Bowlinghall", "Gokart", "Golfbana"];
  const provinces = ["Småland", "Öland"]
  const params = new URLSearchParams({
    controller: "establishment",
    method: "getall",
    api_key: window.APIKEY,
    types: types.join(","),

    descriptions: descriptions.join(","),
    provinces: provinces.join(","),

  });

  if (filters.sort === "rating-high") {
    params.set("order_by", "rating");
    params.set("sort_in", "DESC");
  }

  if (filters.sort === "rating-low") {
    params.set("order_by", "rating");
    params.set("sort_in", "ASC");
  }

   if (filters.sort === "price-low") {
    params.set("order_by", "price_range");
    params.set("sort_in", "ASC")
  }



   if (filters.sort === "price-high") {
    params.set("order_by", "price_range");
    params.set("sort_in", "DESC");



  }
console.log("visar allt efter ? teckenet,", params.toString())

console.log("visar full URL,", `https://smapi.lnu.se/api/?${params}`);

console.log("Sorteringss val från dropdownet", filters.sort);

  if (params.get("order_by")) {
  console.log("SMAPI kommer sortera på:", params.get("order_by"));
  console.log("Sorteringsriktning:", params.get("sort_in"));
} else {
  console.log("Ingen SMAPI sortering vald så standardläge");
}

console.log("URL som skickas:", `https://smapi.lnu.se/api/?${params}`);






  const response = await fetch(`https://smapi.lnu.se/api/?${params}`);

  if (!response.ok) {
    throw new Error("Sökningen misslyckades");
  }

  return response.json();
}


///ta med review oxå


// try {
//   const data = await fetchActivities ()
//   console.log(data.payload);
//   allActivities = data.payload;
//   renderActivities(allActivities)
//   console.log(data.payload[0])

// } catch(error) {
//   console.error(error);
//   results.innerHTML = `<p>${error.message}</p>`
// }


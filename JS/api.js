// Vi kanske kan ha allt smapi och api relaterat här

export async function fetchActivities(filters) {

  if (!filters) {
    filters = {};
  }

  const params = new URLSearchParams({
    controller: "establishment",
    method: "getall",
    api_key: window.APIKEY,
    types: "activity",
  });

  if (filters.ids && filters.ids.length > 0) {
    params.set("ids", filters.ids.join(","));
  }

  //om användaren har valt ett maxavstånd skickas pos och radie med, 
  // då använder vi getfromlatlng istället för getall, alltså vi ändrar metoden
  if (filters.lat != null && filters.lng != null && filters.radius) {
    params.set("method", "getfromlatlng");
    params.set("lat", filters.lat);
    params.set("lng", filters.lng);
    params.set("radius", filters.radius);
  }

  if (filters.descriptions && filters.descriptions.length > 0) {
    params.set("descriptions", filters.descriptions.join(","))
  };

  if (filters.sort === "rating-high") {
    params.set("order_by", "rating");
    params.set("sort_in", "DESC");
  };

  if (filters.sort === "rating-low") {
    params.set("order_by", "rating");
    params.set("sort_in", "ASC");
  };

  if (filters.sort === "price-low") {
    params.set("order_by", "price_range");
    params.set("sort_in", "ASC");
  };

  if (filters.sort === "price-high") {
    params.set("order_by", "price_range");
    params.set("sort_in", "DESC");
  };

  if (filters.outdoors === "Y" || filters.outdoors === "N") {
    params.set("outdoors", filters.outdoors);
  };

  if (filters.cities === "Alla" || !filters.cities) {
    params.delete("cities"); // om stad är satt till "alla" är den inte med i sökningen
  } else { //annars tas den specifika staden med
    params.set("cities", filters.cities);
  }

  if (filters.price_ranges === "0") {
    params.set("price_ranges", "25-100");
  } else if (filters.price_ranges === "1") {
    params.set("price_ranges", "25-100,100-250");
  } else if (filters.price_ranges === "2" || filters.price_ranges === "3" || filters.price_ranges === "4") {
    params.set("price_ranges", "25-100,100-250,250-500");
  } else {
    params.delete("price_ranges"); //om pris är satt till högre än 2000 har vi bara en extra aktivitet, så vi tar bort pris_ranges helt från sökningen och visar alla
  }

  console.log("visar full URL,", `https://smapi.lnu.se/api/?${params}`);

  console.log("URL som skickas:", `https://smapi.lnu.se/api/?${params}`);
  const response = await fetch(`https://smapi.lnu.se/api/?${params}`);

  if (!response.ok) {
    throw new Error("Sökningen misslyckades");
  }

  return response.json();
}


// En annan controller (activity)
export async function fetchActivitiesConAct(filters) {

  if (!filters) {
    filters = {};
  }

  const params = new URLSearchParams({
    controller: "activity",
    method: "getall",
    api_key: window.APIKEY
  });

  if (filters.descriptions && filters.descriptions.length > 0) {
    params.set("descriptions", filters.descriptions.join(","))
  };

  //physical_effort, disability_support, estimated_duration
  if (filters.physical_effort === "1") {
    params.set("physical_efforts", "LOW");
  } else if (filters.physical_effort === "2") {
    params.set("physical_efforts", "MEDIUM");
  } else if (filters.physical_effort === "3") {
    params.set("physical_efforts", "HIGH");
  } else {
    params.delete("physical_efforts");
  }

  if (filters.estimated_duration === "0") {
    params.set("estimated_durations", "MINUTES");
  } else if (filters.estimated_duration === "1") {
    params.set("estimated_durations", "HOURS");
  } else if (filters.estimated_duration === "2") {
    params.set("estimated_durations", "DAYS");
  } else {
    params.delete("estimated_durations");
  }

  if (filters.price_ranges === "0") {
    params.set("price_ranges", "25-100");
  } else if (filters.price_ranges === "1") {
    params.set("price_ranges", "100-250");
  } else if (filters.price_ranges === "2" || filters.price_ranges === "3" || filters.price_ranges === "4") {
    params.set("price_ranges", "250-500");
  } else {
    params.delete("price_ranges"); //om pris är satt till högre än 2000 har vi bara en extra aktivitet, så vi tar bort pris_ranges helt från sökningen och visar alla
  }

  if (filters.disability_support === true) {
    params.set("disability_support", "Y");//vill visa de som är "N" också?
  };

  console.log("nu har vi sökt på controllern activity");
  console.log("visar full URL,", `https://smapi.lnu.se/api/?${params}`);

  console.log("URL som skickas:", `https://smapi.lnu.se/api/?${params}`);
  const response = await fetch(`https://smapi.lnu.se/api/?${params}`);

  if (!response.ok) {
    throw new Error("Sökningen misslyckades");
  }

  return response.json();
}

export async function fetchFood(Alat, Alng) {

  const params = new URLSearchParams({
    controller: "food",
    method: "getfromlatlng",
    api_key: window.APIKEY,
    lat: Alat,
    lng: Alng
  });

  console.log("URL som skickas:", `https://smapi.lnu.se/api/?${params}`);
  const response = await fetch(`https://smapi.lnu.se/api/?${params}`);

  if (!response.ok) {
    throw new Error("Sökningen misslyckades");
  }

  return response.json();
}
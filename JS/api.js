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

  //physical_effort, disability_support, estimated_duration

  console.log("visar full URL,", `https://smapi.lnu.se/api/?${params}`);

  console.log("URL som skickas:", `https://smapi.lnu.se/api/?${params}`);
  const response = await fetch(`https://smapi.lnu.se/api/?${params}`);

  if (!response.ok) {
    throw new Error("Sökningen misslyckades");
  }

  return response.json();
}
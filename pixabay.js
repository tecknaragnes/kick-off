const params = new URLSearchParams({
    // api_key: ,
    q = "",
    image_type: "photo",
    orientation: ""
});

console.log("visar full URL,", `https://pixabay.com/api/?${params}`);
const response = await fetch(`https://pixabay.com/api/?${params}`);
const data = await response.json(); 
import { pixakey } from "./config.js";

export const fetchPixabay = async (query) => {
    const params = new URLSearchParams({
        // api_key: ,
        q = "",
        image_type: "photo",
        orientation: ""
    });

    console.log("full URL,", `https://pixabay.com/api/?${params}`);
}


// const response = await fetch(`https://pixabay.com/api/?${params}`);
// const data = await response.json();

// kolla efter description i datan för aktiviteten, och använd den som query i pixabay
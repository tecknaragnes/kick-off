export const fetchPixabay = async (query) => {
    const params = new URLSearchParams({
        key: pixakey,
        q: query,
        image_type: "photo",
        orientation: ""
    });

    console.log("Pixabay-sökning:", `https://pixabay.com/api/?${params}`);
}


// const response = await fetch(`https://pixabay.com/api/?${params}`);
// const data = await response.json();

// kolla efter description i datan för aktiviteten, och använd den som query i pixabay
export const fetchPixabay = async (query) => {
    const params = new URLSearchParams({
        key: pixakey,
        q: query,
        image_type: "photo",
        orientation: "",
        lang: "sv"
    });

    console.log("Pixabay-sökning:", `https://pixabay.com/api/?${params}`);

    try {
        const response = await fetch(`https://pixabay.com/api/?${params}`);
        const pixaPics = await response.json();
    } catch (error) {
        console.error("Fel vid hämtning från Pixabay:", error);
        return [];
    }
}

// kolla efter description i datan för aktiviteten, och använd den som query i pixabay
// matcha en lista med idn från pixabay till idn i datan, och lägg till en bild-url i renderingen för varje matchning
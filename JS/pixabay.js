const imageCache = new Map();

export const getImageForActivity = async (activity, wide = true) => {
    //om bilden redan är cachead returneras bilden från cache
    if (imageCache.has(activity.id)) {
        return imageCache.get(activity.id);
    }

    let page = window.location.href;

    try {
        const params = new URLSearchParams({ //skapa sökväg för pixabay
            key: window.pixakey,
            q: activity.description,
            image_type: "photo",
            orientation: "vertical",
            lang: "sv",
        });

        if (activity.description === "Nöjescenter") {
            params.set("q", "arcade+game");
            params.set("lang", "en");
        }
        if (activity.description === "Paintballcenter") {
            params.set("q", "paintball");
        }
        if (activity.description === "Hälsocenter") {
            params.set("q", "dragkamp+män");
        }
        if (activity.description === "Biograf") {
            params.set("q", "cinema+popcorn");
            params.set("lang", "en");
        }

        if (page.includes("details") && wide === true) {
            params.set("orientation", "horizontal");
        }

        const response = await fetch(`https://pixabay.com/api/?${params}`);
        const pixaPics = await response.json();

        if (pixaPics.hits && pixaPics.hits.length > 0) { //om det finns bilder i svaret
            let imageUrl;
            if (page.includes("details") && wide === true) {
                imageUrl = pixaPics.hits[activity.id % pixaPics.hits.length].webformatURL;
            } else {
                imageUrl = pixaPics.hits[activity.id % pixaPics.hits.length].previewURL;
            }
            //lägga in den i cache med aktivitetens id som nyckel
            imageCache.set(activity.id, imageUrl);
            return imageUrl;
        }
        return null; // ingen bild hittades
    } catch (error) {
        console.error("Fel vid hämtning från Pixabay:", error);
        console.log("Felande url:", `https://pixabay.com/api/?${params}`);
        return null;
    }
};

// kolla efter description i datan för aktiviteten, och använd den som query i pixabay
// matcha en lista med idn från pixabay till idn i datan, och lägg till en bild-url i renderingen för varje matchning
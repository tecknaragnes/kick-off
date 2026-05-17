const imageCache = new Map();

export const getImageForActivity = async (activity) => {
    //om bilden redan är cachead returneras bilden från cache
    if (imageCache.has(activity.id)) {
        return imageCache.get(activity.id);
    }

    try {
        const params = new URLSearchParams({ //skapa sökväg för pixabay
            key: pixakey,
            q: activity.description,
            image_type: "photo",
            orientation: "vertical",
            lang: "sv",
        });
        console.log(`https://pixabay.com/api/?${params}`);
        const response = await fetch(`https://pixabay.com/api/?${params}`);
        const pixaPics = await response.json();

        if (pixaPics.hits && pixaPics.hits.length > 0) {
            const imageUrl = pixaPics.hits[0].webformatURL;
            //lägga in den i cache med aktivitetens id som nyckel
            imageCache.set(activity.id, imageUrl);
            return imageUrl;
        }
        return null; // ingen bild hittades
    } catch (error) {
        console.error("Fel vid hämtning från Pixabay:", error);
        return null;
    }
};

// kolla efter description i datan för aktiviteten, och använd den som query i pixabay
// matcha en lista med idn från pixabay till idn i datan, och lägg till en bild-url i renderingen för varje matchning
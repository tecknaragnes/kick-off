// Localstorage, man kan spara sina favorit aktiviteter 
import { renderActivities } from "./render.js";


// if (favoritesText) {
//     const favorites = JSON.parse(favoritesText);
//     renderActivities(favorites);
// } else {
//     renderActivities([])
// }

const STORAGE_KEY = "favorites";

export function getFavorites() {
    const favoritesText =  localStorage.getItem(STORAGE_KEY);

    if (favoritesText === null) {
        return [];
    }
//Göra det array istället för text
    return JSON.parse(favoritesText);

}

function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function addFavorites(activity) {
    const favorites = getFavorites()
    
    let foundFavorite = null;

    for (const favorite of favorites) {
        if (favorite.id === activity.id) {
            foundFavorite = favorite;
            break;
        }
    }

    if (foundFavorite) {
        console.log("finns redan som fav", activity.name)
        return;
    }

    favorites.push(activity);
    


}


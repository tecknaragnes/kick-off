// Localstorage, man kan spara sina favorit aktiviteter 
import { renderActivities } from "./render.js";



const STORAGE_KEY = "favorites";

//hämtar från l storage och ger tbx array
export function getFavorites() {
    const favoritesText =  localStorage.getItem(STORAGE_KEY);

    if (!favoritesText) {
        return [];
    }
//Göra det array istället för text
    return JSON.parse(favoritesText);

}

console.log(getFavorites());

//tar en array och spaarar i Lstorage
function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

function isActivityFavorite (activity) {
    const favorites = getFavorites();

    for (const favorite of favorites) {
        if (favorite.id === activity.id) {
            return true;
        }
    }
    return false;
    
}




function toggleFav (activity) {
    const favorites = getFavorites();
    const activityAlreadySaved = isActivityFavorite(activity);


    if (activityAlreadySaved) {
        const updatedFavorites =[];

        for (const favorite of favorites) {
            if (favorite.id !== activity.id) {
                updatedFavorites.push(favorite);
            }
        }

        saveFavorites(updatedFavorites);
    } else {
        favorites.push(activity)
        saveFavorites(favorites)
    }
}


export function listenToFavClick () {
    
}
// export function addFavorites(activity) {
//     const favorites = getFavorites()
    
//     let foundFavorite = null;

//     for (const favorite of favorites) {
//         if (favorite.id === activity.id) {
//             foundFavorite = favorite;
//             break;
//         }
//     }

//     if (foundFavorite) {
//         console.log("finns redan som fav", activity.name)
//         return;
//     }

//     favorites.push(activity);
    


// }

// Localstorage, man kan spara sina favorit aktiviteter 
import { renderActivities } from "./render.js";
const currentPage = document.body.dataset.page;




const STORAGE_KEY = "favorites";

//hämtar från l storage och ger tbx array
export function getFavorites() {
    const favoritesText = localStorage.getItem(STORAGE_KEY);

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

function isActivityFavorite(activity) {
    const favorites = getFavorites();

    for (const favorite of favorites) {
        if (favorite.id === activity.id) {
            return true;
        }
    }
    return false;

}


function addFavorite(activity) {
    const favorites = getFavorites();

    favorites.push(activity)
    saveFavorites(favorites)
    console.log("sparade favorite,", activity.name);

}

function removeFavorite(activity) {
    const favorites = getFavorites();
    const updatedFavorites = [];

        for (const favorite of favorites) {
            if (favorite.id !== activity.id) {
                updatedFavorites.push(favorite);
            }
        }

        saveFavorites(updatedFavorites);
        console.log("tog bort favorit,", activity.name);

        if (currentPage === "favoritespage") {
            renderActivities(updatedFavorites)
        }
}

function toggleFav(activity) {

    const activityAlreadySaved = isActivityFavorite(activity);
    if (activityAlreadySaved) {
        removeFavorite(activity);
    } else {
        addFavorite(activity)
    }
}


export function listenToFavoriteClick(favoriteButton, activity) {
    if (isActivityFavorite((activity))) {
        favoriteButton.classList.add("favorite-active");
    } else {
        favoriteButton.classList.remove("favorite-active");
    }
    favoriteButton.addEventListener("click", () => {
        toggleFav(activity)

        if (isActivityFavorite(activity)) {
            favoriteButton.classList.add("favorite-active")
        } else{
            favoriteButton.classList.remove("favorite-active");
        }
    })

}



if (currentPage === "favoritespage") {
    const favorites = getFavorites();
    renderActivities(favorites);
}

// Localstorage, man kan spara sina favorit aktiviteter 
import { renderActivities } from "./render.js";
const currentPage = document.body.dataset.page;




const STORAGE_KEY = "favorites";

//hämtar från l storage och ger tbx array
export function getFavoritesFromLs() {
    const favoritesText = localStorage.getItem(STORAGE_KEY);

    if (!favoritesText) {
        return [];
    }
    //Göra det array istället för text
    return JSON.parse(favoritesText);

}

console.log(getFavoritesFromLs());

//tar en array och spaarar i Lstorage
function saveFavoritesToLs(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

function isActivityFavorite(activity) {
    const favorites = getFavoritesFromLs();

    for (const favorite of favorites) {
        if (favorite.id === activity.id) {
            return true;
        }
    }
    return false;

}


function addFavorite(activity) {
    const favorites = getFavoritesFromLs();

    favorites.push(activity)
    saveFavoritesToLs(favorites)
    console.log("sparade favorite,", activity.name);

}

function removeFavorite(activity) {
    const favorites = getFavoritesFromLs();
    const updatedFavorites = [];

    for (const favorite of favorites) {
        if (favorite.id !== activity.id) {
            updatedFavorites.push(favorite);
        }
    }

    saveFavoritesToLs(updatedFavorites);
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
        favoriteButton.innerHTML = `<img src="../SVG/save.svg" alt="Ta bort från favoriter">`;
    } else {
        favoriteButton.classList.remove("favorite-active");
        favoriteButton.innerHTML = `<img src="../SVG/empty-save.svg" alt="Spara aktivitet">`;
    }

    favoriteButton.addEventListener("click", (event) => {
        toggleFav(activity);
        event.preventDefault();
        event.stopPropagation();

        if (isActivityFavorite(activity)) {
            favoriteButton.classList.add("favorite-active");
            favoriteButton.innerHTML = `<img src="../SVG/save.svg" alt="Ta bort från favoriter">`;
        } else {
            favoriteButton.classList.remove("favorite-active");
            favoriteButton.innerHTML = `<img src="../SVG/empty-save.svg" alt="Spara aktivitet">`;
        }
    })

}



if (currentPage === "favoritespage") {
    const favorites = getFavoritesFromLs();
    renderActivities(favorites);
}
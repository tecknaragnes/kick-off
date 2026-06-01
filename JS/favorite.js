// Localstorage, man kan spara sina favorit aktiviteter 
import { renderActivities } from "./render.js";
import { fetchActivitiesConAct } from "./api.js";

const currentPage = document.body.dataset.page;




const STORAGE_KEY = "favorites";

//hämtar från l storage och ger tbx array
export function getFavoritesFromLs() {
    const favoritesText = localStorage.getItem(STORAGE_KEY);

    if (!favoritesText) {
        return [];
    }

    try {
        //Göra det array istället för text
        return JSON.parse(favoritesText);
    } catch (error) {
        console.error("Kunde inte läsa favoriter från localStorage:", error);
        return [];
    }


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
        renderFavoritePage();
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

function getIconPath(iconName) {
    let iconPath = "SVG/" + iconName;

    if (window.location.pathname.toLowerCase().includes("/html/")) {
        iconPath = "../SVG/" + iconName;
    }

    return iconPath;
}




export function listenToFavoriteClick(favoriteButton, activity) {
    if (isActivityFavorite((activity))) {
        favoriteButton.classList.add("favorite-active");
        favoriteButton.innerHTML = `<img src="${getIconPath("save.svg")}" alt="Ta bort från favoriter">`;
    } else {
        favoriteButton.classList.remove("favorite-active");
        favoriteButton.innerHTML = `<img src="${getIconPath("empty-save.svg")}" alt="Spara aktivitet">`;
    }

    favoriteButton.addEventListener("click", (event) => {
        toggleFav(activity);
        event.preventDefault();
        event.stopPropagation();

        if (isActivityFavorite(activity)) {
            favoriteButton.classList.add("favorite-active");
            favoriteButton.innerHTML = `<img src="${getIconPath("save.svg")}" alt="Ta bort från favoriter">`;
        } else {
            favoriteButton.classList.remove("favorite-active");
            favoriteButton.innerHTML = `<img src="${getIconPath("empty-save.svg")}" alt="Spara aktivitet">`;
        }
    })

}

async function renderFavoritePage() {
    const favorites = getFavoritesFromLs();

    const favoriteIds = [];

    for (const favorite of favorites) {
        favoriteIds.push(favorite.id);
    }

    const activityData = await fetchActivitiesConAct({
        ids: favoriteIds
    });

    renderActivities(favorites, activityData.payload ?? []);
}




if (currentPage === "favoritespage") {
    renderFavoritePage();

}
// Localstorage, man kan spara sina favorit aktiviteter 
import { renderActivities } from "./render.js";

const savedFavorites = localStorage.getItem("favorites");

if (savedFavorites) {
    const favorites = JSON.parse(savedFavorites);
    renderActivities(favorites);
} else {
    renderActivities([])
}
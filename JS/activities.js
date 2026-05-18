//renderingen, filtrering imortera det
import { listenerEvents, filterFromSmapi } from "./filter.js"


listenerEvents()
filterFromSmapi();

//Fälla in och ut mer sortering och filter
const foldSection = document.querySelector("#bottom-fold-sec");
foldSection.style.display = "none";
foldSection.classList.replace("visible", "hidden");
const foldBtn = document.querySelector("#fold-btn");

foldBtn.addEventListener("click", () => {
    if (foldSection.classList == "hidden") {
        foldSection.classList.replace("hidden", "visible");
        foldSection.style.display = "flex";
    }
    else {
        foldSection.classList.replace("visible", "hidden");
        foldSection.style.display = "none";
    }
});
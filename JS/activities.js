//renderingen, filtrering imortera det
import { listenerEvents, filterFromSmapi } from "./filter.js"


listenerEvents()
filterFromSmapi();

//Fälla in och ut mer sortering och filter
const foldSection = document.querySelector("#bottom-fold-sec");
// foldSection.style.display = "none";
foldSection.classList.replace("visible", "hidden");
const foldBtn = document.querySelector("#fold-btn");
const foldTxt = document.querySelector("#fold-text");
const foldIcon = document.querySelector("#fold-btn img");

foldBtn.addEventListener("click", () => { //går det att fixa så att den visas när skärmen är bredare än 1500px? Alltså ta bort knappen för fäll ut/in och bara visa
    if (foldSection.classList == "hidden") {
        foldSection.classList.replace("hidden", "visible");
        foldSection.style.display = "flex";
        foldTxt.textContent = "Fäll in";
        foldIcon.style.transform = "rotate(180deg)";
    }
    else {
        foldSection.classList.replace("visible", "hidden");
        foldSection.style.display = "none";
        foldTxt.textContent = "Fäll ut";
    }
});
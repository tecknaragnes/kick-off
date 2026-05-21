//renderingen, filtrering imortera det
import { listenerEvents, filterFromSmapi } from "./filter.js"

listenerEvents()
filterFromSmapi();

//Fälla in och ut mer sortering och filter
const foldSection = document.querySelector("#bottom-fold-sec");
foldSection.style.display = "none";
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


// för att visa rätt filter för de olika evenemangen (svensexa, etc)
try { // Använd try/catch
    const urlParams = new URLSearchParams(window.location.search);
    let eventType = urlParams.get("type"); // evenemangstyp skall läsas av från URL:en.
    // eventType = houses.find(e => e.id == urlType);
    if (eventType === "sven") { // visa svensexa-filter
        console.log("Visar svensexa-filter");
        const eventBtn = document.querySelector(".spec-event");
        console.log(eventBtn);
        eventBtn.classList.add("on"); // tänd knappen
        // ta bort filterna
        // går det att ta bort type i url? Eller ska man inte använda url alls?
    } else if (eventType === "aw") { // visa aw-filter
        console.log("Visar AW-filter");
        const eventBtn = document.querySelectorAll(".spec-event")[1];
        console.log(eventBtn);
        eventBtn.classList.add("on"); // tänd knappen
    } else if (eventType === "kick") { // visa kick-off-filter
        console.log("Visar kick-off-filter");
        const eventBtn = document.querySelectorAll(".spec-event")[2];
        console.log(eventBtn);
        eventBtn.classList.add("on"); // tänd knappen
    } else {
        // visa alla filter normalt
        // släck ev knappar
    }
} catch (err) {
    console.error("Fel vid hämtning av evenemangstyp från URL:", err);
}
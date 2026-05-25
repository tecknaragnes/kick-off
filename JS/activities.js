//renderingen, filtrering imortera det
import { listenerEvents, filterFromSmapi, eventFiltering } from "./filter.js"

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
        foldIcon.style.transform = "rotate(0deg)";
    }
});


// för att visa rätt filter för de olika evenemangen (svensexa, etc)
const stagnightBtn = document.getElementById("stag");
const awBtn = document.getElementById("aw");
const teamBtn = document.getElementById("team");

try { // Använd try/catch
    const urlParams = new URLSearchParams(window.location.search);
    let eventType = urlParams.get("type"); // evenemangstyp skall läsas av från URL:en.
    if (eventType === "sven") { // visa svensexa-filter
        stagnightBtn.classList.replace("off", "on"); // tänd knappen
        eventFiltering();
    } else if (eventType === "aw") { // visa aw-filter
        awBtn.classList.replace("off", "on"); // tänd knappen
        eventFiltering();
    } else if (eventType === "kick") { // visa kick-off-filter
        teamBtn.classList.replace("off", "on"); // tänd knappen
        eventFiltering();
    } else {
        // visa alla filter normalt
        stagnightBtn.classList.replace("on", "off");
        awBtn.classList.replace("on", "off");
        teamBtn.classList.replace("on", "off"); // släck ev knappar

    }
} catch (err) {
    console.error("Fel vid hämtning av evenemangstyp från URL:", err);
}

stagnightBtn.addEventListener("click", () => {
    if (stagnightBtn.classList.contains("off")) {
        stagnightBtn.classList.replace("off", "on");
        console.log("Stag night-filter på");
        awBtn.classList.replace("on", "off");
        teamBtn.classList.replace("on", "off"); //stännga av de andra knapparna
        foldSection.classList.replace("hidden", "visible");
        foldSection.style.display = "flex";
        foldTxt.textContent = "Fäll in";
        foldIcon.style.transform = "rotate(180deg)";
        eventFiltering();
    } else {
        console.log("Stag night-filter av");
        stagnightBtn.classList.replace("on", "off");
        eventFiltering();
    }
})

awBtn.addEventListener("click", () => {
    if (awBtn.classList.contains("off")) {
        awBtn.classList.replace("off", "on");
        console.log("aw-filter på");
        stagnightBtn.classList.replace("on", "off");
        teamBtn.classList.replace("on", "off"); //stännga av de andra knapparna
        foldSection.classList.replace("hidden", "visible");
        foldSection.style.display = "flex";
        foldTxt.textContent = "Fäll in";
        foldIcon.style.transform = "rotate(180deg)";
        eventFiltering();
    } else {
        console.log("aw-filter av");
        awBtn.classList.replace("on", "off");
        eventFiltering();
    }
})

teamBtn.addEventListener("click", () => {
    if (teamBtn.classList.contains("off")) {
        teamBtn.classList.replace("off", "on");
        console.log("team-filter på");
        stagnightBtn.classList.replace("on", "off");
        awBtn.classList.replace("on", "off"); //stännga av de andra knapparna
        foldSection.classList.replace("hidden", "visible");
        foldSection.style.display = "flex";
        foldTxt.textContent = "Fäll in";
        foldIcon.style.transform = "rotate(180deg)";
        eventFiltering();
    } else {
        console.log("team-filter av");
        teamBtn.classList.replace("on", "off");
        eventFiltering();
    }
})

listenerEvents();
filterFromSmapi();

const navToggle = document.querySelector("nav ul #nav-toggle");

const showHideNav = () => {
    const navUl = document.querySelector("nav ul");
    const liToggle = document.querySelectorAll("nav li.toggle-li");

    if (navUl.classList.contains("hidden")) {
        navUl.classList.replace("hidden", "visible");
        liToggle.forEach(li => li.style.display = "list-item");
    } else {
        navUl.classList.replace("visible", "hidden");
        liToggle.forEach(li => li.style.display = "none");
    }
}

navToggle.addEventListener("click", () => {
    showHideNav();
})
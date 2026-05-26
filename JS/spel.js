//spelet här, här hade nog klass passat, ksk 3 olika val som spel och if användaren klickar ex inomhus eller afterwork så kan man === med hjälper av activity.filter retur bowlinghall eller liknande

const quiz = document.getElementById("quiz");

import { fetchActivities, fetchActivitiesConAct } from "./api.js";

quiz.addEventListener("submit", function (event) {
    event.preventDefault();
    const answer1 = document.querySelector(`input[name="fråga 1"]:checked`);
    if (!answer1) {
        console.log("error");
        return;
    }

    const answer2 = document.querySelector(`input[name="fråga 2"]:checked`);
    if (!answer2) {
        console.log("error");
        return;
    }

    const answer3 = document.querySelector(`input[name="fråga 3"]:checked`);
    if (!answer3) {
        console.log("error");
        return;
    }

    const answer4 = document.querySelector(`input[name="fråga 4"]:checked`);
    if (!answer4) {
        console.log("error");
        return;
    }

    const answer5 = document.querySelector(`input[name="fråga 5"]:checked`);
    if (!answer5) {
        console.log("error");
        return;
    }

    let answers = [answer1.value, answer2.value, answer3.value, answer4.value, answer5.value];
    console.log(answers);

    let filter1 = [];

    if (answers[0] == 1 || answers[0] == 2 || answers[0] == 3) {
        filter1.push("low");
    }
    if (answers[0] == 2 || answers[0] == 3 || answers[0] == 4) {
        filter1.push("medium");
    }
    if (answers[0] == 3 || answers[0] == 4 || answers[0] == 5) {
        filter1.push("high");
    }

    let filter2 = [];

    if (answers[1] == 1 || answers[1] == 2) {
        filter2.push("5", "4")
    }
    if (answers[1] == 2 || answers[1] == 3 || answers[1] == 4) {
        filter2.push("3");
    }
    if (answers[1] == 4 || answers[1] == 5) {
        filter2.push("1", "2");
    }

    let filter3 = [];

    if (answers[2] == 1) {
        filter3.push("days");
    }
    if (answers[2] == 2) {
        filter3.push("hours");
    }
    if (answers[2] == 3) {
        filter3.push("minutes");
    }

    let filter4 = [];

    if (answers[3] == 1) {
        filter4.push("sven");
    }
    if (answers[3] == 2) {
        filter4.push("aw");
    }
    if (answers[3] == 3) {
        filter4.push("teambuilding");
    }

    let filter5 = [];

    if (answers[4] == 1) {
        filter5.push("Y");
    }
    if (answers[4] == 2) {
        filter5.push("");
    }
    if (answers[4] == 3) {
        filter5.push("N");
    }

    console.log(filter1, filter2, filter3, filter4, filter5);
});


// const navToggle = document.querySelector("nav ul #nav-toggle");

// const showHideNav = () => {
//     const navUl = document.querySelector("nav ul");
//     const liToggle = document.querySelectorAll("nav li.toggle-li");

//     if (navUl.classList.contains("hidden")) {
//         navUl.classList.replace("hidden", "visible");
//         liToggle.forEach(li => li.style.display = "list-item");
//     } else {
//         navUl.classList.replace("visible", "hidden");
//         liToggle.forEach(li => li.style.display = "none");
//     }
// }

// navToggle.addEventListener("click", () => {
//     showHideNav();
// })
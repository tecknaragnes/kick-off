//spelet här, här hade nog klass passat, ksk 3 olika val som spel och if användaren klickar ex inomhus eller afterwork så kan man === med hjälper av activity.filter retur bowlinghall eller liknande

const quiz = document.getElementById("quiz");
const foodCheckbox = document.getElementById("food");
const drinkCheckbox = document.getElementById("alcohol");

import { fetchActivities, fetchActivitiesConAct } from "./api.js";

quiz.addEventListener("submit", function(event) {
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

    let answers = [answer1.value, answer2.value, answer3.value, answer4.value, answer5.value, foodCheckbox.checked, drinkCheckbox.checked];
    console.log(answers);

    let filter1 = [];

    if (answers[0] == 1 || answers[0] == 2 || answers[0] == 3) {
        filter1 += "low";
    }
    if (answers[0] == 2 || answers[0] == 3 || answers[0] == 4) {
        filter1 += "medium";
    }
    if (answers[0] == 3 || answers[0] == 4 || answers[0] == 5) {
        filter1 += "high";
    }

    let filter2 = [];

    if (answers[1] == 1 || answers[1] == 2 || answers[1] == 3) {
        filter2 += "low";
    }
    if (answers[1] == 2 || answers[1] == 3 || answers[1] == 4) {
        filter2 += "medium";
    }
    if (answers[1] == 3 || answers[1] == 4 || answers[1] == 5) {
        filter2 += "high";
    }

        let filter3 = [];

    if (answers[2] == 1 || answers[2] == 2 || answers[2] == 3) {
        filter3 += "low";
    }
    if (answers[2] == 2 || answers[2] == 3 || answers[2] == 4) {
        filter3 += "medium";
    }
    if (answers[2] == 3 || answers[2] == 4 || answers[2] == 5) {
        filter3 += "high";
    }

    console.log(filter1);
});


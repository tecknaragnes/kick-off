//spelet här, här hade nog klass passat, ksk 3 olika val som spel och if användaren klickar ex inomhus eller afterwork så kan man === med hjälper av activity.filter retur bowlinghall eller liknande

const quiz = document.getElementById("quiz");
const foodCheckbox = document.getElementById("food");
const drinkCheckbox = document.getElementById("alcohol");


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
});
const answer = {
  "cd ..": "переместиться на одну папку назад",
  "cd /": "переместиться на одну папку вперед",
  "cd ~": "перейти к домашней папке",
  "ls ": "посмотреть содержимое папки",
  "touch ": "создать файл",
  "mkdir ": "создать папку",
  "rm ": "удалить файл",
  "rmdir ": "удалить папку",
  "code .": "открыть папку в редакторе кода",
};

const gameField = document.querySelector(".game-field");
const gameFieldAnswers = document.querySelector(".game-field__answers");
const gameFieldQuestions = document.querySelector(".game-field__questions");

let counterClick = 0;
let oneAnswer = "";
let twoAnswer = "";

gameField.addEventListener("click", (e) => {
  counterClick += 1;
  if (counterClick === 1) {
    oneAnswer = showContentCard(e);
  } else if (counterClick === 2) {
    twoAnswer = showContentCard(e);
    counterClick = 0;
    compareAnswers(oneAnswer, twoAnswer);
  }
});

const showContentCard = (event) => {
  if (event.target.className === "game-field__card") {
    let textCard = event.target.innerHTML;
    if (textCard !== "undefined") {
      return event.target.innerHTML;
    } else {
      searchingAnswer(textCard);
    }
  }
};

const searchingAnswer = (textCard) => {
  for (const key in answer) {
    if (textCard === answer[key]) {
      return answer[key];
    }
  }
};

const compareAnswers = (oneAnswer, twoAnswer) => {
  if (answer[oneAnswer] === twoAnswer) {
    console.log("yes");
  } else if (answer[twoAnswer] === oneAnswer) {
    console.log("yes");
  } else {
    console.log("no");
  }
};

// const getAnswers = (e) => {
//     let counterClick = 0;
//     let oneAnswer = "";
//     let twoAnswer = "";
//     counterClick += 1;
//     if (counterClick === 1) {
//       oneAnswer = showContentCard(e);
//     } else if (counterClick === 2) {
//       twoAnswer = showContentCard(e);
//       counterClick = 0;
//       compareAnswers(oneAnswer, twoAnswer);
//     }
// }

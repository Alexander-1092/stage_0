const answer = {
  "cd ..": "переместиться на одну папку назад",
  "cd /": "переместиться на одну папку вперед",
  "cd ~": "перейти к домашней папке",
  "cd -": "вернуться к предыдущей папке",
  "ls ": "посмотреть содержимое папки",
  "touch ": "создать файл",
  "mkdir ": "создать папку",
  "rm ": "удалить файл",
  "rmdir ": "удалить папку",
  "code .": "открыть папку в редакторе кода",
};

const gameField = document.querySelector(".game-field");
const headerTitle = document.querySelector(".header__title");

let counterClick = 0;
let oneAnswer = "";
let twoAnswer = "";
let linkActiveTag = "";
let linkActiveTagTwo = "";

gameField.addEventListener("click", (e) => {
  getAnswers(e);
});

const getAnswers = (e) => {
  if (e.target.className === "game-field__card") {
    counterClick += 1;

    if (counterClick === 1) {
      linkActiveTag = e.target;
      linkActiveTag.classList.add("active-game-field__card");
      oneAnswer = showContentCard(e);
    } else if (counterClick === 2) {
      linkActiveTagTwo = e.target;
      linkActiveTagTwo.classList.add("active-game-field__card");

      twoAnswer = showContentCard(e);
      counterClick = 0;
      compareAnswers(oneAnswer, twoAnswer);
    }
  }
};

const showContentCard = (event) => {
  let textCard = event.target.innerHTML;
  if (textCard !== "undefined") {
    return event.target.innerHTML;
  } else {
    searchingAnswer(textCard);
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
    linkActiveTag.classList.remove("active-game-field__card");
    linkActiveTagTwo.classList.remove("active-game-field__card");

    delheart();
  }
};

const delheart = () => {
  let counterHeart = localStorage.getItem("counterHeart");
  restarHeart(counterHeart);
  localStorage.setItem("counterHeart", JSON.stringify(counterHeart - 1));

  checkHeart(counterHeart - 1);
};

// Блок сердечек
const gameItemsBoxHeart = document.querySelector(".gameItems__box-heart");

const checkHeart = () => {
  let counterHeart = localStorage.getItem("counterHeart");
  createHeart(Number(counterHeart));
};

const createHeart = (counterHeart) => {
  for (let index = 0; index < counterHeart; index++) {
    gameItemsBoxHeart.insertAdjacentHTML(
      "afterbegin",
      "<img class='gameItems__icon' src='./assets/img/general/240px-Heart.svg.png'alt='icon heart'>"
    );
  }
};

checkHeart();
//

const restarHeart = (counterHeart) => {
  for (let index = 0; index < counterHeart; index++) {
    gameItemsBoxHeart.removeChild(gameItemsBoxHeart.children[0]);
  }
};

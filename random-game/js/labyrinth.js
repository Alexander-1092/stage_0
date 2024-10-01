import { answersLabyrinth } from "./answers.js";

const userName = JSON.parse(localStorage.getItem("userName")).userName;
const gameItemsBoxHeart = document.querySelector(".gameItems__box-heart");
const gameItemsIconSkills = document.querySelectorAll(
  ".gameItems__icon_skills"
);
//функция для перезаписи скиллов
const addSkillLocalStorage = () => {
  let data = JSON.parse(localStorage.getItem("skills"));
  data.push("labyrinth");
  localStorage.setItem("skills", JSON.stringify(data));
};
const showReceivedSkills = () => {
  let dataSkills = JSON.parse(localStorage.getItem("skills"));

  dataSkills.forEach((skill) => {
    if (skill === "noob") {
      gameItemsIconSkills[0].classList.add("active-gameItems__icon_skills");
    } else if (skill === "doungeon") {
      gameItemsIconSkills[1].classList.add("active-gameItems__icon_skills");
    } else if (skill === "smithy") {
      gameItemsIconSkills[2].classList.add("active-gameItems__icon_skills");
    } else if (skill === "labyrinth") {
      gameItemsIconSkills[3].classList.add("active-gameItems__icon_skills");
    } else if (skill === "shadow") {
      gameItemsIconSkills[4].classList.add("active-gameItems__icon_skills");
    } else if (skill === "sky") {
      gameItemsIconSkills[5].classList.add("active-gameItems__icon_skills");
    }
  });
};
showReceivedSkills();
// Блок сердечек
const delheart = () => {
  let counterHeart = localStorage.getItem("counterHeart");
  restarHeart(counterHeart);
  localStorage.setItem("counterHeart", JSON.stringify(counterHeart - 1));
  if (counterHeart == 1) {
    stopPlaySoundMain();
    showYouLoose(userName);
    playSoundLoose();
  }
  checkHeart(counterHeart - 1);
};
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
const restarHeart = (counterHeart) => {
  for (let index = 0; index < counterHeart; index++) {
    gameItemsBoxHeart.removeChild(gameItemsBoxHeart.children[0]);
  }
};

//приветствие игрока
const popupStart = document.querySelector(".popupStart");
const popupStartTitle = document.querySelector(".popupStart__title");
const popupStartBtn = document.querySelector(".popupStart__btn");
const body = document.querySelector(".body");

const sayHelloUser = (userName) => {
  popupStartTitle.innerHTML = `<h2 class="popupStart__title">Приветствую тебя ${userName}</h2>`;
};

//закрыть попап приветствия
popupStartBtn.addEventListener("click", () => {
  popupStart.classList.add("inactive-popupStart");
  body.classList.add("active-body");
});

sayHelloUser(userName);
//

//попап победа-поражения
const popupEndGame = document.querySelector(".popupEndGame");
const popupEndGameText = document.querySelector(".popupEndGame__text");
const popupEndGameLink = document.querySelector(".popupEndGame__link");
const wrapper = document.querySelector(".wrapper");
const popupEndGameTitle = document.querySelector(".popupEndGame__title");

const showYouWin = (userName) => {
  popupEndGameText.innerHTML = `<p class='popupEndGame__text'>Поздравляю ${userName}! Вы получили достижение - Сусанин Гита</p>`;
  popupEndGame.classList.add("active-popupEndGame");
  wrapper.classList.add("inactive-wrapper");
  addSkillLocalStorage();
};

const showYouLoose = (userName) => {
  popupEndGameText.innerHTML = `<p class='popupEndGame__text'> ${userName} вы потерялись в лабиринте, и умрли с голоду.</p>`;
  popupEndGameTitle.innerHTML =
    "<h2 class='popupEndGame__title'>Вы проиграли!</h2>";
  popupEndGameLink.href = "./index.html";
  popupEndGame.classList.add("active-popupEndGame");
  popupEndGame.classList.add("changeImgPopupEndGame");
  wrapper.classList.add("inactive-wrapper");
};

popupEndGameLink.addEventListener("click", () => {
  popupEndGame.classList.remove("active-popupEndGame");
  wrapper.classList.remove("inactive-wrapper");
});
//

const playingFieldQuestion = document.querySelector(".playingField__question");
const playingFieldBtn = document.querySelectorAll(".playingField__btn");
const playingFieldOptionBox = document.querySelector(
  ".playingField__option-box"
);
let numQuestion = 0;

//отслеживание нажатия
playingFieldOptionBox.addEventListener("click", (e) => {
  if (e.target.className === "playingField__btn") {
    checkAnswer(e.target.textContent, answersLabyrinth, numQuestion);
    showRightAnswer(answersLabyrinth, numQuestion);
    setTimeout(() => {
      dellRightAnswer();
    }, 1300);
    numQuestion += 1;
    setTimeout(() => {
      showAnswers(answersLabyrinth, numQuestion);
      showQuestion(answersLabyrinth, numQuestion);
    }, 1300);
  }
});
//

//меняем вопрос
const showQuestion = (answersLabyrinth, numQuestion) => {
  if (numQuestion < 8) {
    playingFieldQuestion.textContent = answersLabyrinth[numQuestion][0];
  }
};
//

//меняем ответы
const showAnswers = (answersLabyrinth, numQuestion) => {
  if (numQuestion < 8) {
    playingFieldBtn[0].textContent = answersLabyrinth[numQuestion][1];
    playingFieldBtn[1].textContent = answersLabyrinth[numQuestion][2];
    playingFieldBtn[2].textContent = answersLabyrinth[numQuestion][3];
  }
};
//

let counterAnswers = 0;
//проверяем правильность ответа
const checkAnswer = (answer, answersLabyrinth, numQuestion) => {
  counterAnswers += 1;
  if (answer === answersLabyrinth[numQuestion][4]) {
    playSoundRight();
  } else {
    delheart();
    playSoundEroro();
  }
  if (counterAnswers === 8) {
    stopPlaySoundMain();
    showYouWin(userName);
    playSoundWin();
  }
};
//
showAnswers(answersLabyrinth, numQuestion);
showQuestion(answersLabyrinth, numQuestion);

//выделить правильный ответ
const showRightAnswer = (answersLabyrinth, numQuestion) => {
  playingFieldBtn.forEach((element) => {
    if (element.textContent === answersLabyrinth[numQuestion][4]) {
      element.classList.toggle("playingField__btn_right");
    }
  });
};

const dellRightAnswer = () => {
  playingFieldBtn.forEach((element) => {
    if (element.className === "playingField__btn playingField__btn_right") {
      element.classList.remove("playingField__btn_right");
    }
  });
};

//

//music
const soundMain = document.querySelector(".sound-main");
function playSoundMain() {
  soundMain.currentTime = 0;
  soundMain.play();
}
playSoundMain();

function stopPlaySoundMain() {
  soundMain.pause();
  soundMain.currentTime = 0;
}

const soundError = document.querySelector(".sound-error");

function playSoundEroro() {
  soundError.currentTime = 0;
  soundError.play();
}

const soundRight = document.querySelector(".sound-right");

function playSoundRight() {
  soundRight.currentTime = 0;
  soundRight.play();
}

const soundWin = document.querySelector(".sound-win");

function playSoundWin() {
  soundWin.currentTime = 0;
  soundWin.play();
}

const soundLoose = document.querySelector(".sound-loose");

function playSoundLoose() {
  soundLoose.currentTime = 0;
  soundLoose.play();
}
//

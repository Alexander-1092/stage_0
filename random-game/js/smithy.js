import { answers } from "./answers.js";

const userName = JSON.parse(localStorage.getItem("userName")).userName;
const gameItemsBoxHeart = document.querySelector(".gameItems__box-heart");
const gameItemsIconSkills = document.querySelectorAll(
  ".gameItems__icon_skills"
);

//перемешиваем массив вопросов
const mixArray = (answers) => {
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
};

mixArray(answers);
//

//функция для перезаписи скиллов
const addSkillLocalStorage = () => {
  let data = JSON.parse(localStorage.getItem("skills"));
  if (!data.includes("smithy")) {
    data.push("smithy");
    localStorage.setItem("skills", JSON.stringify(data));
  }
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
  popupStartTitle.innerHTML = `<h2 class="popupStart__title">Приветствую тебя, ${userName}!</h2>`;
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
  popupEndGameText.innerHTML = `<p class='popupEndGame__text'>Поздравляю, ${userName}! Вы получили достижение - Гефест репозиториев</p>`;
  popupEndGame.classList.add("active-popupEndGame");
  wrapper.classList.add("inactive-wrapper");
  addSkillLocalStorage();
  playSoundWin();
};

const showYouLoose = (userName) => {
  popupEndGameText.innerHTML = `<p class='popupEndGame__text'>Авантюрист ${userName} погиб от прилетевшего в лоб молота.</p>`;
  popupEndGameTitle.innerHTML =
    "<h2 class='popupEndGame__title'>Вы проиграли!</h2>";

  const newParagraph = document.createElement("p");
  newParagraph.className = "popupEndGame__counter-skill";
  newParagraph.textContent = `Количество пройденных данжей: ${
    JSON.parse(localStorage.getItem("skills")).length - 1
  }`;
  popupEndGameText.insertAdjacentElement("afterend", newParagraph);
  popupEndGameLink.href = "./index.html";
  popupEndGame.classList.add("active-popupEndGame");
  wrapper.classList.add("inactive-wrapper");
};

popupEndGameLink.addEventListener("click", () => {
  popupEndGame.classList.remove("active-popupEndGame");
  wrapper.classList.remove("inactive-wrapper");
});
//

//функция для перезаписи скиллов

//Смена вопроса

const sliderBtn = document.querySelector(".slider__btn");

sliderBtn.addEventListener("click", () => {
  countQeuestion += 1;
  rerecordAnswers(answers, countQeuestion);
  checkAnswer();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sliderBtn.classList.add("active__alider-btn");
    setTimeout(() => {
      sliderBtn.classList.remove("active__alider-btn");
    }, 300);
    countQeuestion += 1;
    rerecordAnswers(answers, countQeuestion);
    checkAnswer();
  }
});

let countQeuestion = 0;
let counterСorrectАnswers = 0;
const sliderText = document.querySelector(".slider__text");

const rerecordAnswers = (answers, countQeuestion) => {
  sliderText.textContent = answers[countQeuestion][0];
};

rerecordAnswers(answers, countQeuestion);

const sliderInput = document.querySelector(".slider__input");

const checkAnswer = () => {
  if (sliderInput.value === answers[countQeuestion - 1][1]) {
    playSoundRight();
    counterСorrectАnswers += 1;
  } else {
    getСorrectAnswer(countQeuestion);
    showCorrectAnswer();
    playSoundEroro();
    delheart();
  }
  if (counterСorrectАnswers === 6) {
    stopPlaySoundMain();
    showYouWin(userName);
  }
  sliderInput.value = "";
};

//попап Исправления
const popupCorrectionText = document.querySelector(".popup-correction__text");
const popupCorrection = document.querySelector(".popup-correction");

const getСorrectAnswer = (countQeuestion) => {
  popupCorrectionText.textContent = `Правильная руна: ${
    answers[countQeuestion - 1][1]
  }`;
};

const showCorrectAnswer = () => {
  popupCorrection.classList.add("departure-popup-correction");
  setTimeout(() => {
    popupCorrection.classList.remove("departure-popup-correction");
  }, 3000);
};

let counterClue = 3;
const sliderClue = document.querySelector(".slider_clue");
const sliderClueCounter = document.querySelector(".slider_clue-counter");

sliderClue.addEventListener("click", () => {
  console.log(counterClue);
  if (counterClue > 0) {
    counterClue -= 1;
    sliderClueCounter.textContent = `Подсказка: ${counterClue}`;
    popupCorrectionText.textContent = `Правильная руна: ${answers[countQeuestion][1]}`;
    showCorrectAnswer();
  }
});

//

//music
const soundMain = document.querySelector(".sound-main");
function playSoundMain() {
  soundMain.volume = 0.3;
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

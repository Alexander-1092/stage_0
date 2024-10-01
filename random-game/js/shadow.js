import { answerShadow } from "./answers.js";

const userName = JSON.parse(localStorage.getItem("userName")).userName;
const gameItemsBoxHeart = document.querySelector(".gameItems__box-heart");
const gameItemsIconSkills = document.querySelectorAll(
  ".gameItems__icon_skills"
);
//функция для перезаписи скиллов
const addSkillLocalStorage = () => {
  let data = JSON.parse(localStorage.getItem("skills"));
  data.push("shadow");
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
    stopPlaySoundError();
    stopPlaySoundMain();
    playSoundLoose();
    showYouLoose(userName);
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
  popupStartTitle.innerHTML = `<h2 class="popupStart__title">Добро пожаловать, ${userName}!</h2>`;
};

//закрыть попап приветствия
popupStartBtn.addEventListener("click", () => {
  popupStart.classList.add("inactive-popupStart");
  body.classList.add("active-body");
  timerStart();
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
  popupEndGameText.innerHTML = `<p class='popupEndGame__text'>Поздравляю ${userName}! Вы смогли выйти из комнаты теней, и обрести знания. Теперь вы архивариус тегов</p>`;
  popupEndGame.classList.add("active-popupEndGame");
  wrapper.classList.add("inactive-wrapper");
  addSkillLocalStorage();
};

const showYouLoose = (userName) => {
  popupEndGameText.innerHTML = `<p class='popupEndGame__text'> ${userName}, вы покинули этот мир, и стали частью мира теней.</p>`;
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

//Присвоить кнопкам ответы
const playingFieldBtn = document.querySelectorAll(".playing-field__btn");

const distributeAnswer = (answerArray) => {
  for (let index = 0; index < playingFieldBtn.length; index++) {
    playingFieldBtn[index].textContent = answerArray[index][1];
  }
};

const answerForBtn = Object.entries(answerShadow);
let answerArray = Object.entries(answerShadow);

//перемешиваем массив вопросов
const mixArray = (answers) => {
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
};
mixArray(answerArray);
mixArray(answerForBtn);
distributeAnswer(answerForBtn);
//

//Создаем таймер
const playingFieldTimer = document.querySelector(".playing-field__timer");
let timer = 180;
let cuinterTime;
const timerStart = () => {
  cuinterTime = setInterval(() => {
    if (Math.round(timer % 60) < 10) {
      playingFieldTimer.textContent = `${Math.round(
        timer / 60
      )} : 0${Math.round(timer % 60)}`;
    } else {
      playingFieldTimer.textContent = `${Math.round(timer / 60)} : ${Math.round(
        timer % 60
      )}`;
    }
    if (timer === 0) {
      stopPlaySoundError();
      stopPlaySoundMain();
      playSoundLoose();
      showYouLoose(userName);
    }
    timer -= 1;
  }, 1000);
  setTimeout(() => {
    clearInterval(cuinterTime);
  }, 181000);
};
//

const playingFieldAnswer = document.querySelector(".playing-field__Answer");
let counterQuestion = 0;
let clickBtn = 0;

playingFieldAnswer.addEventListener("click", (e) => {
  clickBtn += 1;
  if (clickBtn === 14) {
    clearInterval(cuinterTime);
    stopPlaySoundError();
    stopPlaySoundMain();
    playSoundWin();
    showYouWin(userName);
  } else {
    if (e.target.className === "playing-field__btn") {
      counterQuestion += 1;
      checkAnswer(e.target, answerShadow);
      changeQuestion(answerArray, counterQuestion);
    }
  }
});

const playingFieldQuestionText = document.querySelector(
  ".playing-field__Question-text"
);
//проверка ответа
const checkAnswer = (answer, answerShadow) => {
  let question = playingFieldQuestionText.textContent;
  if (answerShadow[question] === answer.textContent) {
    playSoundRight();
    answer.classList.add("playing-field__btn-right");
  } else {
    playSoundEroro();
    delheart();
    showRightAnswer(question, answerShadow);
  }
};

//смена вопроса
const changeQuestion = (answerArray, counterQuestion) => {
  playingFieldQuestionText.textContent = answerArray[counterQuestion][0];
};

changeQuestion(answerArray, counterQuestion);
//показать правильный ответ
const showRightAnswer = (question, answerShadow) => {
  playingFieldBtn.forEach((element) => {
    if (answerShadow[question] === element.textContent) {
      element.classList.add("playing-field__btn-erorr");
    }
  });
};

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
function stopPlaySoundError() {
  soundError.pause();
  soundError.currentTime = 0;
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

import { answerSky } from "./answers.js";

const userName = JSON.parse(localStorage.getItem("userName")).userName;
const gameItemsBoxHeart = document.querySelector(".gameItems__box-heart");
const gameItemsIconSkills = document.querySelectorAll(
  ".gameItems__icon_skills"
);
//функция для перезаписи скиллов
const addSkillLocalStorage = () => {
  let data = JSON.parse(localStorage.getItem("skills"));
  data.push("sky");
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
const delheart = (heart) => {
  let counterHeart = localStorage.getItem("counterHeart");
  restarHeart(counterHeart);
  localStorage.setItem("counterHeart", JSON.stringify(counterHeart - heart));
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

const popupStartText = document.querySelector(".popupStart__text");
//закрыть попап приветствия
popupStartBtn.addEventListener("click", () => {
  if (popupStartBtn.textContent === "Начать") {
    popupStart.classList.add("inactive-popupStart");
    body.classList.add("active-body");
  } else {
    popupStartBtn.textContent = "Начать";
    popupStartText.textContent =
      "Сыграем в игру. Тебе дана колода карт, у каждой карты есть три свойства жизнь (Ж), атака (А), лечение (Л). Выбери любую карту, и если правильно ответишь на вопрос существа, то оно станет биться за тебя. Обрати внимание, если атака существа больше его жизней, то оставшийся урон понесет игрок. Чтобы победить меня ты должен разбить все мои сердца, либо использовать все карты в колоды. Ты готов?";
  }
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
  stopPlaySoundMain();
  popupEndGameText.innerHTML = `<p class='popupEndGame__text'>Поздравляю ${userName}! Вы получили достижение - Бог Гитхаба</p>`;
  popupEndGame.classList.add("active-popupEndGame");
  wrapper.classList.add("inactive-wrapper");
  addSkillLocalStorage();
};

const showYouLoose = (userName) => {
  stopPlaySoundMain();
  popupEndGameText.innerHTML = `<p class='popupEndGame__text'> ${userName} вас скинули с высот Града, и вы разбились насмерть.</p>`;
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

//Раскидываем вопросы и скиллы
const arrAnswerSky = Object.entries(answerSky);

const cardQuestion = document.querySelectorAll(".card__question");
const cardHeart = document.querySelectorAll(".card__heart");
const cardAttack = document.querySelectorAll(".card__attack");
const cardHealing = document.querySelectorAll(".card__healing");

const addQuestion = (cardQuestion, arrAnswerSky) => {
  for (let index = 0; index < cardQuestion.length; index++) {
    cardQuestion[index].textContent = arrAnswerSky[index][0];
    cardHeart[index].textContent = arrAnswerSky[index][1][1];
    cardAttack[index].textContent = arrAnswerSky[index][1][2];
    cardHealing[index].textContent = arrAnswerSky[index][1][3];
  }
};

addQuestion(cardQuestion, arrAnswerSky);
//

const playingFieldUser = document.querySelector(".playing-Field__user");
const playingFieldCard = document.querySelectorAll(".playing-Field__card");

playingFieldUser.addEventListener("click", (e) => {
  getAnswer(e);
  showQuestion(e);
});

let answer = "";
let question = "";

const showQuestion = (e) => {
  if (
    e.target.className === "card__btn" &&
    e.target.textContent === "Выбрать"
  ) {
    e.target.textContent = "Ответить";
    question = e.target.parentNode.childNodes[3].textContent;
    e.target.parentNode.childNodes[3].classList.add("card__question-active");
    e.target.parentNode.classList.add("playing-Field__card-active");
    disableСards();
  }
};

let counterMove = -1;
//Получить ответ
const getAnswer = (e) => {
  if (
    e.target.className === "card__btn" &&
    e.target.textContent === "Ответить"
  ) {
    counterMove += 1;
    answer = e.target.parentNode.childNodes[5];
    checkAnswer(answer, question);
    e.target.parentNode.classList.add("playing-Field__card-permoment-inactive");
    showCardEnemy(arrAnswerSky, counterMove);
    playingFieldBtnGame.classList.remove("playing-Field__btn-game-inactive");
  }
};
//

//Проверка ответа
const checkAnswer = (answer, question) => {
  if (answer.value === answerSky[question][0]) {
    changeSkillCard(answerSky, question);
    playSoundRight();
  } else {
    answer.value = answerSky[question][0];
    playSoundEroro();
  }
};
//

//Меняем данные карты боя
const cardSkillUser = document.querySelectorAll(".card__skill-user");
const cardImgUser = document.querySelector(".card__img-user");

const changeSkillCard = (answerSky, question) => {
  cardSkillUser[0].textContent = answerSky[question][1];
  cardSkillUser[1].textContent = answerSky[question][2];
  cardSkillUser[2].textContent = answerSky[question][3];
  cardImgUser.src = answerSky[question][4];
};
//

//вырубаем лишние карты
const disableСards = () => {
  playingFieldCard.forEach((element) => {
    if (element.className === "playing-Field__card")
      element.classList.add("playing-Field__card-inactive");
  });
};
//

//Показываем карту противника
const mixArray = (arrAnswerSky) => {
  for (let i = arrAnswerSky.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrAnswerSky[i], arrAnswerSky[j]] = [arrAnswerSky[j], arrAnswerSky[i]];
  }
  return arrAnswerSky;
};

mixArray(arrAnswerSky);

const cardImgEnemy = document.querySelector(".card__img-enemy");
const cardSkillEnemy = document.querySelectorAll(".card__skill-enemy");
const showCardEnemy = (arrAnswerSky, counterMove) => {
  cardSkillEnemy[0].textContent = arrAnswerSky[counterMove][1][1];
  cardSkillEnemy[1].textContent = arrAnswerSky[counterMove][1][2];
  cardSkillEnemy[2].textContent = arrAnswerSky[counterMove][1][3];
  cardImgEnemy.src = arrAnswerSky[counterMove][1][4];
};
//

//Начать бой
const playingFieldBtnGame = document.querySelector(".playing-Field__btn-game");

playingFieldBtnGame.addEventListener("click", () => {
  playSoundFlight();
  if (cardSkillEnemy[0].textContent != 0) {
    startFight();
  }
  removeInactive();
  if (counterMove === 10) {
    playSoundWin();
    showYouWin(userName);
  }
});

let counterHeartEnemy = 7;

const startFight = () => {
  let damageEnemy =
    cardSkillEnemy[0].textContent - cardSkillUser[1].textContent;
  let damageUser = cardSkillUser[0].textContent - cardSkillEnemy[1].textContent;
  let therapyUser = cardSkillUser[2].textContent;
  let therapyEnemy = cardSkillEnemy[2].textContent;
  if (damageUser < 0) {
    delheart(Math.abs(damageUser));
  }

  if (damageEnemy < 0) {
    restarHeartEnemy(counterHeartEnemy);
    counterHeartEnemy = counterHeartEnemy - Math.abs(damageEnemy);
    createHeartEnemy(counterHeartEnemy);
  }
  playingFieldBtnGame.classList.add("playing-Field__btn-game-inactive");

  addHeartUser(therapyUser);
  addHearEnemy(therapyEnemy);

  if (localStorage.getItem("counterHeart") <= 0) {
    showYouLoose(userName);
    stopPlaySoundMain();
    playSoundLoose();
  }
  if (counterHeartEnemy <= 0) {
    stopPlaySoundMain();
    playSoundWin();
    showYouWin(userName);
  }

  removeOldCard();
};
//

//Лечим юзера
const addHeartUser = (therapyUser) => {
  let counterHeart = localStorage.getItem("counterHeart");
  let newHeartUser = Number(counterHeart) + Number(therapyUser);
  localStorage.setItem("counterHeart", JSON.stringify(newHeartUser));
  restarHeart(counterHeart);
  createHeart(newHeartUser);
};
//

//Лечим врага
const addHearEnemy = (therapyEnemy) => {
  restarHeartEnemy(counterHeartEnemy);
  counterHeartEnemy = Number(counterHeartEnemy) + Number(therapyEnemy);
  createHeartEnemy(counterHeartEnemy);
};
//

//Удалить-создать жизни врага
const playingFieldBoxHeartEnemy = document.querySelector(
  ".playing-Field__box-heart-enemy"
);

const createHeartEnemy = (counterHeartEnemy) => {
  for (let index = 0; index < counterHeartEnemy; index++) {
    playingFieldBoxHeartEnemy.insertAdjacentHTML(
      "afterbegin",
      "<img class='playing-Field-heart-enemy' src='./assets/img/general/240px-Heart.svg.png'alt='icon heart'>"
    );
  }
};

const restarHeartEnemy = (counterHeartEnemy) => {
  for (let index = 0; index < counterHeartEnemy; index++) {
    playingFieldBoxHeartEnemy.removeChild(
      playingFieldBoxHeartEnemy.children[0]
    );
  }
};

createHeartEnemy(counterHeartEnemy);
//

//снять деактивацию с карт
const removeInactive = () => {
  playingFieldCard.forEach((element) => {
    element.classList.remove("playing-Field__card-inactive");
  });
};

//

//Обнулить картинкуи скиллы сыгранных карт
const removeOldCard = () => {
  cardImgUser.src = "./assets/svg/sky/null.svg";
  cardImgEnemy.src = "./assets/svg/sky/null.svg";
  cardSkillUser[0].textContent = 0;
  cardSkillUser[1].textContent = 0;
  cardSkillUser[2].textContent = 0;
  cardSkillEnemy[0].textContent = 0;
  cardSkillEnemy[1].textContent = 0;
  cardSkillEnemy[2].textContent = 0;
};

//

//music
const soundMain = document.querySelector(".sound-main");
function playSoundMain() {
  soundMain.currentTime = 0;
  soundMain.play();
}

function stopPlaySoundMain() {
  soundMain.pause();
  soundMain.currentTime = 0;
}
// playSoundMain();
const soundError = document.querySelector(".sound-error");

function playSoundEroro() {
  soundError.currentTime = 0;
  soundError.play();
}

const soundFlight = document.querySelector(".sound-flight");

function playSoundFlight() {
  soundFlight.currentTime = 0;
  soundFlight.play();
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

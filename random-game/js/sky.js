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
const delheart = () => {
  let counterHeart = localStorage.getItem("counterHeart");
  restarHeart(counterHeart);
  localStorage.setItem("counterHeart", JSON.stringify(counterHeart - 1));
  if (counterHeart == 1) {
    // stopPlaySoundMain();
    showYouLoose(userName);
    // playSoundLoose();
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
    answer = e.target.parentNode.childNodes[5].value;
    checkAnswer(answer, question);
    e.target.parentNode.classList.add("playing-Field__card-permoment-inactive");
    showCardEnemy(arrAnswerSky, counterMove);
  }
};
//

//Проверка ответа
const checkAnswer = (answer, question) => {
  console.log(answerSky[question][0]);
  if (answer === answerSky[question][0]) {
    changeSkillCard(answerSky, question);
    console.log("yes");
  } else {
    console.log("No");
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
  if (cardSkillEnemy[0].textContent != 0) {
    startFight();
  }
});

const startFight = () => {
  let damageEnemy =
    cardSkillUser[1].textContent - cardSkillEnemy[0].textContent;
  let damageUser = cardSkillEnemy[1].textContent - cardSkillUser[0].textContent;
};
//

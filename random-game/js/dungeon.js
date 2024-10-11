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
const userName = JSON.parse(localStorage.getItem("userName")).userName;

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

let correctAnswers = 0;
const numberOfCardPairs = 10;

const compareAnswers = (oneAnswer, twoAnswer) => {
  if (answer[oneAnswer] === twoAnswer) {
    correctAnswers += 1;
    playSoundRight();
  } else if (answer[twoAnswer] === oneAnswer) {
    correctAnswers += 1;
    playSoundRight();
  } else {
    linkActiveTag.classList.remove("active-game-field__card");
    linkActiveTagTwo.classList.remove("active-game-field__card");
    playSoundEroro();

    delheart();
  }

  if (correctAnswers == numberOfCardPairs) {
    stopPlaySoundMain();
    addSkillLocalStorage();
    showYouWin(userName);
    playSoundWin();
  }
};

//функция для перезаписи скиллов
const addSkillLocalStorage = () => {
  let data = JSON.parse(localStorage.getItem("skills"));
  if (!data.includes("doungeon")) {
    data.push("doungeon");
    localStorage.setItem("skills", JSON.stringify(data));
  }
};
//

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

const restarHeart = (counterHeart) => {
  for (let index = 0; index < counterHeart; index++) {
    gameItemsBoxHeart.removeChild(gameItemsBoxHeart.children[0]);
  }
};

//popup

const popupEndGame = document.querySelector(".popupEndGame");
const popupEndGameText = document.querySelector(".popupEndGame__text");
const popupEndGameLink = document.querySelector(".popupEndGame__link");
const wrapper = document.querySelector(".wrapper");
const popupEndGameTitle = document.querySelector(".popupEndGame__title");

const showYouWin = (userName) => {
  popupEndGameText.innerHTML = `<p class='popupEndGame__text'>Поздравляю, ${userName}! Вы получили достижение - мастер темных мест</p>`;
  popupEndGame.classList.add("active-popupEndGame");
  wrapper.classList.add("inactive-wrapper");
};

const showYouLoose = (userName) => {
  popupEndGameText.innerHTML = `<p class='popupEndGame__text'>Авантюрист ${userName} погиб в темных тоннелях подземелья</p>`;
  popupEndGameTitle.innerHTML =
    "<h2 class='popupEndGame__title'>Вы проиграли!</h2>";
  popupEndGameLink.href = "./index.html";
  popupEndGame.classList.add("active-popupEndGame");
  wrapper.classList.add("inactive-wrapper");
};

popupEndGameLink.addEventListener("click", () => {
  popupEndGame.classList.remove("active-popupEndGame");
  wrapper.classList.remove("inactive-wrapper");
});

//music
const soundMain = document.querySelector(".sound-main");
function playSoundMain() {
  soundMain.volume = 0.3;
  soundMain.currentTime = 0;
  soundMain.play();
}

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

//popup start

const popupStart = document.querySelector(".popupStart");
const popupStartTitle = document.querySelector(".popupStart__title");
const popupStartBtn = document.querySelector(".popupStart__btn");
const body = document.querySelector(".body");

popupStartBtn.addEventListener("click", () => {});

const sayHelloUser = (userName) => {
  popupStartTitle.innerHTML = `<h2 class="popupStart__title">Привет, ${userName}!</h2>`;
};

popupStartBtn.addEventListener("click", () => {
  popupStart.classList.add("inactive-popupStart");
  body.classList.add("active-body");
});

sayHelloUser(userName);
playSoundMain();

const gameItemsIconSkills = document.querySelectorAll(
  ".gameItems__icon_skills"
);

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

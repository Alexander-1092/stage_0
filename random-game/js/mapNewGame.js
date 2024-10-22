const popupNewGameBtn = document.querySelector(".popup-NewGame__btn");
const popupNewGameNameUser = document.querySelector(".popup-NewGame__nameUser");
const wrapper = document.querySelector(".wrapper");
const popupNewGame = document.querySelector(".popup-NewGame");
const userName = {};

const checkPlayer = () => {
  if (localStorage.getItem("userName") !== null) {
    wrapper.classList.add("activ-wrapper");
    popupNewGame.classList.add("inactive-popup-NewGame");
  }
};

checkPlayer();
const regex = /^[a-zA-Zа-яА-ЯёЁ]{3,15}$/;
popupNewGameBtn.addEventListener("click", () => {
  if (regex.test(popupNewGameNameUser.value)) {
    removePopup(popupNewGameNameUser);
  } else {
    alert(
      "Имя должно содержать только буквенные символы и иметь длинну от 3 - 15 символов"
    );
  }
});

const removePopup = (popupNewGameNameUser) => {
  if (popupNewGameNameUser.value.length !== 0) {
    wrapper.classList.add("activ-wrapper");
    popupNewGame.classList.add("inactive-popup-NewGame");
    setNameUser(popupNewGameNameUser.value);
    localStorage.setItem("userName", JSON.stringify(userName));
  }
};

const setNameUser = (name) => {
  userName.userName = name;
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

const gameItemsIconSkills = document.querySelectorAll(
  ".gameItems__icon_skills"
);

const boxGamesTask = document.querySelectorAll(".box-games__task");

const showReceivedSkills = () => {
  let dataSkills = JSON.parse(localStorage.getItem("skills"));

  dataSkills.forEach((skill) => {
    if (skill === "noob") {
      gameItemsIconSkills[0].classList.add("active-gameItems__icon_skills");
    } else if (skill === "doungeon") {
      gameItemsIconSkills[1].classList.add("active-gameItems__icon_skills");
      boxGamesTask[0].classList.add("box-games__task-done");
    } else if (skill === "smithy") {
      gameItemsIconSkills[2].classList.add("active-gameItems__icon_skills");
      boxGamesTask[1].classList.add("box-games__task-done");
    } else if (skill === "labyrinth") {
      gameItemsIconSkills[3].classList.add("active-gameItems__icon_skills");
      boxGamesTask[2].classList.add("box-games__task-done");
    } else if (skill === "shadow") {
      gameItemsIconSkills[4].classList.add("active-gameItems__icon_skills");
      boxGamesTask[3].classList.add("box-games__task-done");
    } else if (skill === "sky") {
      gameItemsIconSkills[5].classList.add("active-gameItems__icon_skills");
      boxGamesTask[4].classList.add("box-games__task-done");
    }
  });
};

showReceivedSkills();

const mainAudio = document.querySelector(".main-audio");
function playSoundMain() {
  mainAudio.volume = 0.3;
  mainAudio.currentTime = 0;
  mainAudio.play();
}
playSoundMain();

function stopPlaySoundMain() {
  mainAudio.pause();
  mainAudio.currentTime = 0;
}

const finalAudio = document.querySelector(".final-audio");

const musicfinalAudio = () => {
  finalAudio.currentTime = 0;
  finalAudio.play;
};

//финальный поп ап
const popupFininalBtn = document.querySelector(".popup-fininal__btn");
let record = [];

popupFininalBtn.addEventListener("click", () => {
  setRecord();
  removeOldDataGame();
  window.location.href = "./record.html";
});

const setRecord = () => {
  let userName = JSON.parse(localStorage.getItem("userName")).userName;
  let heartUser = JSON.parse(localStorage.getItem("counterHeart"));
  let counterTask = JSON.parse(localStorage.getItem("skills")).length - 1;
  if (localStorage.getItem("record")) {
    record = JSON.parse(localStorage.getItem("record"));
    record.push([userName, heartUser, counterTask]);
    localStorage.setItem("record", JSON.stringify(record));
  } else {
    record.push([userName, heartUser, counterTask]);
    localStorage.setItem("record", JSON.stringify(record));
  }
};

const removeOldDataGame = () => {
  localStorage.removeItem("counterHeart");
  localStorage.removeItem("userName");
  localStorage.removeItem("skills");
};
//

//Активация финального поп апа
let counterSkills = JSON.parse(localStorage.getItem("skills"));
const popupFininal = document.querySelector(".popup-fininal");

const checkCounterSkills = () => {
  if (counterSkills.length === 6) {
    stopPlaySoundMain();
    musicfinalAudio();
    popupFininal.classList.add("popup-fininal__active");
  }
};

checkCounterSkills();

//включить отключить звук
const headerSound = document.querySelector(".header__sound");
headerSound.addEventListener("click", () => {
  headerSound.classList.toggle("header__sound-inactive");
  if (headerSound.className === "header__sound header__sound-inactive") {
    stopPlaySoundMain();
  } else {
    playSoundMain();
  }
});

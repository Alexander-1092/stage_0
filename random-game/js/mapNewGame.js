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

popupNewGameBtn.addEventListener("click", () => {
  removePopup(popupNewGameNameUser);
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

const mainAudio = document.querySelector(".main-audio");
function playSoundMain() {
  mainAudio.currentTime = 0;
  mainAudio.play();
}
playSoundMain();

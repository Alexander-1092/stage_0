const popupNewGameBtn = document.querySelector(".popup-NewGame__btn");
const popupNewGameNameUser = document.querySelector(".popup-NewGame__nameUser");
const wrapper = document.querySelector(".wrapper");
const popupNewGame = document.querySelector(".popup-NewGame");
const userName = {};

popupNewGameBtn.addEventListener("click", () => {
  removePopup(popupNewGameNameUser);
});

const removePopup = (popupNewGameNameUser) => {
  if (popupNewGameNameUser.value.length !== 0) {
    wrapper.classList.add("activ-wrapper");
    popupNewGame.classList.add("inactive-popup-NewGame");
    setNameUser(popupNewGameNameUser.value);
    localStorage.setItem(userName.userName, JSON.stringify(userName));
  }
};

const setNameUser = (name) => {
  userName.userName = name;
};

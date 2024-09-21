const navLinkNewGame = document.querySelector(".nav__link_newGame");
const navLinkContinue = document.querySelector(".nav__link_continue");

navLinkNewGame.addEventListener("click", () => {
  checkGame();
});

const checkContinue = () => {
  if (localStorage.getItem("userName") === null) {
    navLinkContinue.classList.add("block-nav__link");
  } else {
    navLinkContinue.classList.remove("block-nav__link");
  }
};

checkContinue();

const checkGame = () => {
  if (localStorage.getItem("userName") !== null) {
    localStorage.clear();
  }
};

const navLinkNewGame = document.querySelector(".nav__link_newGame");
const navLinkContinue = document.querySelector(".nav__link_continue");

navLinkNewGame.addEventListener("click", () => {
  checkGame();
  localStorage.setItem("counterHeart", JSON.stringify(6));
  localStorage.setItem("skills", JSON.stringify(["noob"]));
});

const checkContinue = () => {
  if (
    localStorage.getItem("userName") === null ||
    localStorage.getItem("counterHeart") <= 0
  ) {
    navLinkContinue.classList.add("block-nav__link");
  } else {
    navLinkContinue.classList.remove("block-nav__link");
  }
};

checkContinue();

const checkGame = () => {
  if (localStorage.getItem("userName") !== null) {
    localStorage.removeItem("counterHeart");
    localStorage.removeItem("userName");
    localStorage.removeItem("skills");
  }
};

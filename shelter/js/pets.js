const body = document.querySelector(".body");
const header = document.querySelector(".header");

const burger = document.querySelector(".burger");
const headerMenu = document.querySelector(".header__menu");
const headerList = document.querySelector(".header__list ");
const activeHeaderLink = document.querySelector(".active-header__link");
const activeHeaderItem = document.querySelector(".active-header__item");

const mainBlock = document.querySelector(".main");
const headerLogo = document.querySelector(".header__logo");

burger.addEventListener("click", () => {
  openCloseMenu();
});

const openCloseMenu = () => {
  body.classList.toggle("inactive-body");
  mainBlock.classList.toggle("active-filter");
  header.classList.toggle("filter-header");

  burger.classList.toggle("active-burger");
  headerMenu.classList.toggle("active-menu");
  headerList.classList.toggle("active-header__list");
  activeHeaderLink.classList.toggle("header__link--activ");
  activeHeaderItem.classList.toggle("active-header__item--active");
};

headerList.addEventListener("click", (e) => {
  if (e.target.className === "header__link") {
    openCloseMenu();
  }
});

window.addEventListener("click", (e) => {
  console.log(e.target.className.slice(0, 6));
  if (
    e.target.className.slice(0, 6) !== "header" &&
    e.target.className.slice(0, 6) !== "burger"
  ) {
    openCloseMenu();
  }
});

const burger = document.querySelector(".burger");
const headerMenu = document.querySelector(".header__menu");
const headerList = document.querySelector(".header__list ");
const activeHeaderLink = document.querySelector(".active-header__link");
const activeHeaderItem = document.querySelector(".active-header__item");

console.log(activeHeaderItem);

burger.addEventListener("click", () => {
  burger.classList.toggle("active-burger");

  headerMenu.classList.toggle("active-menu");

  headerList.classList.toggle("active-header__list");

  activeHeaderLink.classList.toggle("header__link--activ");

  activeHeaderItem.classList.toggle("active-header__item--active");
});

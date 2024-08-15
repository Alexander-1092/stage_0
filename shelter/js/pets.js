import { pets } from "./list-pets.js";

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

const wrapper = document.querySelector(".wrapper");

const sliderTrack = document.querySelector(".slider__track");

const popup = document.querySelector(".popup");
const popupTitle = document.querySelector(".popup__title");
const popupType = document.querySelector(".popup__type");
const popupBreed = document.querySelector(".popup__breed");
const popupImg = document.querySelector(".popup__img");
const popupDescription = document.querySelector(".popup__description");
const popupAge = document.querySelector(".popup__age");
const popupInoculations = document.querySelector(".popup__inoculations");
const popupDiseases = document.querySelector(".popup__diseases");
const popupParasites = document.querySelector(".popup__parasites");

let counterClickWin = 0;

sliderTrack.addEventListener("click", (e) => {
  activFilterWrapper();
  inactiveBody();

  showPopup(e);
  const namePet = showNamePet(e);
  console.log(namePet);
  changeCardPet(namePet);
  inactiveEventSlider();
});

const showPopup = (e) => {
  if (e.target.parentElement.className == "slider__slide") {
    popup.classList.add("active-popup");
  }
};

const showNamePet = (e) => {
  return e.target.parentElement.children[1].innerHTML;
};

const changeCardPet = (namePet) => {
  for (let index = 0; index < pets.length; index++) {
    if (pets[index].name === namePet) {
      popupTitle.innerHTML = namePet;
      popupType.innerHTML = `${pets[index].type} -`;
      popupBreed.innerHTML = pets[index].breed;
      popupImg.src = pets[index].img;
      popupDescription.innerHTML = pets[index].description;
      popupAge.innerHTML = pets[index].age;
      popupInoculations.innerHTML = pets[index].inoculations;
      popupDiseases.innerHTML = pets[index].diseases;
      popupParasites.innerHTML = pets[index].parasites;
    }
  }
};

const activFilterWrapper = () => {
  wrapper.classList.toggle("active-wrapper");
};

const inactiveBody = () => {
  body.classList.toggle("inactive-body");
};

const inactiveEventSlider = () => {
  sliderTrack.classList.toggle("inactive-slider__track");
};

window.addEventListener("click", (e) => {
  const parentsPopup = e.target.parentElement.parentElement.className;
  if (popup.className === "popup active-popup") {
    if (
      counterClickWin !== 0 &&
      parentsPopup !== "popup active-popup" &&
      parentsPopup !== "popup__info" &&
      parentsPopup !== "popup__body" &&
      parentsPopup !== "body inactive-body"
    ) {
      popup.classList.remove("active-popup");
      activFilterWrapper();
      inactiveBody();
      inactiveEventSlider();
      counterClickWin = 0;
    } else {
      counterClickWin += 1;
    }
  }
});

const popupCrossBox = document.querySelector(".popup__cross-box");

popupCrossBox.addEventListener("click", () => {
  popup.classList.remove("active-popup");
  activFilterWrapper();
  inactiveBody();
  inactiveEventSlider();
  counterClickWin = 0;
});

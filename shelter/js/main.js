import { pets } from "./list-pets.js";

const body = document.querySelector(".body");
const wrapper = document.querySelector(".wrapper");
const burger = document.querySelector(".burger");
const headerMenu = document.querySelector(".header__menu");
const headerList = document.querySelector(".header__list ");
const headerLink = document.querySelector(".header__link");
const mainBlock = document.querySelector(".main");
const headerLogo = document.querySelector(".header__logo");

burger.addEventListener("click", (e) => {
  openCloseMenu();
});

const openCloseMenu = () => {
  body.classList.toggle("inactive-body");
  mainBlock.classList.toggle("active-filter");
  headerLogo.classList.toggle("active-filter");
  

  burger.classList.toggle("active-burger");
  headerMenu.classList.toggle("active-menu");
  headerList.classList.toggle("active-header__list");
  headerLink.classList.toggle("active-header__link");
};

headerList.addEventListener("click", (e) => {
  if (e.target.className === "header__link") {
    openCloseMenu();
  }
});

const linkImgSlider = [
  ["./assets/index/img/pets-katrine.png", "katrine"],
  ["./assets/index/img/pets-jennifer.png", "Jennifer"],
  ["./assets/index/img/pets-woody.png", "Woody"],
  ["./assets/index/img/pets-charly.png", "Charly"],
  ["./assets/index/img/pets-fredd.png", "Freddie"],
  ["./assets/index/img/pets-scarlet.png", "Scarlett"],
  ["./assets/index/img/pets-timmy.png", "Timmy"],
  ["./assets/index/img/sophia.png", "Sophia"],
];

const sliderTrack = document.querySelector(".slider__track");
const sliderArrowPrev = document.querySelector(".slider__arrow-prev");
const sliderArrowNext = document.querySelector(".slider__arrow-next");

let counter = 0;
let counterClickNext = 0;
let counterClickPrev = 0;

const moveSliderTrack = (counter) => {
  sliderTrack.style.transform = `translateX(-${counter}px)`;
};

sliderArrowNext.addEventListener("click", (e) => {
  let widthSliderTrack = sliderTrack.offsetWidth;
  let gapSliderTrack = window.getComputedStyle(sliderTrack).gap;
  if (counter >= 1860 && gapSliderTrack != "90px") {
    counter = 0;
  } else if (gapSliderTrack == "90px" && counter >= 2160) {
    counter = 0;
  } else {
    counter =
      counter + (parseInt(widthSliderTrack, 10) + parseInt(gapSliderTrack, 10));
  }
  moveSliderTrack(counter);

  counterClickNext += 1;
  counterClickPrev = 0;
  if (counterClickNext % 2 === 0) {
    changePictureName();
  }
});

sliderArrowPrev.addEventListener("click", (e) => {
  let widthSliderTrack = sliderTrack.offsetWidth;
  let gapSliderTrack = window.getComputedStyle(sliderTrack).gap;
  if (counter === 0 && gapSliderTrack == "90px") {
    counter = 2160;
  } else if (counter === 0 && gapSliderTrack == "40px") {
    counter = 1860;
  } else if (counter === 0 && gapSliderTrack == "0px") {
    counter = 1890;
  } else {
    counter =
      counter - (parseInt(widthSliderTrack, 10) + parseInt(gapSliderTrack, 10));
  }
  moveSliderTrack(counter);

  counterClickPrev += 1;
  counterClickNext = 0;
  if (counterClickPrev % 2 === 0) {
    changePictureName();
  }
});

const sliderSlide = document.querySelectorAll(".slider__slide");

const randomNumber = () => {
  return Math.round(Number(Math.random() * 10));
};

const createListRandomEightNum = () => {
  let listRandomEightNum = [];
  while (listRandomEightNum.length <= 7) {
    let num = randomNumber();
    if (!listRandomEightNum.includes(num) && num <= 7) {
      listRandomEightNum.push(num);
    }
  }
  return listRandomEightNum;
};

const changePictureName = () => {
  const listRandomNum = createListRandomEightNum();
  for (let index = 0; index < sliderSlide.length; index++) {
    sliderSlide[index].children[0].src = linkImgSlider[listRandomNum[index]][0];
    sliderSlide[index].children[1].innerHTML =
      linkImgSlider[listRandomNum[index]][1];
  }
};

changePictureName();

window.addEventListener("resize", () => {
  counter = 0;
  moveSliderTrack(counter);
});

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
  if (e.target.parentElement.className == "slider__slide") {
    activFilterWrapper();
    inactiveBody();
    showPopup(e);
    const namePet = showNamePet(e);
    changeCardPet(namePet);
    inactiveEventSlider();
  }
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

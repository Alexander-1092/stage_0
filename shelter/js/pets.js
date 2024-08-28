import { pets } from "./list-pets.js";

const body = document.querySelector(".body");
const header = document.querySelector(".header");

const sliderTrack = document.querySelector(".slider__track");

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

const randomNumber = () => {
  return Math.round(Number(Math.random() * 10));
};

let counterGoodCardInMatrix = 0;

const createListNumRandomUniq = (numPages, numCard) => {
  let emptyArray = Array.from({ length: numPages }, () =>
    Array(numCard).fill("*")
  );
  let flag = false;
  let obj = {};
  emptyArray.forEach((arr) => {
    for (let index = 0; index < arr.length; index++) {
      flag = false;
      let stop = 0;

      while (flag != true) {
        let numRandom = randomNumber();

        if (
          numRandom <= 7 &&
          !arr.includes(numRandom) &&
          (obj[numRandom] === undefined || obj[numRandom] <= 5)
        ) {
          if (obj.hasOwnProperty(numRandom)) {
            obj[numRandom] = obj[numRandom] + 1;
          } else {
            obj[numRandom] = 1;
          }

          arr[index] = numRandom;
          flag = true;
          counterGoodCardInMatrix += 1;
        }

        stop += 1;
        if (stop > 1000) {
          break;
        }
      }
    }
  });
  return emptyArray;
};

let listMat = [];

const restartCreateListNumRandomUniq = (quantityPages, quantityCard) => {
  let stopWhile = 0;

  while (counterGoodCardInMatrix !== 48) {
    let listNum = createListNumRandomUniq(quantityPages, quantityCard);
    stopWhile += 1;
    if (stopWhile > 300) {
      break;
    } else if (counterGoodCardInMatrix === 48) {
      listMat = listNum;
      counterGoodCardInMatrix = 0;
      break;
    } else {
      counterGoodCardInMatrix = 0;
    }
  }
  return listMat;
};

let quantityPages = 1;
let counerQuantityPages = 1;
let numberOfcardsPerPage = 8;

const sliderPaginNum = document.querySelector(".slider__pagin-num");
const sliderPaginNext = document.querySelector(".slider__pagin-next");
const sliderPaginBack = document.querySelector(".slider__pagin-back");

let widthPage = window.innerWidth;

const setSliderParameters = () => {
  widthPage = window.innerWidth;
  counerQuantityPages = 1;
  if (widthPage > 949) {
    quantityPages = 6;
    numberOfcardsPerPage = 8;

    restartCreateListNumRandomUniq(quantityPages, numberOfcardsPerPage);
  } else if (widthPage > 599) {
    quantityPages = 8;
    numberOfcardsPerPage = 6;
    restartCreateListNumRandomUniq(quantityPages, numberOfcardsPerPage);
  } else if (widthPage < 600) {
    quantityPages = 16;
    numberOfcardsPerPage = 3;
    restartCreateListNumRandomUniq(quantityPages, numberOfcardsPerPage);
  }
};
setSliderParameters();

sliderPaginNext.addEventListener("click", () => {
  lockUnlockArrows();
  turnPageForward();
  activeInactivePaginBackBackPaginNextNext();
});

const lockUnlockArrows = () => {
  if (counerQuantityPages === quantityPages - 1) {
    sliderPaginNext.classList.add("slider__pag-inactive");
  }
  if (counerQuantityPages >= 1) {
    sliderPaginBack.classList.remove("slider__pag-inactive");
  }
};

const turnPageForward = () => {
  if (counerQuantityPages < quantityPages) {
    counerQuantityPages += 1;
    sliderPaginNum.innerHTML = counerQuantityPages;
    createSetCards();
  }
};

sliderPaginBack.addEventListener("click", () => {
  turnPageBack();
  lockUnlockArrowsBack();
  activeInactivePaginBackBackPaginNextNext();
});

const turnPageBack = () => {
  if (counerQuantityPages <= quantityPages && counerQuantityPages > 1) {
    counerQuantityPages -= 1;
    sliderPaginNum.innerHTML = counerQuantityPages;
    createSetCards();
  }
};

const lockUnlockArrowsBack = () => {
  if (counerQuantityPages < quantityPages) {
    sliderPaginNext.classList.remove("slider__pag-inactive");
  }
  if (counerQuantityPages <= 1) {
    sliderPaginBack.classList.add("slider__pag-inactive");
  }
};

const sliderPaginNextNext = document.querySelector(".slider__pagin-next-next");

sliderPaginNextNext.addEventListener("click", () => {
  counerQuantityPages = quantityPages;
  sliderPaginNum.innerHTML = counerQuantityPages;
  createSetCards();
  activeInactivePaginBackBackPaginNextNext();
});

const slider__paginBackBack = document.querySelector(
  ".slider__pagin-back-back"
);

slider__paginBackBack.addEventListener("click", () => {
  counerQuantityPages = 1;
  sliderPaginNum.innerHTML = counerQuantityPages;
  createSetCards();
  activeInactivePaginBackBackPaginNextNext();
});

const activeInactivePaginBackBackPaginNextNext = () => {
  if (counerQuantityPages > 1) {
    slider__paginBackBack.classList.remove("slider__pag-inactive");
    sliderPaginBack.classList.remove("slider__pag-inactive");
  } else if (counerQuantityPages <= 1) {
    slider__paginBackBack.classList.add("slider__pag-inactive");
    sliderPaginBack.classList.add("slider__pag-inactive");
  }

  if (counerQuantityPages === quantityPages) {
    sliderPaginNextNext.classList.add("slider__pag-inactive");
    sliderPaginNext.classList.add("slider__pag-inactive");
  } else if (counerQuantityPages < quantityPages) {
    sliderPaginNextNext.classList.remove("slider__pag-inactive");
    sliderPaginNext.classList.remove("slider__pag-inactive");
  }
};

window.addEventListener("resize", () => {
  setSliderParameters();
  sliderPaginNum.innerHTML = counerQuantityPages;
  createSetCards();
  lockUnlockArrows();
  lockUnlockArrowsBack();
  activeInactivePaginBackBackPaginNextNext();
});

const createSetCards = () => {
  for (let index = 0; index < numberOfcardsPerPage; index++) {
    sliderTrack.children[index].children[0].src =
      pets[listMat[counerQuantityPages - 1][index]].img;
    sliderTrack.children[index].children[1].innerHTML =
      pets[listMat[counerQuantityPages - 1][index]].name;
  }
};

createSetCards();

const wrapper = document.querySelector(".wrapper");

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
    sliderTrack.classList.add("slider__track-Inactive");
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
  sliderTrack.classList.remove("slider__track-Inactive");
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

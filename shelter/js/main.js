const body = document.querySelector(".body");
const burger = document.querySelector(".burger");
const headerMenu = document.querySelector(".header__menu");
const headerList = document.querySelector(".header__list ");
const headerLink = document.querySelector(".header__link");
const headerLinkActiv = document.querySelector(".header__link--activ");
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

// Доработать, закрывает меню если нажать вне его области
// window.addEventListener("click", (e) => {
//   if (
//     e.target.className.slice(0, 6) !== "header" &&
//     e.target.className.slice(0, 6) !== "burger"
//   ) {
//     openCloseMenu();
//   }
// });

const linkImgSlider = [
  "./assets/index/img/pets-katrine.png",
  "./assets/index/img/pets-jennifer.png",
  "./assets/index/img/pets-woody.png",
  "./assets/index/img/pets-charly.png",
  "./assets/index/img/pets-fredd.png",
  "./assets/index/img/pets-scarlet.png",
  "./assets/index/img/pets-timmy.png",
  "./assets/index/img/sophia.png",
];

const sliderTrack = document.querySelector(".slider__track");
const sliderArrowPrev = document.querySelector(".slider__arrow-prev");
const sliderArrowNext = document.querySelector(".slider__arrow-next");

let counter = 0;

const moveSliderTrack = (counter) => {
  sliderTrack.style.transform = `translateX(-${counter}px)`;
};

sliderArrowNext.addEventListener("click", (e) => {
  if (counter === 2090) {
    counter = 0;
  } else {
    counter += 1045;
  }
  moveSliderTrack(counter);
});

sliderArrowPrev.addEventListener("click", (e) => {
  if (counter === 0) {
    counter = 2090;
  } else {
    counter -= 1045;
  }
  moveSliderTrack(counter);
});

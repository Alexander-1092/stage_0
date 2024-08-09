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
  ["./assets/index/img/pets-katrine.png", "katrine"],
  ["./assets/index/img/pets-jennifer.png", "Jennifer"],
  ["./assets/index/img/pets-woody.png", "Woody"],
  ["./assets/index/img/pets-charly.png", "Charly"],
  ["./assets/index/img/pets-fredd.png", "Fredd"],
  ["./assets/index/img/pets-scarlet.png", "Scarlet"],
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
  console.log(window.getComputedStyle(sliderTrack).transform.slice(18, 24));
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

const sliderImg = document.querySelectorAll(".slider__img");

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

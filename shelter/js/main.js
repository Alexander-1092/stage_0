const main =
  "страница main: соответствует макету при ширине экрана 1280px: +14, 768px: +14, 320px: +14 ";

const pet =
  "Страница pet:  соответствует макету при ширине экрана 1280px: +6, 768px: +6, 320px: +6";

const total =
  "Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки + 20, \n Верстка резиновая +8, \n При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню, \n верстка валидна +8";

console.log(main);
console.log(pet);
console.log(total);
console.log("100/100");

const burger = document.querySelector(".burger");
const headerList = document.querySelector(".header__menu");

console.log(headerList);

burger.addEventListener("click", () => {
  headerList.classList.toggle("active-burger");
});

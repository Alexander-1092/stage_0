const main =
  "страница main: Проверка верстки +7, Вёрстка соответствует макету +35,Требования к css +6, Интерактивность элементов +12";

const pet =
  "Страница pet: Проверка верстки +7, Вёрстка соответствует макету +15, Требования к css +4, Интерактивность элементов +14";

console.log(main);
console.log(pet);
console.log("100/100");

const burger = document.querySelector(".burger");
const headerList = document.querySelector(".header__menu");

console.log(headerList);

burger.addEventListener("click", () => {
  headerList.classList.toggle("active-burger");
});

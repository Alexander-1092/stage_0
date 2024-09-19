const btn = document.querySelector(".btn");
const input = document.querySelector(".search");
const picBox = document.querySelector(".pic-box");
const mainPic = document.querySelector(".main-pic");
const showPic = document.querySelector(".show-pic");
const container = document.querySelector(".wrapper");
const picClose = document.querySelector(".pic-close");
const pseudoAlert = document.querySelector(".pseudo-alert");
const searchClose = document.querySelector(".search-close");
const alertBtn = document.querySelector(".alert-btn");

let searchWord = "winter";
input.focus();

async function GetPic() {
  const url = `https://api.unsplash.com/search/photos?query=${searchWord}&per_page=15&client_id=72YsZodqxI066gf9KEkK1SvHu0octTY8emwT7WdnrCo`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.total == 0 && input.value.length > 0) {
      showAlert();
    } else {
      for (let index = 0; index < 15; index++) {
        let link = String(data.results[index].urls.regular);
        document.querySelectorAll(".pic")[index].src = link;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

btn.addEventListener("click", () => {
  searchWord = input.value;
  GetPic();
});

for (let index = 0; index < 15; index++) {
  let photo = document.createElement("a");
  photo.innerHTML = `<img src="" alt="pic" class="pic">`;
  picBox.appendChild(photo);
}

picBox.addEventListener("click", (event) => {
  mainPic.src = event.target.src;
  container.classList.add("wrapper-inactive");
  showPic.classList.add("show-pic-active");
  mainPic.classList.add("main-pic-active");
  picClose.classList.add("pic-close-active");
});

picClose.addEventListener("click", (e) => {
  container.classList.remove("wrapper-inactive");
  showPic.classList.remove("show-pic-active");
  mainPic.classList.remove("main-pic-active");
  picClose.classList.remove("pic-close-active");
  mainPic.src = "";
});

function showAlert() {
  pseudoAlert.classList.add("pseudo-alert-active");
  container.classList.add("wrapper-inactive");
}

searchClose.addEventListener("click", () => {
  input.value = "";
});

document.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    searchWord = input.value;
    GetPic();
  }
});

alertBtn.addEventListener("click", () => {
  pseudoAlert.classList.remove("pseudo-alert-active");
  container.classList.remove("wrapper-inactive");
});

window.addEventListener("load", () => {
  GetPic();
});

const soundMain = document.querySelector(".sound-main");

const playSoundMain = () => {
  soundMain.currentTime = 0;
  soundMain.volume = 0.2;
  soundMain.play();
};
playSoundMain();

//включить отключить звук
const headerSound = document.querySelector(".header__sound");
headerSound.addEventListener("click", () => {
  headerSound.classList.toggle("header__sound-inactive");
  if (headerSound.className === "header__sound header__sound-inactive") {
    stopPlaySoundMain();
  } else {
    playSoundMain();
  }
});

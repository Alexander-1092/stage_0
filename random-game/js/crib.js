const soundMain = document.querySelector(".sound-main");

const playSoundMain = () => {
  soundMain.currentTime = 0;
  soundMain.volume = 0.2;
  soundMain.play();
};
playSoundMain();

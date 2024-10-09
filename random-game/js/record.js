const recordList = JSON.parse(localStorage.getItem("record"));

const tableNameHeroes = document.querySelectorAll(".table__name-heroes");
const tableNameHeart = document.querySelectorAll(".table__name-heart");

const checkLenghtRecordList = (recordList) => {
  if (recordList.length <= 10) {
    showTablRecord(recordList);
  } else {
    showTablRecord(recordList.slice(0, 10));
  }
};

const showTablRecord = (recordList) => {
  for (let index = 0; index < recordList.length; index++) {
    tableNameHeroes[index].textContent = recordList[index][0];
    tableNameHeart[index].textContent = recordList[index][1];
  }
};

if (recordList) {
  recordList.sort((a, b) => b[1] - a[1]);
  checkLenghtRecordList(recordList);
}

const mainMusic = document.querySelector(".main-music");

const PlayMainMusic = () => {
  mainMusic.currentTime = 0;
  mainMusic.play();
};
PlayMainMusic();

const recordList = JSON.parse(localStorage.getItem("record"));

const tableNameHeroes = document.querySelectorAll(".table__name-heroes");
const tableNameHeart = document.querySelectorAll(".table__name-heart");
const tableSkills = document.querySelectorAll(".table__skills");

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
    tableSkills[index].textContent = recordList[index][2];
  }
};

if (recordList) {
  recordList.sort((a, b) => {
    if (a[1] > 0) {
      console.log(a[1]);
      return b[1] - a[1];
    } else {
      return b[2] - a[2];
    }
  });
  checkLenghtRecordList(recordList);
}

const mainMusic = document.querySelector(".main-music");

const PlayMainMusic = () => {
  mainMusic.volume = 0.3;
  mainMusic.currentTime = 0;
  mainMusic.play();
};
PlayMainMusic();

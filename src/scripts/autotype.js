const dataset = ["Hi, and welcome to my portfolio site.", "I'm software developer enthusiast.", "Always eager to learn about new technologies and paradigms."];

let datasetIndex = 0;
let data;
const pause = 1400;
const addTime = 120;
const removeTime = 55;
let letterIndex = 0;
let currentInterval;

function textRotation() {
  if (datasetIndex === dataset.length) {
    datasetIndex = 0;
  }

  data = dataset[datasetIndex];
  letterIndex = 0;
  const autoType = document.getElementById("autoType");
  if (!autoType) return;
  autoType.textContent = "";
  currentInterval = setInterval(addLetter, addTime);
}

function addLetter() {
  const autoType = document.getElementById("autoType");
  if (!autoType) return;
  autoType.textContent += data.charAt(letterIndex);
  letterIndex += 1;

  if (letterIndex > data.length) {
    autoType.className = "caretAnimation";
    clearInterval(currentInterval);
    setTimeout(startRemove, pause);
  }
}

function startRemove() {
  currentInterval = setInterval(removeLetter, removeTime);
}

function removeLetter() {
  const autoType = document.getElementById("autoType");
  if (!autoType) return;
  const currentString = autoType.textContent;
  autoType.textContent = currentString.slice(0, -1);

  if (currentString.length < 1) {
    clearInterval(currentInterval);
    datasetIndex += 1;
    textRotation();
  }
}

window.addEventListener('load', function () {
  setTimeout(textRotation, 500);
});

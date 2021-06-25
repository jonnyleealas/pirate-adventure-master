'use strict';

var loadSaveButton = document.getElementById('revert');

function showEnding () {
  var getNarrative = localStorage.getItem('endNarrative');
  var narrative = JSON.parse(getNarrative);
  console.log(narrative);
  var parentElement = document.getElementById('sec3');
  var narrativeBox = document.createElement('p');
  narrativeBox.textContent = narrative;
  parentElement.appendChild(narrativeBox);
}


function loadSaved() {
  if (localStorage.getItem('character') !== null) {
    var saveTrigger = true;
    var stringiedSaveTrigger = JSON.stringify(saveTrigger);
    localStorage.setItem('saveTrigger', stringiedSaveTrigger);
    window.location.href = 'game.html';
  }
}
loadSaveButton.addEventListener('click', loadSaved);

showEnding();

'use strict';

function showEnding () {
  var getNarrative = localStorage.getItem('endNarrative');
  var narrative = JSON.parse(getNarrative);
  console.log(narrative);
  var parentElement = document.getElementById('sec3');
  var narrativeBox = document.createElement('p');
  narrativeBox.textContent = narrative;
  parentElement.appendChild(narrativeBox);
}

showEnding();

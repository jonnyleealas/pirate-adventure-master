'use strict';


var imageName;
var userName;


function getUserName(event) {
  event.preventDefault();
  localStorage.clear();
  userName = document.getElementById('userName').value;
  console.log(userName);
  var stringifiedUserName = JSON.stringify(userName);
  localStorage.setItem('userName', stringifiedUserName);
  characterImage();
}

function characterImage() {
  if (document.getElementById('fighter').checked) {
    imageName = 'fighter';
    console.log(imageName);
  }
  if (document.getElementById('funGuy').checked) {
    imageName = 'funGuy';
    console.log(imageName);
  }
  if (document.getElementById('smartGuy').checked) {
    imageName = 'smartGuy';
    console.log(imageName);
  }
  var stringifiedImageName = JSON.stringify(imageName);
  localStorage.setItem('imageName', stringifiedImageName);
  startGame();
}
function startGame() {
  window.location.href = 'game.html';
}

var loginForm = document.getElementById('form');
if (loginForm !== null) {
  loginForm.addEventListener('submit', getUserName);
}





/* Set the width of the side navigation to 250px */
// this is called in index.htlm
function openNav() {
  document.getElementById('mySidenav').style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById('mySidenav').style.width = "0";
}
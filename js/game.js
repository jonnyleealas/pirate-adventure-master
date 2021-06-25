'use strict';

var rum = 200;
var money = 200;
var cardStackArray = [];
var characterStats = [];
var currentIndex;
var userName;
var imageName;

var choiceElement = document.getElementById('choice');
choiceElement.addEventListener('click', pickCards);
var narrativeElement = document.getElementById('narrative-text');

function Character(userName, fightingAbility, pirateSpirit, intelligence, rum, money) {
  this.userName = userName;
  this.fightingAbility = fightingAbility;
  this.pirateSpirit = pirateSpirit;
  this.intelligence = intelligence;
  this.rum = rum;
  this.money = money;
  characterStats.push(this);
}


function getUserAndImageFromStorage() {
  if (localStorage.getItem('userName') !== null) {
    var storeUserName = localStorage.getItem('userName');
    userName = JSON.parse(storeUserName);
    var storeImageName = localStorage.getItem('imageName');
    imageName = JSON.parse(storeImageName);
  }
  var nameParent = document.getElementById('username');
  nameParent.textContent = `Ahoy there ${userName}!`;

  var imageParent = document.getElementById('pic1');
  var newImage = document.createElement('img');
  newImage.id='pic';
  if (imageName === 'fighter') {
    new Character(userName, 15, 10, 5, rum, money);
    newImage.src='img/toughGuy.png';
    imageParent.appendChild(newImage);
  }
  if (imageName === 'smartGuy') {
    new Character(userName, 5, 10, 15, rum, money);
    newImage.src='img/smartGuy.png';
    imageParent.appendChild(newImage);
  }
  if (imageName === 'funGuy') {
    new Character(userName, 5, 20, 5, rum, money);
    newImage.src='img/funGuy.png';
    imageParent.appendChild(newImage);
  }

}

function Cards(cardName, text, rumChange, moneyChange, helpingAbility, rumOrMoney, choiceOne, choiceTwo, narrative) {
  this.cardName = cardName;
  this.text = text;
  this.rumChange = rumChange;
  this.moneyChange = moneyChange;
  this.helpingAbility = helpingAbility;
  this.rumOrMoney = rumOrMoney;
  this.choiceOne = choiceOne;
  this.choiceTwo = choiceTwo;
  this.narrative = narrative;
  cardStackArray.push(this);
}

Cards.prototype.changeStats = function () {
  characterStats[0].rum += this.rumChange;
  if (characterStats[0].rum > 200) {
    characterStats[0].rum = 200;
  }
  if (this.choiceTwo === 'loseEnding') {
    var stringifiedNarrative = JSON.stringify(this.narrative);
    localStorage.setItem('endNarrative', stringifiedNarrative);
    window.location.href = 'lose.html';
  }
  if (characterStats[0].rum <= 0) {
    window.location.href = 'lose.html';
  }
  characterStats[0].money += this.moneyChange;
  // Make a random number based on how strong their helping ability is, then if they have a helping ability higher than 10, they get a bonus.
  var helpAmount = this.helpingAbility;
  var randomAbilityHelp = randomNumber(6, characterStats[0][helpAmount]);
  if (characterStats[0][this.rumOrMoney] >= 10) { // math.rondom()
    characterStats[0][this.rumOrMoney] += randomAbilityHelp;
  }
  if (this.choiceTwo === 'mainEnding'){
    stringifiedNarrative = JSON.stringify(this.narrative);
    localStorage.setItem('endNarrative', stringifiedNarrative);
    window.location.href = 'win.html';
  }

  var parentElement = document.getElementById('changingStats');
  parentElement.textContent = ('');
  var healthLi = document.createElement('li');
  healthLi.textContent = `Rum: ${characterStats[0].rum}`;
  var moneyLi = document.createElement('li');
  moneyLi.textContent = `Booty: ${characterStats[0].money}`;
  parentElement.appendChild(healthLi);
  parentElement.appendChild(moneyLi);
};

var parentElement = document.getElementsByTagName('body');
Cards.prototype.appendElement = function (parent = parentElement, childType) {
  var child = document.createElement(childType);
  child.id = this.cardName;
  child.textContent = this.text;
  parent.appendChild(child);
};
Cards.prototype.appendNarrative = function (parent, childType) {
  var child = document.createElement(childType);
  child.id = this.cardName;
  child.textContent = this.narrative;
  parent.appendChild(child);
};

function makeCards() {
  // BAHAMAS ROUTE
  new Cards('beginOne', 'Go to the Bahamas', 0, 0, '', '', 'continue', 'stop', 'You decide to set off towards the sandy beaches of the Bahamas. You pass a well known pirate island on the way. Your crew begs you to stop.');

  new Cards('continue', 'Continue on, we don\'t have time to stop!', 50, 0, 'intelligence', 'rum', 'order', 'who-cares', 'You continue on straight towards your destination. You make a lot of progress and your crew seems to be feeling well as you all enjoy some rum, you see a abandoned barrel in the water.');

  new Cards('order', 'Order a crew member to fish it out of the sea!', 0, 200, 'intelligence', 'money', 'stop', 'straight-on', 'The barrel is full of treasure and you gain some Booty! The crew urges you to go back to spend the money on Pirate Island. You don\'t think that is wise, but are tempted.');

  new Cards('who-cares', 'Who cares about an old barrel! It\'s probably just some garbage', -50, 0, 'fightingAbility', 'rum', 'tell-stop', 'worry-later', 'A crew member jokingly shoots the barrel with her pistol and the whole crew watches in shock as the glimmer of treasure shines through the bullet hole. The barrel takes in water and sink. The pirates roar in anger and a brawl breaks out causing you to lose sober up and lose some rum.Out of the corner of your eye you notice that your destination is close.');

  // GAME OVER
  new Cards('worry-later', ' I\'ll worry about it after I finish beating this scallywag!', -200, 0, '', '', '', 'loseEnding', 'You get so engrossed in the wonderful pirate brawl that you sail right past the Bahamas. As the brawl continues you don\'t notice the British Naval ship coming towards you! They catch you and your crew and sentence you to hanging for all of your terrible pirate crimes! Game Over!');

  new Cards('tell-stop', 'Tell the crew to stop their nonsense and land in the Bahamas.', 0, -100, 'intelligence', 'money', 'treasure', 'against', 'You and your crew make it to the Bahamas. You are able to get all the supplies you need to keep sailing in the world but have spent a lot of your booty. You decide to stay the night in Nassau and one of your crew members remembers hearing of a hidden treasure on this island. This  treasure is the lost treasure of Blackbeard. The famous explorer that rumoredly found the holy grail. He tells you that if you guys find this you will be set for life. You have doubts about this treasure existing or not, but you need to prove yourself after the barrel mishap from earlier…');

  // Stop at Pirate Island
  new Cards('stop', 'Stop and relax for a bit your crew could use some fun!', -25, -50, 'pirateSpirit', 'rum', 'straight-on', 'bahamasShortcut', 'You and your crew wake up groggy, heads pounding, and smelling rather foul. You have lost some rum and definitely some booty. Now you are behind and the British could be that much closer. You set sail again.');

  new Cards('bahamasShortcut', 'Take a shortcut that you were told about on the pirate island', -25, -25, 'pirateSpirit', 'rum', 'stop', 'straight-on', 'You take the shortcut by some sharp rocks and while trying to avoid them get stuck in a whirlpool losing a lot of your resources. You have to go back to where you were, there is no way you are making it through that again.');


  new Cards('straight-on', 'Head straight on towards your destination', 0, -150, 'pirateSpirit', 'money', 'treasure', 'against', 'You and your crew make it to the Bahamas. You are able to get all the supplies you need to keep sailing in the world but have spent a lot of your booty. You decide to stay the night in Nassau and one of your crew members remembers hearing of a hidden treasure on this island.is  treasure is the lost treasure of Blackbeard. The famous explorer that rumoredly found the holy grail. He tells you that if you guys find this you will be set for life. You have doubts about this treasure existing or not…');

  new Cards('against', 'Decide against it.', -200, 0, '', '', '', 'loseEnding', 'Your crew kills you in your sleep and elects the first mate to be captain and goes after the treasure leaving your body to rot. GAME OVER.');

  new Cards('treasure', 'Go after the treasure', -50, 0, 'fightingAbility', 'rum', 'ignore', 'heed', 'You decide to go after the treasure, but through the perilous journey you lose half of your crew and have sobered up and lost a lot of rum. The ones that are alive are forever changed by the search of this.  After months of searching you finally find the treasure. As soon as you pick up the grail, the ghost of Blackbread warns you about drinking from the grail.');

  //BAHAMAS MAIN ENDING
  new Cards('heed', 'Heed his warning, he seems to know a thing or two. He is Blackbeard after all.', 0, 0, '', '', '', 'mainEnding', 'You listened to Blackbeard\'s warning and you decided to not drink from the grail. The problem is you and your crew woke up the temple watchers from their sleep. They are lizard people and they capture you all and decide to enslave everyone. GAME OVER');

  // BAHAMAS MAIN ENDING
  new Cards('ignore', 'Ignore his warning! Of course a dead guy wouldn\'t want you to live forever!', 0, 1000, '', '', '', 'mainEnding', 'You ignore Blackbeard\'s warning and you start to feel funny from drinking from the grail. You are granted the gift of eternal life but you can never leave the temple for the rest of eternity. As punishment for disobeying Blackbeards warning your whole crew turns to gold statues to watch the temple forever.  GAME OVER');
  // CUBA ROUTE
  new Cards('beginTwo', 'Go to Cuba', 0, 0, '', '', 'cubaShortcut', 'long-way', 'On your journey you see an island with a rocky pass down its middle.');

  new Cards('cubaShortcut', 'Take the shortcut through the pass.', 0, -50, 'pirateSpirit', 'money', 'east', 'west', 'Your ship takes damage and you must stop to repair it using a lot of yer fairly stolen booty! You go back and go around the island instead. It took awhile but you safely made it past the island. What direction to Cuba again?');

  new Cards('long-way', 'Take the long way around the island', 50, 0, 'intelligence', 'rum', 'east', 'west','It took a while but you safely made it past the island. What direction to Cuba again?');

  new Cards('west', 'Go West!', 25, 0, 'pirateSpirit', 'rum', 'fight', 'sneak', 'It took a while but you safely made it past the island and used the extra time to get some more rum in your system. You feel great! Hic… what direction to Cuba again?');

  // GAME OVER
  new Cards('sneak', 'Try and sneak past the British Naval ship', -200, 0, '', '', '', 'loseEnding', 'Oh No! The British caught you and you are hung publicly for your treacherous pirate crimes! Game Over.');

  new Cards('fight', 'Fight your way out of the city! Yar!!', -75, -75, 'fightingAbility', 'rum', 'confront', 'sail-on', 'Like a true pirate you decide to lead you and your crew into a bloody fight against those stuck up Brits! You get out of Havana but are only left with half the supplies you started with. You and what\'s left of your crew need to escape so you decide to head towards the Bahamas. As you are sailing into the night you run into a mysterious ship...');


  //GAME OVER
  new Cards('sail-on', 'Sail on past it, you don\'t have time to investigate!', -200, 0, '', '', '', 'loseEnding', 'The mysterious ship destroys your ship with its cannons. The ship sinks and any survivors are killed by its crew. GAME OVER.');

  new Cards('confront', 'Stop and confront the ship!', - 50, 0, 'pirateSpirit', 'rum', 'sell-souls', 'ignore-offer', 'Upon investigation you find that the captain of the mysterious vessel is the devil himself Davy Jones!( It scares you so much you lose some health) Davy Jones knows good and well about what is going on in your situation and offers you a deal...');

  new Cards('east', 'Go East!', -25, 0, 'intelligence', 'rum', 'head-towards', 'keep-going-storm', 'Heading east leads your right into a terrible storm, your ship is taking damage leaving you battered and more sober! You need to think quickly!');

  // GAME OVER
  new Cards('keep-going-storm', 'Keep going straight into the storm, you can make it through!', -200, 0, '', '', '', 'loseEnding', 'You try and brave the storm but it tears your ship into pieces. You wake up on a beautiful beach of an abandoned island with no one else in sight. You live out the rest of your days living the island life, and since no one else knew what became of you, your name is forever remembered as one of the great pirate legends. Game Over.');

  new Cards('head-towards', 'Head towards what you believe to be a lighthouse in the distance', 50, 0, 'pirateSpirit', 'rum', 'investigate', 'pass-ship', 'What you believed to be a lighthouse is actually a lantern off a mysterious ship. The storm seems to ease up the closer you get to it and you take a swig of rum to ease your nerves! Half the crew urges you to investigate it in hopes of finding treasure, the other half beg you to keep going as they have an uneasy feeling.');


  // GAME OVER
  new Cards('pass-ship', 'Pass the mysterious ship', -200, 0, '', '', '', 'loseEnding', 'Your ship slowly moves past the mysterious ship and you sigh a breath of relief after it is gone. The storm has cleared but a crew member notices a shadow in the water. A monstrosity of a sea serpent comes out of the water and eats you whole. GAME OVER.');

  new Cards('investigate', 'Investigate the mysterious ship!', -75, 0, 'fightingAbility','rum', 'sell-souls', 'ignore-offer', 'Upon investigation you find that the captain of the mysterious vessel is the devil himself Davy Jones!This scares you so much you sober up! Davy Jones knows good and well about what is going on in your situation and offers you a deal…');

  // one of the main cuba endings
  new Cards('sell-souls', 'Sell the souls of your crew so you can make it to the Bahamas safely, while the rest of your crew is eternally bound to the Flying Dutchman.', 0, 0, '', '', '', 'mainEnding', 'You have sacrificed your crew and now it is just you and your ship. One night as you sail you try and drink away the guilt. In your drunken state, you spot in the water the most beautiful creatures, mermaids. They charm you with their voices enough to get you close to the water and they pull you in and eat you alive. GAME OVER.');

  // main cuba endings
  new Cards('ignore-offer', 'Ignore the offer and sail into the dark night.', 0, 0, '', '', '', 'mainEnding', 'You have made the moral choice. The problem with this is you have pissed off the devil. The following day, your ship gets stuck on a reef, but wait a second.. this isn\'t a reef. It\'s the Kraken! It\'s here to take you and your crew to Davy Jones\'s locker. You and your crew do your best to fight off the beast, but it is all for nothing. Your ship sinks with you and your crew, sending you to Davy Jones locker until the end of time. GAME OVER!');
}


// figure out which card we are on
function pickCards(event) {
  var cardName = event.target.id;
  // Match with card
  var indexOne;
  for (var i = 0; i < cardStackArray.length; i++) {
    if (cardName === cardStackArray[i].cardName) {
      indexOne = i;
    }
  }
  cardStackArray[indexOne].changeStats();
  currentIndex = indexOne;
  choiceElement.textContent = ('');
  narrativeElement.textContent = ('');
  cardStackArray[indexOne].appendNarrative(narrativeElement, 'p');
  for (var j = 0; j < cardStackArray.length; j++) {
    if (cardStackArray[indexOne].choiceOne === cardStackArray[j].cardName) {
      cardStackArray[j].appendElement(choiceElement, 'p');
    }
  }
  for (var k = 0; k < cardStackArray.length; k++) {
    if (cardStackArray[indexOne].choiceTwo === cardStackArray[k].cardName) {
      cardStackArray[k].appendElement(choiceElement, 'p');
    }
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + 1);
}

var saveButton = document.getElementById('savebutton');
if (saveButton !== null) {
  saveButton.addEventListener('click', saveFunction);
}
function saveFunction() {
  var stringifiedCharacter = JSON.stringify(characterStats[0]);
  localStorage.setItem('character', stringifiedCharacter);
  console.log(`putting character into local storage:${stringifiedCharacter}`);
  var stringifiedCardIndex = JSON.stringify(currentIndex);
  localStorage.setItem('cardIndex', stringifiedCardIndex);
  console.log(`putting the card index in local storage${stringifiedCardIndex}`);
}


window.addEventListener('load', generateCard);
function generateCard() {
  makeCards();
  if (localStorage.getItem('saveTrigger') !== null) {
    var localStorageCharacter = localStorage.getItem('character');
    var parsedCharacter = JSON.parse(localStorageCharacter);
    characterStats = [];
    new Character(parsedCharacter.username, parsedCharacter.fightingAbility, parsedCharacter.pirateSpirit, parsedCharacter.intelligence, parsedCharacter.rum, parsedCharacter.money);
    console.log(`pirate spirit${characterStats[0].pirateSpirit}`);
    var localStorageCardIndex = localStorage.getItem('cardIndex');
    var parsedCardIndex = JSON.parse(localStorageCardIndex);
    console.log(`getting card index out of local storage${parsedCardIndex}`);
    // render the narrative from the card
    narrativeElement.textContent = '';
    cardStackArray[parsedCardIndex].appendNarrative(narrativeElement,'p');
    choiceElement.textContent = '';
    for (var j = 0; j < cardStackArray.length; j++) {
      console.log('cardstack working');
      if (cardStackArray[parsedCardIndex].choiceOne === cardStackArray[j].cardName) {
        cardStackArray[j].appendElement(choiceElement,'p');
      }
    }
    for (var k = 0; k < cardStackArray.length; k++) {
      if (cardStackArray[parsedCardIndex].choiceTwo === cardStackArray[k].cardName) {
        cardStackArray[k].appendElement(choiceElement, 'p');
      }
    }
    var parentElement = document.getElementById('changingStats');
    parentElement.textContent = ('');
    var healthLi = document.createElement('li');
    healthLi.textContent = `Rum: ${characterStats[0].rum}`;
    var moneyLi = document.createElement('li');
    moneyLi.textContent = `Booty: ${characterStats[0].money}`;
    parentElement.appendChild(healthLi);
    parentElement.appendChild(moneyLi);
    getUserAndImageFromStorage();
    localStorage.setItem('saveTrigger', false);
  } else {
    getUserAndImageFromStorage();
    for (var i = 0; i < cardStackArray.length; i++) {
      if (cardStackArray[i].cardName === 'beginOne' || cardStackArray[i].cardName === 'beginTwo') {
        cardStackArray[i].appendElement(choiceElement, 'p');
      }
    }
  }
}




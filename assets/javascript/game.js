var vehicles = ['airplane', 'ambulance', 'boat'];
var randomWordIndex = Math.floor((Math.random()) * vehicles.length);
var sysWord = vehicles[randomWordIndex];
var displayWord = sysWord.split("");

var screenWord = [];

var guessCount = 12;


for (let i = 0; i < displayWord.length; i++) {
    screenWord.push(sysWord[i].replace(sysWord[i],"_"));
}

document.querySelector("#wordGuess").innerHTML=screenWord;



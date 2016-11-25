var vehicles = ['airplane', 'ambulance', 'boat', 'blimp', 'bicycle', 'bulldozer', 'caravan', 'charriot'];
var randomWordIndex=Math.floor((Math.random())*vehicles.length);
var sysWord=vehicles[randomWordIndex];
var displayWord=sysWord.split("");
var div=document.getElementById('#wordGuess');

var userGuess=event.key;
alert(userGuess);
div.innerHTML="Hello!";

for(let i=0;i<displayWord.length;i++){
	div.appendChild("_");
}

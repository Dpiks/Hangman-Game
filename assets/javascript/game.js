  var vehicles = ['airplane',
      'ambulance',
      'boat',
      'bicycle',
      'bulldozer',
      'bus',
      'cablecar',
      'cruiseship',
      'firetruck',
      'helicopter',
      'motorcycle',
      'plowtruck',
      'scooter',
      'sedan',
      'segway',
      'spaceshuttle',
      'tractor',
      'truck'
  ];

  var vehiclesImage = ["./assets/images/airplane.png",
      "./assets/images/ambulance.png",
      "./assets/images/boat.png",
      "./assets/images/bicycle.png",
      "./assets/images/bulldozer.png",
      "./assets/images/bus.png",
      "./assets/images/cablecar.png",
      "./assets/images/cruiseship.png",
      "./assets/images/firetruck.png",
      "./assets/images/helicopter.png",
      "./assets/images/motorcycle.png",
      "./assets/images/plowtruck.png",
      "./assets/images/scooter.png",
      "./assets/images/sedan.png",
      "./assets/images/segway.png",
      "./assets/images/spaceshuttle.png",
      "./assets/images/tractor.png",
      "./assets/images/truck.png"

  ]

  var sounds = {
      letter_right: {
          sound: new Howl({
              urls: ['./assets/sounds/letter_right.wav'],
          })
      },
      letter_wrong: {
          sound: new Howl({
              urls: ['./assets/sounds/letter_wrong.wav'],
          })
      },
      game_win: {
          sound: new Howl({
              urls: ['./assets/sounds/game_win.wav'],
          })
      },
      game_lost: {
          sound: new Howl({
              urls: ['./assets/sounds/game_lost.wav'],
          })
      }

  }
  var randomWordIndex = Math.floor((Math.random()) * vehicles.length);
  var sysWord = vehicles[randomWordIndex];
  var displayWord = sysWord.split("");

  var screenWord = [];

  var totalGuessCount = 12;
  var guessMade = 0;


  for (let i = 0; i < displayWord.length; i++) {
      screenWord.push(sysWord[i].replace(sysWord[i], "_"));
  }

  document.querySelector("#wordGuess").innerHTML = screenWord.join(" ");
  document.querySelector("#no_of_guesses").innerHTML = totalGuessCount;
  var letters_guessed = [];
  var guessLeft = totalGuessCount - guessMade;
  var wins = 0;
  var loses = 0;
  document.querySelector("#no_of_wins").innerHTML = wins;
  document.querySelector("#no_of_loses").innerHTML = loses;


  document.onkeyup = function(event) {

      keyPressed = event.key;
      //Key other than alphabets or wrong alphabets repeated
      document.querySelector("#wrong_key").innerHTML = "";
      var wrongLetterRepeat = false;








      function checkWin() {
          if (screenWord.indexOf("_") === -1) {
              wins++;
              document.querySelector("#wrong_key").innerHTML = "You win!! Keep driving!! \n Enter 'spacebar' to continue";
              document.querySelector("#no_of_wins").innerHTML = wins;
              sounds.game_win.sound.play();
              displayImage(randomWordIndex);


          }
      }

      function checkLose() {
          if (screenWord.indexOf("_") !== -1) {
              loses++;
              document.querySelector("#wrong_key").innerHTML = "You loose!! Better luck next time. \n Enter 'spacebar' to continue";
              document.querySelector("#no_of_loses").innerHTML = loses;
              sounds.game_lost.sound.play();
              document.querySelector("#wordGuess").innerHTML = sysWord;
              displayImage(randomWordIndex);




          }

      }

      function chooseWord() {
          randomWordIndex = Math.floor((Math.random()) * vehicles.length);
          sysWord = vehicles[randomWordIndex];
          displayWord = sysWord.split("");
          screenWord = [];
          totalGuessCount = 12;
          document.querySelector("#no_of_guesses").innerHTML = totalGuessCount;
          guessMade = 0;
          letters_guessed = [];
          document.querySelector("#letters_guessed").innerHTML = letters_guessed;
          document.querySelector("#img_display").src = " ";

          guessLeft = totalGuessCount - guessMade;


          for (let i = 0; i < displayWord.length; i++) {
              screenWord.push(sysWord[i].replace(sysWord[i], "_"));
          }

          document.querySelector("#wordGuess").innerHTML = screenWord.join(" ");
          console.log(letters_guessed);
      }

      function displayImage(index) {
          document.querySelector("#img_display").src = vehiclesImage[index];

      }


      if (event.keyCode === 32) {

          chooseWord();
      } else if (guessLeft != 0) {



          //checking if keyPressed is an alphabet
          if ((event.keyCode >= 97 && event.keyCode <= 122) || (event.keyCode >= 65 && event.keyCode <= 90)) {
              //checking if keyPressed is in the word selected by the system
              for (let i = 0; i < displayWord.length; i++) {
                  keyPressed = keyPressed.toLowerCase();
                  if (keyPressed === displayWord[i]) {
                      screenWord[i] = keyPressed;
                      document.querySelector("#wordGuess").innerHTML = screenWord.join(" ");
                      sounds.letter_right.sound.play();

                      checkWin();

                  }
              }
              //checking if keyPressed is not in the word selected by the system
              if (displayWord.indexOf(keyPressed) === -1) {
                  //checking if keyPressed is already pressed
                  for (let i = 0; i < letters_guessed.length; i++) {
                      keyPressed = keyPressed.toLowerCase();
                      if (keyPressed === letters_guessed[i]) {
                          document.querySelector("#wrong_key").innerHTML = letters_guessed[i] + " is already pressed. Enter a different letter.";
                          sounds.letter_wrong.sound.play();
                          wrongLetterRepeat = true;
                      }
                  }
                  //adding wrong keyPressed to the letters_guessed array
                  if (wrongLetterRepeat == false) {
                      letters_guessed.push(keyPressed);
                      document.querySelector("#letters_guessed").innerHTML = letters_guessed;
                      sounds.letter_wrong.sound.play();

                      guessMade++;
                      guessLeft = totalGuessCount - guessMade;
                      document.querySelector("#no_of_guesses").innerHTML = guessLeft;
                      if (guessLeft === 0) {
                          checkLose();
                      }
                  }
              }

          } else {
              document.querySelector("#wrong_key").innerHTML = "Enter alphabets only";
          }

      } else {
          checkWin();

          guessMade = 0;


      }
  }
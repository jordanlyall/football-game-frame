console.log("game.js loaded");

class FootballGame {
  constructor() {
    this.startYardLine = 25;
    this.yardsToTouchdown = 100 - this.startYardLine;
    this.down = 1;
    this.playOptions = {
      "1": { name: "HB Dive (run)", func: this.hbDive.bind(this) },
      "2": { name: "Quick Toss (run)", func: this.quickToss.bind(this) },
      "3": { name: "Double Post (pass)", func: this.doublePost.bind(this) },
      "4": { name: "PA Y Cross (pass)", func: this.paYCross.bind(this) },
    };
    this.gameOver = false;
  }

  hbDive() {
    const outcome = Math.random();
    if (outcome < 0.10) {
      return "fumble";
    } else if (outcome < 0.25) {
      return -Math.floor(Math.random() * 3) - 1;
    } else if (outcome < 0.35) {
      return 0;
    } else if (outcome < 0.65) {
      return Math.floor(Math.random() * 4) + 2;
    } else if (outcome < 0.85) {
      return Math.floor(Math.random() * 5) + 6;
    } else {
      return Math.floor(Math.random() * 10) + 11;
    }
  }

  quickToss() {
    const outcome = Math.random();
    if (outcome < 0.10) {
      return "fumble";
    } else if (outcome < 0.25) {
      return -Math.floor(Math.random() * 3) - 1;
    } else if (outcome < 0.45) {
      return 0;
    } else if (outcome < 0.65) {
      return Math.floor(Math.random() * 4) + 2;
    } else if (outcome < 0.85) {
      return Math.floor(Math.random() * 5) + 6;
    } else {
      return Math.floor(Math.random() * 10) + 11;
    }
  }

  doublePost() {
    const outcome = Math.random();
    if (outcome < 0.10) {
      return "interception";
    } else if (outcome < 0.15) {
      return "fumble";
    } else if (outcome < 0.40) {
      return 0;
    } else if (outcome < 0.65) {
      return Math.floor(Math.random() * 10) + 6;
    } else if (outcome < 0.90) {
      return Math.floor(Math.random() * 10) + 16;
    } else {
      return Math.floor(Math.random() * 11) + 26;
    }
  }

  paYCross() {
    const outcome = Math.random();
    if (outcome < 0.15) {
      return "interception";
    } else if (outcome < 0.20) {
      return "fumble";
    } else if (outcome < 0.45) {
      return 0;
    } else if (outcome < 0.65) {
      return Math.floor(Math.random() * 10) + 6;
    } else if (outcome < 0.85) {
      return Math.floor(Math.random() * 10) + 16;
    } else {
      return Math.floor(Math.random() * 11) + 26;
    }
  }

  makePlay(choice) {
    if (!this.playOptions[choice]) {
      alert("Invalid choice. Try again.");
      return;
    }

    const { name, func } = this.playOptions[choice];
    const result = func();

    if (result === "interception") {
      this.updateStatus(`You chose ${name}. Oh no! The pass was intercepted. Game over.`);
      this.gameOver = true;
    } else if (result === "fumble") {
      this.updateStatus(`You chose ${name}. Oh no! The ball was fumbled. Game over.`);
      this.gameOver = true;
    } else {
      this.yardsToTouchdown -= result;
      if (this.yardsToTouchdown <= 0) {
        this.updateStatus(`You chose ${name}. You gained ${result} yards. Touchdown! You win! Here's your NFT reward.`);
        this.gameOver = true;
      } else {
        if (result >= 10) {
          this.down = 1;
        } else {
          this.down += 1;
        }

        this.updateStatus(`You chose ${name}. You gained ${result} yards. Down: ${this.down}, Yards to Touchdown: ${this.yardsToTouchdown}`);
        
        if (this.down > 4) {
          this.updateStatus("You turned the ball over on downs. Game over.");
          this.gameOver = true;
        }
      }
    }

    if (this.gameOver) {
      document.getElementById('play-options').innerHTML = '<button onclick="startGame()">Play Again</button>';
    }
  }

  updateStatus(message) {
    document.getElementById('game-status').innerText = message;
  }
}

let game;

function startGame() {
  console.log("startGame function called");
  game = new FootballGame();
  game.updateStatus("Welcome to the Football Game! You start at the 25 yard line. Choose your plays wisely to score a touchdown. You have four downs to make it to the end zone. Good luck!");
  document.getElementById('play-options').innerHTML = `
    <button onclick="makePlay('1')">HB Dive (run)</button>
    <button onclick="makePlay('2')">Quick Toss (run)</button>
    <button onclick="makePlay('3')">Double Post (pass)</button>
    <button onclick="makePlay('4')">PA Y Cross (pass)</button>
  `;
}

function makePlay(choice) {
  console.log("makePlay function called with choice: ", choice);
  game.makePlay(choice);
}

// Ensure functions are globally available
window.startGame = startGame;
window.makePlay = makePlay;

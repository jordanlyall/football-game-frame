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
      if (outcome < 0.10) { // 10% chance of fumble
        return "fumble";
      } else if (outcome < 0.25) { // 15% chance of negative yardage
        return -Math.floor(Math.random() * 3) - 1; // -1 to -3 yards
      } else if (outcome < 0.35) { // 10% chance of no gain
        return 0; // 0 yards
      } else if (outcome < 0.65) { // 30% chance of gaining 2-5 yards
        return Math.floor(Math.random() * 4) + 2; // 2 to 5 yards
      } else if (outcome < 0.85) { // 20% chance of gaining 6-10 yards
        return Math.floor(Math.random() * 5) + 6; // 6 to 10 yards
      } else { // 15% chance of gaining 11-20 yards
        return Math.floor(Math.random() * 10) + 11; // 11 to 20 yards
      }
    }
  
    quickToss() {
      const outcome = Math.random();
      if (outcome < 0.10) { // 10% chance of fumble
        return "fumble";
      } else if (outcome < 0.25) { // 15% chance of negative yardage
        return -Math.floor(Math.random() * 3) - 1; // -1 to -3 yards
      } else if (outcome < 0.45) { // 20% chance of no gain
        return 0; // 0 yards
      } else if (outcome < 0.65) { // 20% chance of gaining 2-5 yards
        return Math.floor(Math.random() * 4) + 2; // 2 to 5 yards
      } else if (outcome < 0.85) { // 20% chance of gaining 6-10 yards
        return Math.floor(Math.random() * 5) + 6; // 6 to 10 yards
      } else { // 15% chance of gaining 11-20 yards
        return Math.floor(Math.random() * 10) + 11; // 11 to 20 yards
      }
    }
  
    doublePost() {
      const outcome = Math.random();
      if (outcome < 0.10) { // 10% chance of interception
        return "interception";
      } else if (outcome < 0.15) { // 5% chance of fumble
        return "fumble";
      } else if (outcome < 0.40) { // 25% chance of incomplete pass
        return 0; // no yards gained
      } else if (outcome < 0.65) { // 25% chance of gaining 6-15 yards
        return Math.floor(Math.random() * 10) + 6; // 6 to 15 yards
      } else if (outcome < 0.90) { // 25% chance of gaining 16-25 yards
        return Math.floor(Math.random() * 10) + 16; // 16 to 25 yards
      } else { // 15% chance of gaining 26-36 yards
        return Math.floor(Math.random() * 11) + 26; // 26 to 36 yards
      }
    }
  
    paYCross() {
      const outcome = Math.random();
      if (outcome < 0.15) { // 15% chance of interception
        return "interception";
      } else if (outcome < 0.20) { // 5% chance of fumble
        return "fumble";
      } else if (outcome < 0.45) { // 25% chance of incomplete pass
        return 0; // no yards gained
      } else if (outcome < 0.65) { // 20% chance of gaining 6-15 yards
        return Math.floor(Math.random() * 10) + 6; // 6 to 15 yards
      } else if (outcome < 0.85) { // 20% chance of gaining 16-25 yards
        return Math.floor(Math.random() * 10) + 16; // 16 to 25 yards
      } else { // 15% chance of gaining 26-36 yards
        return Math.floor(Math.random() * 11) + 26; // 26 to 36 yards
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
    game.makePlay(choice);
  }
  
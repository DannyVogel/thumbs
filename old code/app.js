const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

let playerScore = 0;
let opponentScore = 0;

app.get("/", function(req, res) {
  let result = "Good luck!";
  res.render("index", {
    data: {
      resultIndex: result,
      buttonIndex: "Play"
    }
  });
})

app.post("/", function(req, res) {
  let l1 = Number(req.body.leftHand);
  let r1 = Number(req.body.rightHand);
  let playerGuess = Number(req.body.guess);
  let l2 = Math.round(Math.random() * 1);
  let r2 = Math.round(Math.random() * 1);
  let fingerTotal = l1 + r1 + l2 + r2;

  if ((l1 + r1 + l2 + r2) != playerGuess) {
    let scoreMessage = "Your score is " + playerScore;
    res.render("index", {
      data: {
        resultIndex: "No luck, try again!",
        score: scoreMessage,
        fingerTotalIndex: "There were " + fingerTotal + " thumb(s) up!",
        buttonIndex: "Next Round"
      }
    });
  } else if ((l1 + r1 + l2 + r2) === playerGuess) {
    playerScore++;
    if (playerScore === 2) {
      let scoreMessage = " ";
      res.render("index", {
        data: {
          resultIndex: "You won the game!",
          score: scoreMessage,
          fingerTotalIndex: "There were " + fingerTotal + " finger(s) up!",
          buttonIndex: "Play again"
        }
      });
      startOver();
    } else if (playerScore === 1) {
      let scoreMessage = "Your score is " + playerScore;
      res.render("index", {
        data: {
          resultIndex: "You guessed correctly! One more to win.",
          score: scoreMessage,
          fingerTotalIndex: "There were " + fingerTotal + " finger(s) up!",
          buttonIndex: "Next Round"
        }
      });
    }
  };

  console.log(l1, r1, playerGuess, l2, r2)
  console.log("Player score is " + playerScore);
});

app.post("/reset", function(req, res) {
  startOver();

  res.redirect("/");
});

function startOver() {
  playerScore = 0
  console.log("Player score is " + playerScore)
}

app.listen(3000, function() {
  console.log("Server UP!");
});

//switchs

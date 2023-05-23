class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.leftThumb = false;
        this.rightThumb = false;
        this.thumbsRaised = 0;
        this.guess = 0;
    }
    getName() {
        return this.name;
    }
    setLeftThumb() {
        this.leftThumb = !this.leftThumb;
        this.leftThumb ? this.thumbsRaised++ : this.thumbsRaised--;
    }
    setRightThumb() {
        this.rightThumb = !this.rightThumb;
        this.rightThumb ? this.thumbsRaised++ : this.thumbsRaised--;
    }
    getThumbs() {
        return {leftThumb: this.leftThumb, rightThumb: this.rightThumb};
    }
    setThumbsRandom() {
        this.leftThumb = Math.random() >= 0.5;
        this.rightThumb = Math.random() >= 0.5;
        this.leftThumb && this.thumbsRaised++
        this.rightThumb && this.thumbsRaised++
    }
    setGuess(num) {
        this.guess = num;
    }
    getGuess() {
        return this.guess;
    }
    getScore() {
        return this.score;
    }
    winsRound() {
        this.score += 1;
    }
    resetRound(){
        this.leftThumb = false;
        this.rightThumb = false;
        this.thumbsRaised = 0;
        this.guess = 0;
    }
    resetGame() {
        this.score = 0;
        this.leftThumb = false;
        this.rightThumb = false;
        this.thumbsRaised = 0;
        this.guess = 0;
    }
}

const humanPlayer = new Player("Player");
const computerPlayer = new Player("Computer");

export {humanPlayer, computerPlayer};
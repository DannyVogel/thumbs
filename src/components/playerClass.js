class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.leftThumb = false;
        this.rightThumb = false;
        this.guess = 0;
    }
    getName() {
        return this.name;
    }
    setLeftThumb() {
        this.leftThumb = !this.leftThumb;
    }
    setRightThumb() {
        this.rightThumb = !this.rightThumb;
    }
    getThumbs() {
        return {leftThumb: this.leftThumb, rightThumb: this.rightThumb};
    }
    setGuess(num) {
        this.guess = num;
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
        this.guess = 0;
    }
    resetGame() {
        this.score = 0;
        this.leftThumb = false;
        this.rightThumb = false;
        this.guess = 0;
    }
}

const humanPlayer = new Player("Player");
const computerPlayer = new Player("Computer");

export {humanPlayer, computerPlayer};
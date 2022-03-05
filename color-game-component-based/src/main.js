import Component from  './component.js';
import Navbar from  './navbar.js';
import Board from  './board.js';
import Deck from  './deck.js';
import Reset from  './reset.js';
import Timer from './timer.js';

import './main.css';

export default class Main extends Component {
    static getRootClass() {
        return '.main';
    }

    constructor(root) {
        super(root);

        this.navbar = new Navbar(root.querySelector('.navbar'));
        this.navbar.on('easyMode', this.handleEasyClick.bind(this));
        this.navbar.on('hardMode', this.handleHardClick.bind(this));
        this.navbar.on('nightmareMode', this.handleNightmareClick.bind(this));

        this.deck = new Deck(root.querySelector('.deck'));
        this.deck.on('wrongClick', this.handleDeckWrongClick.bind(this));
        this.deck.on('rightClick', this.handleDeckRightClick.bind(this));

        this.board = new Board(root.querySelector('.board'), this.deck.getPickedColor());

        this.timer = new Timer(root.querySelector('.timer'));
        this.countdownFunc = undefined;

        this.reset = new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleResetClick.bind(this));
    }

    handleDeckWrongClick(firer) {
        this.board.showWrongMessage();
    }

    handleDeckRightClick(firer, pickedColor) {
        this.root.style.backgroundColor = pickedColor;
        this.stopTimer();
        this.timer.unshowTimerMessage();
        this.root.classList.remove("blink");
        this.board.showCorrectMessage();
        this.reset.showPlayAgain();
        this.reset.showResetButton();
    }

    handleResetClick(firer) {
        this.stopTimer();
        this.timer.unshowTimerMessage();
        this.root.classList.remove("blink");

        this.root.style.backgroundColor = "#232323";

        if(this.navbar.curMode  === "nightmareMode") {
            this.root.classList.add("blink");
            this.reset.hideResetButton();

            this.color = undefined;
            this.countdownTime = 5;
            this.timer.showTimerMessage(this.countdownTime);
            this.countdownFunc = setInterval(function(){
                this.countdownTime -= 1;
                this.timer.showTimerMessage(this.countdownTime);
                if(this.countdownTime === 0) {
                    this.timer.showTimerMessage(this.countdownTime);
                    this.board.showNoMessage();
                    this.reset.showResetButton();
                    this.deck.handleCardFade();
                    this.handleTimeout(this.color);
                    this.stopTimer();

                    this.root.classList.remove("blink");
                    this.reset.on('click', this.handleResetClick.bind(this));
                }
            }.bind(this), 1000);
            this.root.style.backgroundColor = "#232323";
            this.deck.reset();
            this.color = this.deck.getPickedColor();
            this.board.reset(this.color);
            firer.reset();
        }

        else {
            this.reset.showResetButton();
            this.deck.reset();
            this.board.reset(this.deck.getPickedColor());
            firer.reset();
        }
    }

    handleEasyClick(firer) {
        this.stopTimer();
        this.timer.unshowTimerMessage();
        this.reset.showResetButton();
        this.deck.removeCards();
        this.deck.handleRemoveCards();
        this.reset.reset();

        this.root.style.backgroundColor = "#232323";
        this.deck.reset();
        this.board.reset(this.deck.getPickedColor());
        firer.reset();

        this.root.classList.remove("blink");
        this.reset.on('click', this.handleResetClick.bind(this));
    }

    handleHardClick(firer) {
        this.stopTimer();
        this.timer.unshowTimerMessage();
        this.reset.showResetButton();
        this.deck.addCards();
        this.deck.handleRecoverCards();
        this.reset.reset();

        this.root.style.backgroundColor = "#232323";
        this.deck.reset();
        this.board.reset(this.deck.getPickedColor());
        firer.reset();

        this.root.classList.remove("blink");
        this.reset.on('click', this.handleResetClick.bind(this));
    }

    handleNightmareClick(firer) {
        this.stopTimer();
        this.timer.unshowTimerMessage();
        this.deck.addCards();
        this.deck.handleRecoverCards();
        this.reset.hideResetButton();
        this.root.classList.add("blink");

        this.color = undefined;
        this.countdownTime = 5;
        this.timer.showTimerMessage(this.countdownTime);
        this.countdownFunc = setInterval(function(){
            this.countdownTime -= 1;
            this.timer.showTimerMessage(this.countdownTime);
            if(this.countdownTime === 0) {
                this.timer.showTimerMessage(this.countdownTime);
                this.board.showNoMessage();
                this.reset.showResetButton();
                this.deck.handleCardFade();
                this.handleTimeout(this.color);
                this.stopTimer();

                this.root.classList.remove("blink");
                this.reset.on('click', this.handleResetClick.bind(this));
            }
        }.bind(this), 1000);
        this.root.style.backgroundColor = "#232323";
        this.deck.reset();
        this.color = this.deck.getPickedColor();
        this.board.reset(this.color);
        firer.reset();

        this.reset.on('click', this.handleResetClick.bind(this));
    }

    handleTimeout(pickedColor) {
        this.root.style.backgroundColor = pickedColor;
        this.reset.showPlayAgain();
    }

    stopTimer() {
        clearInterval(this.countdownFunc);
        this.timer.showTimerMessage(this.countdownTime);
    }
}

window.onload = function() {
    const body = document.querySelector('body');
    new Main(body);
};

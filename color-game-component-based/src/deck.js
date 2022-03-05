import Component from './component.js';
import Card from './card.js';

import './deck.css';

/*
 * [Event name: params]
 * wrongClick: this
 * rightClick: this, pickedColor
 */
export default class Deck extends Component {
    static getRootClass() {
        return '.deck';
    }

    constructor(root) {
        super(root);

        this.gameOver = false;
        this.cards = [];
        this.temp = [];
        const els = root.querySelectorAll(Card.getRootClass());

        this.removeOne = root.querySelector('#removeOne');
        this.removeTwo = root.querySelector('#removeTwo');
        this.removeThree = root.querySelector('#removeThree');

        for (let el of els) {
            const card = new Card(el);
            card.on('click', this.handleCardClick.bind(this));
            this.cards.push(card);
        }
        this.pickedColor = this.pickColor();
    }

    reset() {
        this.gameOver = false;
        for (let card of this.cards) {
            card.reset();
        }
        this.pickedColor = this.pickColor();
    }

    getPickedColor() {
        return this.pickedColor;
    }

    handleCardClick(firer, color) {
        if (this.gameOver)
            return;

        if (color === this.pickedColor) {
            for (let card of this.cards)
                card.fadeIn("#FFF");
            this.gameOver = true;
            this.fire('rightClick', this.pickedColor);
        } else {
            firer.fadeOut();
            this.fire('wrongClick');
        }
    }

    pickColor() {
        const random = Math.floor(Math.random() * this.cards.length);
        // console.log("cardLength: " + this.cards.length);
        // console.log("chosen card: " + random);
        return this.cards[random].getColor();
    }

    removeCards() {
        if(this.cards.length > 3) {
            for(let i=0; i<3; i++)
                this.temp[i] = this.cards.pop();
        }
    }

    addCards() {
        if(this.cards.length < 5) {
            for(let i=0; i<3; i++) {
                this.cards.push(this.temp.pop());
            }
        }
    }
    
    handleCardFade() {
        for (let card of this.cards)
        card.fadeIn("#FFF");
        this.gameOver = true;
    }

    handleRemoveCards() {
        this.removeOne.style.display = "none";
        this.removeTwo.style.display = "none";
        this.removeThree.style.display = "none";
    }

    handleRecoverCards() {
        this.removeOne.style.display = "block";
        this.removeTwo.style.display = "block";
        this.removeThree.style.display = "block";
    }
}

import Component from './component.js';

import './reset.css';

/*
 * [Event name: params]
 * click: this
 */
export default class Reset extends Component {
    static getRootClass() {
        return '.reset';
    }

    constructor(root) {
        super(root);
        root.addEventListener("click", this.handleDomClick.bind(this));
        this.resetDisplay = root.querySelector(".reset span");
        this.resetBox = root.querySelector(".reset");
        this.reset();
    }

    reset() {
        this.resetDisplay.textContent = "New Color";
    }

    showPlayAgain() {
        this.resetDisplay.textContent = "Play Again";
    }

    showResetButton() {
        this.root.style.display = "block";
    }

    hideResetButton() {
        this.root.style.display = "none";
    }

    handleDomClick(e) {
        this.fire('click');
    }
}

import Component from './component.js';

import './navbar.css';

/*
 * [Event name: params]
 * none
 */
export default class Navbar extends Component {
    static getRootClass() {
        return '.navbar';
    }

    constructor(root) {
        super(root);

        this.curMode = "hardMode";

        this.brand = root.querySelector('.brand');

        this.easyMode = root.querySelector('#easyMode');
        this.hardMode = root.querySelector('#hardMode');
        this.nightmareMode = root.querySelector('#nightmareMode');

        this.easyMode.addEventListener("click", this.EasyClick.bind(this));
        this.hardMode.addEventListener("click", this.HardClick.bind(this));
        this.nightmareMode.addEventListener("click", this.NightmareClick.bind(this));
        
        this.reset();
    }

    reset() {
        // do nothing
    }

    EasyClick() {
        easyMode.classList.add("selected");
        hardMode.classList.remove("selected");
        nightmareMode.classList.remove("selected");

        this.curMode = "easyMode";
        this.fire('easyMode');
    }

    HardClick() {
        easyMode.classList.remove("selected");
        hardMode.classList.add("selected");
        nightmareMode.classList.remove("selected");

        this.curMode = "hardMode";
        this.fire('hardMode');
    }

    NightmareClick() {
        easyMode.classList.remove("selected");
        hardMode.classList.remove("selected");
        nightmareMode.classList.add("selected");
    
        this.curMode = "nightmareMode";
        this.fire('nightmareMode');
    }
}

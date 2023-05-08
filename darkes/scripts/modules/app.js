const getSelector = (css) => document.querySelector(css);

const navButtons = document.querySelectorAll(".btn-nav")
const firstTab = getSelector("#first-container")
const secondTab = getSelector("#second-container")
const thirdTab = getSelector("#third-container")

const ELEM = {
    ONE: 'one',
    TWO: 'two',
    THREE: 'three'
}


navButtons.forEach(navButton => navButton.addEventListener("click", function () {
    const navAtciveButton = getSelector(".btn-nav-active");
    const displayShow = getSelector(".display-show");
    
    navAtciveButton.classList.remove("btn-nav-active")
    this.classList.add("btn-nav-active")

    displayShow.classList.remove("display-show")

    if (this.id === ELEM.ONE) {
        firstTab.classList.add("display-show")
    };

    if (this.id === ELEM.TWO) {
        secondTab.classList.add("display-show")
    };

    if (this.id === ELEM.THREE) {
        thirdTab.classList.add("display-show")
    };
}));
const toggleSwitch = document.querySelector('input[type="checkbox"]');
// console.log(toggleSwitch);   // <input type="checkbox">
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// Dark or Light Images
function imageMode(color) {
    image1.src = `img/undraw_proud_coder_${color}.svg`;
    image2.src = `img/undraw_feeling_proud_${color}.svg`;
    image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

// Dark Mode Styles
function darkMode() {
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    // console.log(toggleIcon.children);  //HTMLCollection { 0: span.toggle-text, 1: i.fas.fa-sun, length: 2 }
    toggleIcon.children[0].textContent = 'Dark Mode';
    // toggleIcon.children[1].classList.remove('fa-sun');
    // toggleIcon.children[1].classList.add('fa-moon');
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    imageMode('dark');
    // image1.src = 'img/undraw_proud_coder_dark.svg';
    // image2.src = 'img/undraw_feeling_proud_dark.svg';
    // image3.src = 'img/undraw_conceptual_idea_dark.svg';
}

// Light Mode Styles
function lightMode() {
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-moonsun');
    imageMode('light');
}

// switch Theme Dynamically
function switchTheme(event) {
    // console.log(event); // change { target: input, isTrusted: true, srcElement: input, currentTarget: input, eventPhase: 2, bubbles: true, cancelable: false, returnValue: true, defaultPrevented: false, composed: false, … }
    // console.log(event.target);  // <input type="checkbox">
    // console.log(event.target.checked);   // true / false

    // Document.documentElement returns the Element that is the root element of the document
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');  // *
        darkMode();
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // *
        lightMode();
    }

}

// Event Listener
toggleSwitch.addEventListener("change", switchTheme);

// * Check Local Storage For Theme 记住当前模式
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        darkMode();
    }
}
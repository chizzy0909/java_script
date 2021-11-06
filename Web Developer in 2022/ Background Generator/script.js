let css = document.querySelector("h3");
let color1 = document.querySelector("input.color1");
let color2 = document.querySelector("input.color2");

let body = document.getElementById("gradient");
// change background
// body.style.background = "red";  

function setGradient() {
    body.style.background =
        "linear-gradient(to right, "
        + color1.value
        + ", "
        + color2.value
        + ")";

    //显示 CSS 线性渐变属性
    css.textContent = body.style.background + ";";
}

color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);



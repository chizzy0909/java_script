const text = document.querySelectorAll(".thePaths");

// console.log(text[0].getTotalLength());

for (let i = 0; i < text.length; i++) {
  console.log(`text number ${i} length is ${text[i].getTotalLength()}`);
}

//动画结束后显示首页
const lastWord = document.querySelector("#sixteenth");
const animation = document.querySelector("div.animation");
lastWord.addEventListener("animationend", () => {
  animation.style = "transition: all 1s ease; opacity: 0; pointer-events: none;";
})
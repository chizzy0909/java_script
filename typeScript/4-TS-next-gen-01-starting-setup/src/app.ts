// const userName = "Max";
// let age = 30;
// age = 20;

// アロー関数
const add = (a: number, b: number) => {
  return a + b;
};
// デフォルト関数パラメータ
const add1 = (a: number, b: number = 2) => a + b;
console.log(add1(1));

const printOut = (outPut: string | number) => {
  console.log(outPut);
};
const printOut1: (outPut: string | number) => void = (outPut) => {
  console.log(outPut);
};
printOut1(add(1, 2));

const button = document.querySelector("button")!;
if (button) {
  button.addEventListener("click", (event) => {
    console.log(event.target);
  });
}

// スプレッドオペレータ（...）
const hobbies: string[] = ["Sports", "Cooking", "Playing"];
const activeHobbies = ["Hiking", ...hobbies];
// activeHobbies.push(hobbies[0], hobbies[1]);
activeHobbies.push(...hobbies);

const person = {
  firstName: "Max",
  age: 30,
};

const copiedPerson = {
  ...person,
};

// レストパラメータ（残余引数）
const add2 = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};
const addedNumbers = add2(5, 10, 2, 3.7);

// 配列とオブジェクトの分割代入
// const hobby1 = hobbies[0];
// const hobby2 = hobbies[1];
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
const { firstName: userName, age } = person;

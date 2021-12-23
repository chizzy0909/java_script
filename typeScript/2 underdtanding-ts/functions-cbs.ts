function add1(n1: number, n2: number) {
  return n1 + n2;
}

// 没有返回值的函数总是返回 undefined，而 void 总是在 JavaScript 中返回 undefined
function printResult1(num: number): void {
  console.log("Result: " + num);
}
printResult1(add1(5, 12)); // Result: 17

// function 型
let combineValues: (a: number, b: number) => number;
combineValues = add1;
console.log(combineValues(8, 8)); //16

// コールバック (callback)
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}
addAndHandle(5, 6, (result) => {
  console.log(result); // 11
});

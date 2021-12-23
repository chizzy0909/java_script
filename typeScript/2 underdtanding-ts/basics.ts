function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  //   if (typeof n1 !== "number" || typeof n1 !== "number") {
  //     throw new Error("入力値は正しくありません");
  //   }
  const result = n1 + n2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}

const num1 = 5;
const num2 = 2.8;
const printResult = true;
const resultPhrase = "Result: ";

add(num1, num2, printResult, resultPhrase);

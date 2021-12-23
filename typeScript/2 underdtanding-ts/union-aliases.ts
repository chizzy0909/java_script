// 型エイリアス(alias,別名)
type Combinale = number | string;

function combine(
  input1: Combinale,
  input2: number | string,
  resultConversion: "as-number" | "as-text"
) {
  // Union型
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString(); //  56 56 'TANAKAIKEDA'
  }
  return result;
  // Literal 型
  //   if (resultConversion === "as-number") {
  //     return +result;
  //   } else {
  //     return result.toString();  // 56 3026 'TANAKAIKEDA'
  //   }
}

const combineAges = combine(30, 26, "as-number");
console.log(combineAges);

const combineStrAges = combine("30", "26", "as-number");
console.log(combineStrAges);

const combineNames = combine("TANAKA", "IKEDA", "as-text");
console.log(combineNames);

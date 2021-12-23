// ** 組み込みの Generic 型 & Generics とは
// const names = ["Max", "Manuel", "Mike"];
const names: Array<string | number> = []; //string[]

// const promise: Promise<any> = new Promise();
// const promise = new Promise<string>((resolve, reject) => {
//   setTimeout(() => {
//     resolve("終わりました！");
//   }, 2000);
// });

// promise.then((data) => {
//   //   data.split(" ");
// });

// ** Generic 関数の作成 => merge<T, U>(objA: T, objB: U)
// function merge(objA: object, objB: object) {}
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
// const mergeObj = merge({ name: "Max" }, { age: 30 }) as {
//   name: string;
//   age: number;
// };
const mergeObj = merge({ name: "Max", hobbies: ["sports"] }, { age: 30 }); //{name: 'Max', age: 30}
console.log(mergeObj);
console.log(mergeObj.age);

// ** Generics に制約を追加する =>  merge<T extends object, U extends object>

// ** もうひとつの Generic 関数
interface Lengthy {
  length: number;
}

function countAndDescirbe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "値がありません";
  if (element.length > 0) {
    descriptionText = "値が" + element.length + "個です。";
  }
  return [element, descriptionText];
}
const El1 = countAndDescirbe("お疲れ様です"); // ['お疲れ様です', '値が6個です。']
const El2 = countAndDescirbe(["span", "switch"]); // [Array(2), '値が2個です。']

// ** "keyof" の制約
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value " + obj[key];
}
extractAndConvert({ name: "Max" }, "name"); // 'Value Max'

// ** Generic クラス
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }
  getItem() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("data1");
textStorage.addItem("data2");
textStorage.removeItem("data2");
console.log(textStorage); // DataStorage {data: Array(1)}
console.log(textStorage.getItem()); // ['data1']

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const obj = { name: "Max" };
// objStorage.addItem(obj);
// objStorage.addItem({ name: "Manu" });
// // ...
// objStorage.removeItem(obj);
// console.log(objStorage.getItem());

// ** Generic型のユーティリティ
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}; // Partial: Make all properties in T optional(可选)
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const names1: Readonly<string[]> = ["Max", "Manu"]; // Readonly: Make all properties in T readonly
// names1.push("Alle");

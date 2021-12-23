// ** 交差型
type Admin = {
  name: string;
  privileges: string[];
};
// interface Admin {
//   name: string;
//   privileges: string[];
// }

type Employee = {
  name: string;
  startDate: Date;
};
// interface ElevatedEmployee extends Admin, Employee {}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

// ** 型ガード
type Combinable = string | number;
type Numeric = number;

type Universal = Combinable & Numeric;

// ->** 関数オーバーロード
function add1(a: number, b: number): number;
function add1(a: string, b: string): string;
function add1(a: string, b: number): string;
function add1(a: number, b: string): string;
function add1(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const overrideResult = add1(1, " TypeScript"); //'Hello TypeScript'
overrideResult.split(" "); //['Hello', 'TypeScript']

// ->** オプショナルチェイン
const fetchedUserData = {
  id: "u1",
  name: "user1",
  job: {
    title: "Developer",
    description: "TypeScript",
  },
};
console.log(fetchedUserData.job && fetchedUserData.job.title);
console.log(fetchedUserData?.job?.title);

// ->** NULL合体演算子
const userInput = null;
const storeData = userInput || "DEFAULT";
const userInput1 = "";
const storeData1 = userInput ?? "DEFAULT";
const userInput2 = undefined;
const storeData2 = userInput ?? "DEFAULT"; //"DEFAULT"

type UnknownEmployee = Employee | Admin;
function printEmployeeInfo(emp: UnknownEmployee) {
  console.log(emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("startDate: " + emp.startDate);
  }
}

printEmployeeInfo(e1);
printEmployeeInfo({ name: "Manu", startDate: new Date() });

class Car {
  drive() {
    console.log("カーを運転中...");
  }
}

class Trunk {
  drive() {
    console.log("トラックを運転中...");
  }
  loadCardo(amount: number) {
    console.log("荷物が載せています... " + amount);
  }
}

type Vehicle = Car | Trunk;

const v1 = new Car();
const v2 = new Trunk();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if ("loadCardo" in vehicle) {
    vehicle.loadCardo(1000);
  }
  if (vehicle instanceof Trunk) {
    vehicle.loadCardo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

// ** 判別可能な Union 型
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  let type;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      type = animal.type;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log(type + "の移動速度: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 100 });

//  ** 型キャスト (! エクスクラメーション)
const paragraph1 = <HTMLElement>document.getElementById("message-output")!;
const paragraph2 = document.getElementById("message-output")! as HTMLElement;
paragraph1.innerHTML = "p1";

const paragraph3 = document.getElementById("message-output");
if (paragraph3) {
  (paragraph3 as HTMLElement).innerHTML = "p3";
}

// ** インデックス型
interface ErrorContainer {
  // { email: '正しいメールアドレスではありません', username: 'ユーザ名に記号を含めることはできません' }
  //   id: string;
  [prop: string]: string;
}
const errorBag: ErrorContainer = {
  email: "正しいメールアドレスではありません",
  username: "ユーザ名に記号を含めることはできません",
};

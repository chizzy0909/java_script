// function Logger(constructor: Function) {
//   console.log("ログ出力中...");
//   console.log(constructor);
// }

// @Logger
// class Person1 {
//   name = "Max";

//   constructor() {
//     console.log("Personオブジェクトを作成中...");
//   }
// }

// const pers1 = new Person1();
// console.log(pers1);

// デコレータファクトリ
function Logger1(logString: string) {
  console.log("LOGGER ファクトリ"); // 1
  return function (constructor: Function) {
    console.log(logString); // 5
    console.log(constructor); // 6
  };
}

function WithTemplete(templete: string, hookId: string) {
  //   return function (_: Function) {
  //     const hookEl = document.getElementById(hookId);
  //     if (hookEl) {
  //       hookEl.innerHTML = templete;
  //     }
  //   };
  console.log("Templete ファクトリ"); // 2
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // constructor: class Person2
    // ** クラスデコレータによるクラスの変更
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();

        console.log("テンプレートを表示する"); // 3
        const hookEl = document.getElementById(hookId); // <div id="app"></div>
        // const p = new originalConstructor(); //  Person2 {name: 'Max'}
        if (hookEl) {
          hookEl.innerHTML = templete; // templete: '<h1>Personオブジェクト</h1>'
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@Logger1("ログ出力中 - Person")
@WithTemplete("<h1>Personオブジェクト</h1>", "app")
class Person2 {
  name = "Max";

  constructor() {
    console.log("Personオブジェクトを作成中..."); // 4
  }
}

const pers2 = new Person2();
console.log(pers2); // Personオブジェクトを作成中...  // Person2 {name: 'Max'}

// **** プロパティデコレータの詳細
// **** アクセサとパラメータのデコレータ
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property デコレータ"); // 1
  console.log(target, propertyName); // {constructor: ƒ, getPriceWithTax: ƒ}   'title'
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor デコレータ"); // 2
  console.log(target); // {constructor: ƒ, getPriceWithTax: ƒ}
  console.log(name); // price
  console.log(descriptor); // {get: undefined, enumerable: false, configurable: true, set: ƒ}
}
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method デコレータ"); // 4
  console.log(target); // {constructor: ƒ, getPriceWithTax: ƒ}
  console.log(name); // getPriceWithTax
  console.log(descriptor); // {writable: true, enumerable: false, configurable: true, value: ƒ}
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter デコレータ"); // 3
  console.log(target); // {constructor: ƒ, getPriceWithTax: ƒ}
  console.log(name); // getPriceWithTax
  console.log(position); // 0
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("不正な価格です - 0以下は設定できません");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// ** デコレータの実行タイミング
const p1 = new Product("book", 100);
const p2 = new Product("book", 200);

// **** 例："Autobind" デコレータの作成
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFuc = originalMethod.bind(this); // bind()
      return boundFuc;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "クリックしました！";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}
const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage); // 此处可省bind(this)

// **** デコレータによるバリデーション(validation) - 最初のステップ
interface ValidatorConfig {
  [prop: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert("正しく入力してください！");
    return;
  }
  console.log(createdCourse);
});

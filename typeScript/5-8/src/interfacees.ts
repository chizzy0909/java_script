// type Addfunc = (a: number, b: number) => number;
interface Addfunc {
  (a: number, b: number): number;
}
let add: Addfunc;
add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  //  readonly name: string;
  //  age: number;
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }
  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + this.name + ".");
    } else {
      console.log("Hi!");
    }
  }
}

let user1: Greetable;

// user1 = {
//   name: "Max",
//   age: 30,
//   greet(phrase: string) {
//     console.log(phrase + this.name + ".");
//   },
// };

user1 = new Person("");
// user1.name = "MAXX";

user1.greet("Hello, I'm ");
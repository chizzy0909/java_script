// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

// enum未定义时默认1，2，3...
enum User {
  ADMIN = 5,
  READ_ONLY = "READ_ONLY",
  AUTHOR = 10,
}

const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; //Tuple型
  user: any;
} = {
  name: "yota",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: [2, "author"],
  user: User.ADMIN,
};

person.role.push("admin"); // [1, 'author', 'admin']
person.role[0] = 10; // [10, 'author', 'admin']

person.role = [0, "admin"]; //[0, 'admin']

// let favouriteActivities: any[];
// favouriteActivities = ["sports", 1];

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

if (person.user === User.ADMIN) {
  console.log("読み取り専用ユーザ・管理者ユーザ");
}

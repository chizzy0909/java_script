// import _ from "lodash";

// console.log(_.shuffle([1, 2, 3]));

// declare var GLOBAL: any;
// console.log(GLOBAL);

import { Product } from "./product.model";
import "reflect-metadata";
import { plainToClass } from "class-transformer";
import "es6-shim";

const products = [
  { title: "商品1", price: 100 },
  { title: "商品2", price: 200 },
];

// const p1 = new Product("商品1", 10);
// const loadedProducts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });

const loaddProducts = plainToClass(Product, products);
for (const prod of loaddProducts) {
  console.log(prod.getInformation());
}

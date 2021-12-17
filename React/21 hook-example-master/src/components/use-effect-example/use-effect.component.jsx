import React, { useState, useEffect, useMemo } from "react";

export const UseEffect = () => {
  const [test1, setTest1] = useState(true);
  const [test2, setTest2] = useState(true);

  const myObj = useMemo(() => ({ a: "my value of a is " + test1 }), [test1]);
  useEffect(() => {
    console.log(myObj.a);
  }, [myObj]);

  // useMemo和useCallback接收的参数都是一样，都是在其依赖项发生变化后才执行，返回缓存的值，
  // 区别在于useMemo返回的是函数运行的结果，useCallback返回的是函数。

  // const myObj = { a: "my value of a is " + test1 };
  // useEffect(() => {
  //   console.log(myObj.a);
  // });

  // const myFunc = () => {
  //   console.log("effect run", test1);
  // };
  // useEffect(() => {
  //   myFunc();
  // });

  // // React Hook useCallback should pass an array of dependencies
  // const myFunc = useCallback(() => {
  //   console.log("effect run", test1);
  // }, [test1]);
  // useEffect(() => {
  //   myFunc();
  // }, [myFunc]);

  return (
    <div>
      <h1>test1 value: {String(test1)}</h1>
      <h1>test2 value: {String(test2)}</h1>
      <button onClick={() => setTest1(!test1)}>Flip test value1</button>
      <button onClick={() => setTest2(!test2)}>Flip test value2</button>
    </div>
  );
};

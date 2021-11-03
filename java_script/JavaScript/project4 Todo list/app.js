let add = document.querySelector("form button");
let section = document.querySelector("section");

add.addEventListener("click", e => {
    e.preventDefault();  // prevent form from being submitted

    // get the input values（记得点 button）
    // console.log(e.target);   // <button type="submit">
    // console.log(e.target.parentElement);  //<form>
    let form = e.target.parentElement;
    //console.log(form.children);  // HTMLCollection { 0: input, 1: input, 2: input, 3: button, length: 4 }
    //let todoText = form.children[0]; 
    //console.log(todoText);  // <input type="text">
    let todoText = form.children[0].value;
    let todoMonth = form.children[1].value;
    let todoDate = form.children[2].value;
    //console.log(todoText, todoMonth, todoDate); // Learn-Js 2 22

    // 文本框为空，不能添加
    if (todoText === "") {
        alert("Please Enter some Text.");
        return;  //下面的程式码不会被执行
    }

    // create a todo
    /**
     *  <div class="todo">
     *    <p class="todo-text">Learn-Js</p>
     *    <p class="todo-time">2 / 22</p>
     *  </div>
     */
    let todo = document.createElement("div");
    todo.classList.add("todo");

    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText;
    todo.appendChild(text);

    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoMonth + " / " + todoDate;
    todo.appendChild(time);

    // create green check and red trash can
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.addEventListener("click", e => {
        //console.log(e.target);  // <i class="fas fa-check">(√的部分)  <button class="complete">(整个图标)
        //console.log(e.target.parentElement); // <div class="todo" style="animation: 0.4s ease 0s …rwards running scaleUp;">
        let todoItem = e.target.parentElement;
        //todoItem.classList.add("done");  // 只能按一次
        todoItem.classList.toggle("done");  //可逆
    });
    todo.appendChild(completeButton);
    todo.style.animation = "scaleUp 0.3s forwards";

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.addEventListener("click", e => {
        //console.log(e.target); // <button class="trash">
        let todoItem = e.target.parentElement;

        // 没有这个，动画完成后会有空格，todo没有上移
        todoItem.addEventListener("animationend", () => {
            todoItem.remove();
        });
        //todoItem.remove(); //垃圾桶消失
        todo.style.animation = "scaleDown 0.3s forwards";
    });
    todo.appendChild(trashButton);

    // create an object
    let myTodo = {
        todoText: todoText,
        todoMonth: todoMonth,
        todoDate: todoDate
    };

    // store data into an array of objects
    let myList = localStorage.getItem("list");
    console, console.log(myList);
    if (myList == null) {
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else {
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }
    console.log(JSON.parse(localStorage.getItem("list")));

    // clear the inputText
    form.children[0].value = "";

    // 附加 todo 到 div
    section.appendChild(todo);
});
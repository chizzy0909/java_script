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

            // remove from local storage
            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item, index) => {
                if (item.todoText == text) {
                    myListArray.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(myListArray));
                }
            })

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

loadData();

function loadData() {

    //将内存里的一直显示在首页，按下垃圾桶能删除
    let myList = localStorage.getItem("list");
    if (myList !== null) {
        let myListArray = JSON.parse(myList);
        myListArray.forEach(item => {

            // create a todo
            let todo = document.createElement("div");
            todo.classList.add("todo");
            let text = document.createElement("p");
            text.classList.add("todo-text");
            text.innerText = item.todoText;
            let time = document.createElement("p");
            time.classList.add("todo-time");
            time.innerText = item.todoMonth + " / " + item.todoDate;
            todo.appendChild(text);
            todo.appendChild(time);

            // create green check and red trash can
            let completeButton = document.createElement("button");
            completeButton.classList.add("complete");
            completeButton.innerHTML = '<i class="fas fa-check"></i>';

            completeButton.addEventListener("click", e => {
                let todoItem = e.target.parentElement;
                todoItem.classList.toggle("done");
            });
            let trashButton = document.createElement("button");
            trashButton.classList.add("trash");
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';

            trashButton.addEventListener("click", e => {
                let todoItem = e.target.parentElement;

                todoItem.addEventListener("animationend", () => {

                    // remove from local storage
                    let text = todoItem.children[0].innerText;
                    let myListArray = JSON.parse(localStorage.getItem("list"));
                    myListArray.forEach((item, index) => {
                        if (item.todoText == text) {
                            myListArray.splice(index, 1);
                            localStorage.setItem("list", JSON.stringify(myListArray));
                        }
                    })

                    todoItem.remove();
                })

                todoItem.style.animation = "scaleDown 0.3s forwards";
            })

            todo.appendChild(completeButton);
            todo.appendChild(trashButton);

            section.appendChild(todo);
        })
    }

}

function mergeTime(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;

    //比较月份
    while (i < arr1.length && j < arr2.length) {
        //不加 Number的话是字符串比较，只会比较第一个字符，比如 12<2, A<D
        if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
            result.push(arr2[j]);
            j++;
        } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
            result.push(arr1[i]);
            i++;
        } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
            //月份相同，比较天数
            if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
                result.push(arr2[j]);
                j++;
            } else {
                result.push(arr1[i]);
                i++;
            }
        }
    }

    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }

    return result;
}

function mergeSort(arr) {
    // 自上而下的递归方法
    if (arr.length === 1) {
        return arr;
    } else {
        let middle = Math.floor(arr.length / 2);
        let right = arr.slice(0, middle);
        let left = arr.slice(middle, arr.length);
        return mergeTime(mergeSort(right), mergeSort(left));
    }
}

//console.log(mergeSort(JSON.parse(localStorage.getItem("list")))); //Array(4) [ {…}, {…}, {…}, {…} ]

let sortButton = document.querySelector("div.sort button");
sortButton.addEventListener("click", () => {
    // sort data
    let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list", JSON.stringify(sortedArray));

    // remove data
    let len = section.children.length;  // 5  => HTMLCollection { 0: div.todo, 1: div.todo, 2: div.todo, 3: div.todo, 4: div.todo, length: 5 }
    for (let i = 0; i < len; i++) {
        section.children[0].remove();
    }

    // load data
    loadData();
})



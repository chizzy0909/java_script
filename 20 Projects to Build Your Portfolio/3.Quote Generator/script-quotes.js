// let apiQuotes = [];

// Show New Quote 
function newQuote() {
    // pick a random quote from localQuotes array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log(quote);
}

// // Get Quote From API
// async function getQuote() {
//     const apiUrl = "https://type.fit/api/quotes";

//     try {
//         // fetch()接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 Promise 对象。
//         // fetch()接收到的response是一个 Stream 对象，response.json()是一个异步操作，取出所有内容，并将其转为 JSON 对象。
//         // Promise 可以使用 await 语法改写，使得语义更清晰。
//         const response = await fetch(apiUrl);
//         apiQuotes = await response.json();
//         // console.log(apiQuotes[12]);
//         newQuote();

//     } catch (error) {

//     }
// }

// // On Load
// getQuote();

newQuote();
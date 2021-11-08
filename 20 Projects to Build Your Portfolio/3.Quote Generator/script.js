const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// Loading Spinner Shown
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }

}

// Show New Quote 
function newQuote() {

    loading();

    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);

    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set Quote, Hide Loader
    // authorText.textContent = quote.author;
    quoteText.textContent = quote.text;
    complete();
}

// Get Quote From API
async function getQuote() {

    loading();

    const apiUrl = "https://type.fit/api/quotes";
    try {
        // fetch()接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 Promise 对象。
        // fetch()接收到的response是一个 Stream 对象，response.json()是一个异步操作，取出所有内容，并将其转为 JSON 对象。
        // Promise 可以使用 await 语法改写，使得语义更清晰。
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[12]);
        newQuote();

    } catch (error) {
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const tweetQuote = quoteText.innerText;
    const tweetAuthor = authorText.innerText;
    const teitterUrl = `https://twitter.com/intent/tweet?text=${tweetQuote}-${tweetAuthor}`;
    window.open(teitterUrl, '_blank');  // 浏览器总在一个新打开、未命名的窗口中载入目标文档。
}

// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();



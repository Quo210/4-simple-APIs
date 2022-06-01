const getRandomQuote = () => fetch("https://programming-quotes-api.herokuapp.com/Quotes/random").then(res => res.json());
const author = document.querySelector('h1');
const text = document.querySelector('p');
const button = document.querySelector('button');
button.addEventListener('click',postQuote)

function postQuote(){
    const quote = getRandomQuote().then(data => {
        author.textContent = data.author;
        text.textContent = `"${data.en}"`;
    })
}

postQuote();
// DOM 
const para = document.querySelector('p');
const img = document.querySelector('img');
const but = document.querySelector('button');
const urls = [];
for (let i = 1; i <= 5; i++){
    urls.push(`./assets/${i}.wav`)
};
const timer = document.querySelector('h2.timer');
function showFact(){
    fetch('https://catfact.ninja/fact').then(res => res.json() ).then(
        data => para.textContent = data.fact    
    )
}

function summonCat(){
    fetch('https://api.thecatapi.com/v1/images/search').then(
        res => res.json() ).then (
        cat => img.setAttribute('src',cat[0].url)
    )
}

function meow(){
    const meow = new Audio(urls[
        Math.floor( Math.random() * 5 )
    ]);
    meow.play();
}

function catMagic(){
    showFact(); summonCat(); meow()
}

function buttonProtection(){
    catMagic();
    but.setAttribute('disabled','true')
    setTimeout(function(){
        but.removeAttribute('disabled');
    },5000)
    countDown();
}

function countDown(){
    const a = () => timer.textContent;
    const b = (val) => timer.textContent = val; b("5"); 
    let myInt = setInterval(function(){
        console.log(a(),timer)
        if(a() == "1"){
            b(""); clearInterval(myInt);
        } else{
            b( (parseInt( a() ) - 1 ).toString() )
        }; 
    },1000)
}

but.addEventListener('click',buttonProtection);
summonCat(); showFact();

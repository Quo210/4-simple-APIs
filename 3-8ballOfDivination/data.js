const genderAPI = 'https://api.genderize.io/?name=peter&country_id=US';
const ageAPI = 'https://api.agify.io?name=michael&country_id=US';

const ball = document.querySelector('img');
const response = document.querySelector('.response');
const input = document.querySelector('input');
const button = document.querySelector('button');

function getUserName(){
    const name = input.value.toLowerCase().trim();
    if(name.length > 12 || name.length < 3){
        alert('The name must be between 3 and 12 characters long for the search to work.')
        input.value = "";
        return new Error('Name too short or too long.')
    } else {
        return name.substring(0,1).toUpperCase() + name.substring(1);
    }
}

function requestDivination(name){
    const genderAPI = `https://api.genderize.io/?name=${name}&country_id=US`; // properties are gender and probability
    const ageAPI = `https://api.agify.io?name=${name}&country_id=US`;

    fetch(genderAPI).then(res=>
        res.json()
    ).then(data => {
        if(data.gender == null){ 'returning false'
            return Promise.reject(new Error('Gender is null'))
        } else { console.log('returning data')
            return data }
    }).then(async data => {
        response.innerHTML = 'The ball is communing with the <strike class="hideme">server</strike> <span class="showme">spirits...</span>';
        const a = await new Promise(resolve => {
            setTimeout(() => resolve(data),6000)
        });
        await a
        return a
    }).then(data => {
        response.textContent = `Hello! The ball divinates that a ${data.probability * 100}% of humans named ${data.name} are ${data.gender} and...`
    } 
    ).then( async function(){
        const res = await fetch(ageAPI).then(resp => resp.json() ).then(data => data);
        await res;
        input.value = "";
        response.textContent += ` those from the US are around ${res.age} years of age.`;
    }).catch(err => {
        input.value = '';
        response.textContent = 'Oh no! The ball could not guess anything!! Try again.'
        setTimeout(function(){
            response.textContent = 'The ball waits for you...'
        },3000)
        console.error(err);
    })
    return name
}

function fullDivination(){
    requestDivination(getUserName())
}

function colorz(){
    let hue = Math.floor( Math.random() * 255 );
    let sat = 30;
    let lux = 25;
    const background = document.querySelector('html');
    const header = document.querySelector('header');
    let color1 = `hsl(${hue}, ${sat}%, ${lux-10}%)`;
    let color2 = `hsl(${hue}, ${sat}%, ${lux-15}%)`;
    background.setAttribute('style',``);
    header.setAttribute('style',``)
    background.setAttribute('style',`background-color: ${color1}`);
    header.setAttribute('style',`background-color: ${color2}`)
}

button.addEventListener('click',fullDivination)
//requestDivination('Daniel')
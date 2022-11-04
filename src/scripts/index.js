'use strict';

/**
 * Jodi-Ann Barrett
 * 
 * Simple Guessing Game using Vanilla JS
 * 
 * */

// Add event listener
function onEvent(event, selector, callback) { 
    return selector.addEventListener(event, callback);
}

// Get HTML element by id
function getElement(selector, parent = document) {
    return parent.getElementById(selector);
}

// Select HTML element by selector
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

const body = document.body;
const form = select('form');
const numberOne = select('.number-one');
const getResult = select('.get-result');
const output = select('.output p');
const restart = select('.restart');
const tryCount = select('span.tries');
const h2 = select('h2');

function isNumber(str) {
    let input = str.trim();

    if (input.length > 0 && !isNaN(input))
        return true
    
    return false;
}

function generateNumber() {    
    return Math.floor(Math.random() * 30) + 1;
}

let target = generateNumber(); // random number between 1 and 30 inclusive
let tries = 5;
tryCount.innerText = `You have ${tries} tries left`;

// adding an event listener to the getResult element
onEvent('click', getResult, function() {
    let a = numberOne.value.trim();
    console.log(`Secret number is ${target}`);

    if(isNumber(a)){
        let userVal = parseFloat(a);
        
        if(userVal > 0 && userVal < 31) { // check if entry is within range

            if(userVal === target) {
                restart.style.display = 'inline';
                this.style.display = 'none';
                body.classList.add('winner');
                h2.innerText = `Congratulations Winner!`;
                h2.style.color = '#33ab4e';
                numberOne.style.display = 'none';
                tryCount.style.display = 'none';
                output.style.display = 'none';
                numberOne.value = '';
                tries = 5;
            } else if (userVal > target) { // check if entry is higher than target           
                tryCount.innerText = `You have ${--tries} tries left`;
                output.innerText = `Oops! Try a lower number`;
                numberOne.value = '';
            } else { // entry is lower than target
                tryCount.innerText = `You have ${--tries} tries left`;
                output.innerText = `Oops! Try a higher number`;
                numberOne.value = '';
            }
            
            if(tries === 0) { // check if user has exhausted all tries
                restart.style.display = 'inline';
                this.style.display = 'none';
                output.innerText = `Aww :-( Better Luck Next Time. Number is: ${target}`;
                numberOne.value = '';
                tries = 5;
            }

        } else { 
            tryCount.innerText = `You have ${--tries} tries left`;
            output.innerText = `Enter a number between 1 and 30`;
            numberOne.value = '';
        }

    } else {
        tryCount.innerText = `You have ${--tries} tries left`;
        output.innerText = `Please, enter valid numbers`;
    }
});

// adding an event listener to the restart element
onEvent('click', restart, function (){
    window.location.reload();
});

// clear all fields on page reload
window.addEventListener('load', () => {
    numberOne.value = '';
});

// prevent keydown on Enter key to submit form
window.addEventListener('keydown', (event) => {
    if(event.key === "Enter") {
        event.preventDefault();
        return false;
    }
});


const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;
/*Even though you set an input element to be a number, JavaScript receives a string value. 
You need to write a function to clean the string value and ensure you have a number.
Start by declaring a cleanInputString function that takes a str parameter.*/

/*The split() method splits a string into an array of substrings, and returns the new array.
You can pass in an optional separator which tells the method where each split should happen.*/

function cleanInputString(str) {
    
    /*While looping through the string works, creating a new array is inefficient for memory
     and runtime performance. Instead, you can use Regular Expressions 
     (referred to as "regex") to match specific characters.
     Regex in JavaScript is indicated by a pattern wrapped in forward slashes
    
    const strArray = str.split('');
    const cleanStrArray =[];
    for (let i = 0; i < strArray.length; i++) {
        if (!["+", "-"," "].includes(strArray[i])){
            cleanStrArray.push(strArray[i]);
          }
    }*/
    /*The pattern you currently have will match the exact text hello, which is not 
    what you want to match. You want to look for +, -, or spaces. Replace the 
    pattern in your regex variable with \+- to look for plus and minus characters.
    \s for white space*/
    const regex = /[+-\s]/g;
    return str.replace(regex,"");
}

function isInvalidInput(str) {
    /*const regex = /[0-9]+e[0-9]+/i;*/
    const regex = /\d+e\d+/i;
    return str.match(regex);
}

function addEntry() {
    //const targetId = '#' + entryDropdown.value;
    //const targetInputContainer = document.querySelector(`${targetId} .input-container`);
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    /*JavaScript has a feature called template literals, which allow you to interpolate 
    variables directly within a string. Template literals are denoted with backticks ``, 
    as opposed to single or double quotes. Variables can be passed in to a template literal 
    by surrounding the variable with ${} – the value of the variable will be inserted into
    the string.*/

    /*You will want to number the entries a user adds. To get all of the number inputs, 
    you can use the querySelectorAll() method.The querySelectorAll() method returns a 
    NodeList of all the elements that match the selector. A NodeList is an array-like 
    object, so you can access the elements using bracket notation.*/

    /*Each entry will have a text input for the entry's name, and a number input for the 
    calories. To get a count of the number of entries, you can query by text inputs. 
    Note that you cannot query by number inputs, as you have an extra number input for 
    the user's calorie budget. Pass the string input[type="text"] to the querySelectorAll() 
    method. Remember that you will need to use single quotes for your string, so that you 
    can use double quotes within. This will return a NodeList of all the text inputs in the 
    form. You can then access the length property of the NodeList to get the number of 
    entries. Do this on the same line.*/

    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
    const HTMLString = `
    <label for= "${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name"/>
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calories"/>`;
    //targetInputContainer.innerHTML += HTMLString; 
    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
    
}

function calculateCalories(e) {
    e.preventDefault();
    isError = false;

    const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    
}

function getCaloriesFromInputs(list) {
    let calories = 0;
    for (let i = 0; i < list.length; i++) {
        const currVal = cleanInputString(list[i].value);
        const invalidInputMatch = isInvalidInput(currVal);

        if (invalidInputMatch) {
            alert(`Invalid Input: ${invalidInputMatch[0]}`);
            isError = true;
            return null;
        }
        calories += Number(currVal);
    }
    return calories;
}

addEntryButton.addEventListener("click", addEntry);
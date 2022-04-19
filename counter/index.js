/**
 * People counter script
 * @author Timothy Japit
 */

// counter
let counter = document.getElementById('counter');
counter.textContent = 0;
// previous entries
let prevEntries = document.getElementById('prev-ent');
let prevOne = 0, prevTwo = 0, prevThree = 0;
prevEntries.textContent = prevOne + ", " + prevTwo + ", " + prevThree;

/**
 * decrements counter
 */
function decrement() {
    counter.textContent--;
}

/**
 * increments counter
 */
function increment() {
    counter.textContent++;
}


/**
 * Prints result to console, resets the counter, and updates the previous entries
 */
function save() {
    console.log(counter.textContent + ' people spotted');

    updatePrev();

    reset();
}


/**
 * Updates previous entries
 */
function updatePrev() {
    prevThree = prevTwo;
    prevTwo = prevOne;
    prevOne = counter.textContent;
    prevEntries.textContent = prevOne + ", " + prevTwo + ", " + prevThree;
}

/**
 * resets counter
 */
function reset() {
    counter.textContent = 0;
}

/**
 * Resets previous entries
 */
function resetPrev() {
    // confirm() pops up a dialog box
    let dialog = confirm("Reset previous entries?");
    if (dialog) {
        prevOne = 0, prevTwo = 0, prevThree = 0;
        prevEntries.textContent = prevOne + ", " + prevTwo + ", " + prevThree;
    }

}



// // buttons
// const incrementBtn = document.getElementById('increment-btn');
// // const decrementBtn = document.getElementById('decrement-btn');

// // event listeners for counters
// incrementBtn.addEventListener('click', () => {
//     counter.innerText++;
// })

// decrementBtn.addEventListener('click', () => {
//     counter.innerText--;
// })
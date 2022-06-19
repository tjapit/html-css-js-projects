/**
 * Lead tracker extension.
 * 
 * @author Timothy Japit
 */

/* vars & HTML elements */
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const clearBtn = document.getElementById("clear-btn");
const loadBtn = document.getElementById("load-btn");
const ulEl = document.querySelector("ul");

/* HELL YEAHHHHH!!!!, figured out that re-initializing 'myLeads' was causing 
* it to reset each time we switched tabs. fixed with loadLeads():20, Leads persistence
*/
let myLeads = [];

/* Leads persistence */
loadLeads();

// myLeads = ["youtube", "facebook", "google"];

/* Event listeners */
/**
 * Input element listener for keyboard events
 */
inputEl.addEventListener('keyup', event => {
    enterToSave(event);
})

/**
 * Input button listener
 */
inputBtn.addEventListener('click', saveInputClicked)

/**
 * Save Tab button listener
 */
tabBtn.addEventListener('click', saveTabClicked)

/**
 * Clear button listener
 */
clearBtn.addEventListener('click', clearClicked)

/**
 * Load button listener
 */
loadBtn.addEventListener('click', loadLeads)

/* functions */
/**
 * inputBtn behavior when button is clicked.
 */
function saveInputClicked() {
    // trim whitespace
    let inputText = inputEl.value.trim();
    // if there is input text,
    if (inputText) {
        // saves input if not empty
        saveInput(inputText, inputText);
        // render saved leads
        renderLeads(myLeads); // spread argument (see:renderLeads())
        // reset input field
        resetInput();
    } else {
        // otherwise, prints out "Empty input."
        emptyInput();
    }
}

/**
 * tabBtn behavior when button is clicked
 */
function saveTabClicked() {
    /* set permission in manifest file to access tabs (https://stackoverflow.com/questions/18436245/how-to-fetch-url-of-current-tab-in-my-chrome-extension-using-javascript) */
    // get current tab 
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
        // save current tab
        saveInput(tabs[0].title, tabs[0].url);
        // render
        renderLeads(myLeads);
    })
}

/**
 * clearBtn behavior when button is clicked
 */
function clearClicked() {
    // clear leads
    clearLeads();
    // re-render empty leads
    renderLeads(myLeads);
    // reset input
    resetInput();
}

/**
 * Saves the input when enter is pressed.
 * 
 * @param {KeyboardEvent} event keyboard event pressed
 */
function enterToSave(event) {
    if (event.code === 'Enter') {
        // prevents default behavior when 'Enter' is pressed
        event.preventDefault();
        // invokes behavior when inputBtn is clicked
        saveInputClicked();
        // resets input field
        resetInput();
    }
}

/**
 * Empty or whitespace input element
 */
function emptyInput() {
    if (myLeads.length === 0) {
        const pEl = document.createElement('p');
        pEl.textContent = "Empty input";
        ulEl.replaceChildren(pEl);
    }
}

/**
 * Saves input to leads array.
 * 
 * @param {string} inputText input string
 */
function saveInput(title, url) {
    // create object
    const link = {
        [title]: url // use [] to add the variable 'title' instead of the string 'title'
    };
    // add to the array of object literals
    myLeads.push(link);
    // save to local storage (https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage)
    localStorage.setItem('myLeads', JSON.stringify(myLeads)); // work around, stringify
    
}

/**
 * Resets the input field and maintains focus
 */
function resetInput() {
    // reset input element value/text content
    inputEl.value = "";
    // re-focuses cursor on the input element
    inputEl.focus();
}

/**
 * Clears the leads array
 */
function clearLeads() {
    // clear array
    myLeads = [];
    // clear local storage
    localStorage.clear();
}

/**
 * Loads and renders the leads stored in localStorage.
 */
function loadLeads() {
    // load leads from local storage
    const leadsFromLocal = JSON.parse(localStorage.getItem("myLeads"));
    // if leads exist
    if (leadsFromLocal) {
        // save to array
        myLeads = leadsFromLocal;
        // render
        renderLeads(leadsFromLocal); // spread argument (see:renderLeads())
    }
}


/**
 * Renders the leads into the page.
 * 
 * @param {*} leads string array of possible leads
 */
function renderLeads(leads) { // spread argument (https://stackoverflow.com/questions/2856059/passing-an-array-as-a-function-parameter-in-javascript)
    /* CHANGED: https://stackoverflow.com/questions/58552500/found-non-callable-iterator-in-reactjs-store#59756156 */
    // clearing the <ul>
    ulEl.innerHTML = "";
    
    // re-rendering everything in the array 

    // // DOM manipulation comes with a cost
    // leads.forEach(element => {
    //     // creating the <li> element
    //     const liEl = document.createElement('li');
    //     // setting the content to each item
    //     liEl.innerHTML = element;
    //     // appending the <li> element to the <ul>
    //     ulEl.appendChild(liEl);
    // });

    // construct the HTML for the list items
    
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        // leads is an array of object literals
        const element = leads[i];
        let title, url;
        // idk how else to do it, this loop gets the title and url from each object
        for (const j in element) {
            title = j;
            url = element[title];
            console.log(url);
        }
        // listItems += "<li> <a href='" + element + ".com' target='_blank'>" + element + "</a> </li>";
        
        // TEMPLATE STRING
        listItems += `
            <li> 
                <a href='${url}' target='_blank' data-content='${title}'>
                    ${title}
                </a> 
            </li>
        `;
    }

    // leads.forEach(element => {
    // }); 

    // render the list items in the unordered list
    ulEl.innerHTML = listItems;
}
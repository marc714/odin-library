// https://www.youtube.com/watch?v=NxVCq4p0Kb0    pretty good video of adding user inputs into objects

// Modals https://www.w3schools.com/howto/howto_css_modals.asp
// https://www.codexpedia.com/javascript/submitting-html-form-without-reload-the-page/
// https://www.youtube.com/watch?v=mokoauG3BAw

// modal buttons
const modal = document.getElementById("myModal");
const btnModal = document.getElementById("open-modal");
const span = document.getElementsByClassName("close")[0];

// addbook
const btnBook = document.querySelector("#submit");

// Different ways to reference the form
// const formBook = document.querySelectorAll("#form-addbook input[type=text][value='']"); // empty values
const formBook = document.getElementById("form-addbook").elements;

// btnBook.addEventListener('click', addBookToLibrary);
btnBook.addEventListener("click", addBookToLibrary);

// on user click, open the modal
btnModal.onclick = function () {
    modal.style.display = "block";
}

// on user click X, close modal
span.onclick = function () {
    modal.style.display = "none";
}

// on user click anywhere outside modal, close
window.onclick = function(e) {
    if (e.target == modal)
        modal.style.display = "none";
}

let myLibrary = [
    // {title:"Dune", author:"Frank Herbert", pages:"600", category:"scifi", read:"read"},
    // {title:"The Art of War", author:"Sun Tzu", pages:"900", category:"fiction", read:"unread"},
    // {title:"The Notebook", author:"Nicholas Sparks", pages:"1000", category:"romance", read:"unread"}
];

let dataIndexNumber = 2;

function Book(title, author, pages, category, readstatus) {   
    // the constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.category = category;
    this.read = readstatus;    
};


/*  https://javascript.plainenglish.io/proto-vs-prototype-in-js-140b9b9c8cd5 
https://youtu.be/1UTqFAjYx1k?t=720   ColorCode: JavaScript Prototypal inheritance - Tutorial
__proto__ vs prototype. 14:11  "prototype" is a property of a Constructor function. 
Also, dune.__proto__  === Book.prototype  returns True; it's the same thing, but from different ends.
Also: https://www.w3schools.com/js/js_object_prototypes.asp  You can NOT add a new property to an existing object constructor. You must add it to the constructor function. See example in the link. Or add it as shown below:
*/

/* https://levelup.gitconnected.com/javascripts-proto-vs-prototype-a21ec7f25bc1  The sole purpose of the PROTOTYPE property in a function, is to intialize the __proto__ in the new object the function it creates. The new object will have the correct blueprint (constructor) and proto. */
// https://youtu.be/mQ4oCgcgHOA?t=930  "Book.prototype.readButton is a method for Book if we didn't define that inside the original constructor function"  "Prototype is a bucket of methods that can be inherited"
// reread about Constructors aka Blueprints https://www.w3schools.com/js/js_object_constructors.asp
    //  "The JavaScript prototype property allows you to add new properties to object constructors:" 

//****  This is really good specially the 'under the hood' THIS part:  https://www.freecodecamp.org/news/a-beginners-guide-to-javascripts-prototype/  "...every function in JavaScript has a prototype property that references an object." aka  prototype: object.. so it's just a property called prototype, and it's where you put values/methods that can be inherited.  Newer 2020 article: https://www.freecodecamp.org/news/javascript-prototype-explained-with-examples/   -- also read further about "WTF dude you just recreated Classes, and see how they made the prior example much cleaner w/ Classes"

Book.prototype.readButton = function(arrayIndex){
    const readStatusText = document.querySelector(`.card-read-status[data-index-number="${arrayIndex}"]`);
    //console.log(readStatusText);

    if(this.read == "read"){
        this.read = "unread"
        readStatusText.textContent = "Unread"
    } else {
        this.read = "read";
        readStatusText.textContent = "Read"
    }

    // if(myLibrary[arrayIndex].read == "read"){
    //     myLibrary[arrayIndex].read = "unread"
    // } else {
    //     myLibrary[arrayIndex].read = "read";
    // }

    console.log("hello");
};

function readStatusComplex1(e){
    //const bookIndex = e.target.getAttribute('data-index-number');
    console.log("hello readStatusComplex(e) function");
    
}


// #3. Write a function that loops through the array and display them as cards. 
// why loop? and not the last array item? As soon as you Add Book, it should be displayed.
// https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
/* 
    let p = document.createElement("p");
    document.body.appendChild(p); 
*/
function makeLibraryCard(){
    // https://www.youtube.com/watch?v=TrGI9Yki-24
    // https://gomakethings.com/how-to-get-set-and-remove-data-attributes-with-vanilla-javascript/
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset

    const library = document.getElementById("library-container");
    // no longer using array to set index number. can cause duplicates if you push/pop.
    // const dataIndexNumber = myLibrary.length - 1;
    // dataIndexNumber++; // no need since we will use Array Index number and not deleting any array items.
    const obj = myLibrary[myLibrary.length - 1]; // selecting the object, aka the index of latest item in the array.
    //const temp = obj.readButton();
    const arrayIndex = myLibrary.length - 1;

    // New Card
    const newCard = document.createElement('div');
    newCard.classList.add("card");
    //newCard.dataset['indexNumber'] = dataIndexNumber;
    newCard.dataset['indexNumber'] = arrayIndex;

    // Delete button
    const delButton = document.createElement('button');
    delButton.textContent = "Delete";
    delButton.classList.add("card-button")
    // https://stackoverflow.com/questions/18960932/how-to-set-attribute-using-javascript-variable
    // const setAttributeVariable = `deleteCard(${dataIndexNumber})`;
    const setAttributeVariable = `deleteCard(${arrayIndex})`;
    delButton.setAttribute("onclick", setAttributeVariable)
    //button.onclick = deleteCard(dataIndexNumber);  // this just duplicates the above line.
    
    // Read status button
    const readButton = document.createElement('button');
    readButton.textContent = "Read Status";
    readButton.classList.add("read-status-button");
    readButton.dataset.indexNumber = arrayIndex;  // you can use [] or the . 
    const readButtonVariable = 'myLibrary[3].readButton()'; // holy fuck, this works too, but needs "" to turn into string, and the onclick needs to remove "".
    //readButton.setAttribute("onclick", "aFunction()") // holy fuck. you need "" on the function.
    
    // BELOW SYNTAX WORKS  <-------------------------
    readButton.setAttribute("onclick", `myLibrary[${arrayIndex}].readButton(${arrayIndex})`);
    //readButton.setAttribute("onclick", readButtonVariable);

    //readButton.setAttribute("onclick", 'readStatusComplex()');  // a dynamicly made setAttribute function needs () and "".


    //adds a new card to the end
    library.appendChild(newCard);

    // selects new card aka the newCard above:
    const lastLibraryElement = library.lastElementChild;
    
    //const newDiv = document.createElement("div"); // i can't reuse this cause newDiv is assigned to this in memory?
    

    
    for (let property in obj){
        const newDiv = document.createElement('div');
        switch(property) {
            case 'title':
                newDiv.classList.add("card-title");
                newDiv.textContent = `${obj[property]}`;
                break;
            case 'author':
                newDiv.classList.add("card-author");
                newDiv.textContent = `${obj[property]}`;
                break;
            case 'pages':
                newDiv.classList.add("card-pages");
                newDiv.textContent = `${obj[property]}`;
                break;
            case 'category':
                newDiv.classList.add("card-category");
                newDiv.textContent = `${obj[property]}`;
                break;
            case 'read':
                newDiv.classList.add("card-read-status");
                newDiv.dataset.indexNumber = arrayIndex;
                newDiv.textContent = `${obj[property]}`;
                break;
            default:
                break;
        };
        lastLibraryElement.appendChild(newDiv); //console.log(`${property}: ${obj[property]}`);
    };

    newCard.appendChild(readButton);
    newCard.appendChild(delButton);
    //newCard.className = "card";
    // library.appendChild(newDiv)
    // let lastChild = library.lastElementChild;
    // lastChild.classList.add("card");
    // lastChild.appendChild(newDiv);
};


// this will delete the html, but not the object in the array in order to preserve correct index/dataset numbers
function deleteCard(setAttributeVariable){
    // https://reactgo.com/select-element-data-attribute-js/
    const element = document.querySelector(`[data-index-number="${setAttributeVariable}"]`);
    element.remove();
    console.log("delete me")
 
 }

function addBookToLibrary(e) {
    e.preventDefault(); // needed or page will reload on submit.

    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookPages = document.getElementById("pages").value;
    const bookCatFiction = document.getElementById("cat-fiction");
    const bookCatRomance = document.getElementById("cat-romance");
    const bookCatScifi = document.getElementById("cat-scifi");
    const readStatus = document.getElementById("read-status");

    let category = "uncategorized";
    let read = "";
    
    if(bookCatFiction.checked) {
        category = "fiction";
        } else if (bookCatRomance.checked) {
            category = "romance";
            } else if (bookCatScifi.checked) {
                category = "scifi";
                };

    if(readStatus.checked) {
        read = "read";
    } else {
        read = "unread";
    };

    const book = new Book(bookTitle, bookAuthor, bookPages, category, read);

    myLibrary.push(book);
    //console.log(myLibrary)
    
    makeLibraryCard();
    modal.style.display = "none";
};



// Footer section testing
const footer = document.getElementById('footerbtn');
//footer.addEventListener('click', footerbtn);
function footerbtn(e){
    const temp = e.target.getAttribute('data-name');
    console.log("Button's data attribute is: " + temp);
}
footer.onclick = footerbtn;


function readStatusComplex(e){
    //const bookIndex = e.target.getAttribute('data-index-number');
    console.log("hello readStatusComplex(e) function");
    
}

// make starting library
window.onload = () => {
    const book1 = new Book("Dune", "Frank Herbert", "600", "scifi", "read");
    myLibrary.push(book1);
    makeLibraryCard();

    const book2 = new Book("The Art of War", "Sun Tzu", "900", "fiction", "unread");
    myLibrary.push(book2);
    makeLibraryCard();

    const book3 = new Book("The Notebook", "Nicholas Sparks", "1000", "romance", "unread");
    myLibrary.push(book3);
    makeLibraryCard();
}

// https://bobbyhadz.com/blog/javascript-get-data-attribute-from-event-object
// https://thewebdev.info/2021/03/20/how-to-get-the-id-of-the-clicked-element-in-the-javascript-click-handler/



// onclick button needs to be declared so it's written into the html. it's not dynamic.
// aka onclick="variable.readStatus()"
//   since i'm calling a method, i need the original objects variable.
// an array doesn't hold the variables of the objects, just the objects themselves.
// since we are NOT deleting array items when we use deleteCard, we can define declare what array location is when we make the book. 
/*

onclick needs to find the object 
onclick itself can have a data field
*/

// https://stackoverflow.com/questions/15097315/change-onclick-attribute-with-javascript



// //   TESTING BELOW


// // https://www.youtube.com/watch?v=vt9mDhKINZU
// // https://bobbyhadz.com/blog/javascript-loop-through-form-elements
// // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements
// const formTest = document.querySelector("#form-test").elements; // .elements returns an array
// const buttonTest = document.getElementById("button-test")
// // const formTest = document.querySelector('#form-test').value;
// // const test = document.getElementById("uniqueID").value;
// buttonTest.addEventListener("click", testAddBookToLibrary); // why doesn't 'submit' work


// // we can't use a loop with a checkbox form control. it will just collect the item.value aka 'read' whether it's checked or not. So you have to add the extra checkbox validation.
// // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
// function testAddBookToLibrary(e) {
//     e.preventDefault();
//     console.log('hello');

//     // Method 1 For Loop
//     let obj = {};
//     for(let i = 0; i < formTest.length; i++){
//         let item = formTest.item(i); //why a () instead of [].. because it's not after the variable, but at the end of item???
//         // if (formTest[i].type === "text" && formTest[i].nodeName === "INPUT"){
//         //     obj[item.name] = item.value;
//         //     console.log(obj);
//         // }
//         if(formTest[i].type != "submit" && formTest[i].type !="checkbox") {
//             obj[item.name] = item.value;  // doesnt work w/ radio buttons
//         }
//         if(formTest[i].type == "checkbox"){
//             if(formTest[i].checked == true){
//                 obj[item.name] = "read"
//             } else {
//                 obj[item.name] = "not read"
//             }
//         } 
        
//     }

//     myLibrary.push(obj);
// }

// /* 
// let book = formTest[0]
// console.log(book);  // returns entire input
// console.log(book.value); // returns "Dune"
// */

// // Method 2 FormData
// // https://www.youtube.com/watch?v=9mhyo1wQGeI

// function myFormData(){
//     const formTest2 = document.getElementById("form-test");
//     const formData = new FormData(formTest2);
//     for (const [key, value] of formData) {
//         console.log(`${key}: ${value}\n`);
//       }
// }
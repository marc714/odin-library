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
    {title:"Dune", author:"Frank Herbert", pages:"600", category:"scifi", read:"read"},
    {title:"The Art of War", author:"Sun Tzu", pages:"900", category:"fiction", read:"unread"},
    {title:"The Notebook", author:"Nicholas Sparks", pages:"1000", category:"romance", read:"unread"}
];

function Book(title, author, pages, category, readstatus) {   
    // the constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.category = category;
    this.read = readstatus;    
};

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
    const dataIndexNumber = myLibrary.length - 1;
    
    // New Card
    const newCard = document.createElement('div');
    newCard.classList.add("card");
    newCard.dataset['indexNumber'] = dataIndexNumber;

    // Delete button
    const button = document.createElement('button');
    button.textContent = "Delete";
    button.classList.add("card-button")
    // https://stackoverflow.com/questions/18960932/how-to-set-attribute-using-javascript-variable
    const setAttributeVariable = `deleteCard(${dataIndexNumber})`;
    button.setAttribute("onclick", setAttributeVariable)
    //button.onclick = deleteCard(dataIndexNumber);  // this just duplicates the above line.
    
    //adds a new card to the end
    library.appendChild(newCard);

    // selects new card aka the newCard above:
    const lastLibraryElement = library.lastElementChild;
    
    //const newDiv = document.createElement("div"); // i can't reuse this cause newDiv is assigned to this in memory?
    const obj = myLibrary[myLibrary.length - 1];

    
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
                newDiv.textContent = `${obj[property]}`;
                break;
            default:
                break;
        };
        lastLibraryElement.appendChild(newDiv); //console.log(`${property}: ${obj[property]}`);
    };
    newCard.appendChild(button);
    //newCard.className = "card";
    // library.appendChild(newDiv)
    // let lastChild = library.lastElementChild;
    // lastChild.classList.add("card");
    // lastChild.appendChild(newDiv);
};

function deleteCard(currentCard){
    // https://reactgo.com/select-element-data-attribute-js/
    const element = document.querySelector(`[data-index-number="${currentCard}"]`);
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
};
















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
const notesContainer = document.querySelector(".notes-container");
const createbtn = document.querySelector(".btn");

// Load saved notes from localStorage
function shownotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    
    // Reattach event listeners after loading
    let notes = document.querySelectorAll(".input-box");
    notes.forEach(nt => {
        nt.addEventListener("keyup", updateStorage);
    });
}
shownotes();

// Function to update localStorage
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Event listener for creating new notes
createbtn.addEventListener("click", () => {
    let inputbox = document.createElement("p");
    let img = document.createElement("img");

    inputbox.className = "input-box";
    inputbox.setAttribute("contenteditable", "true");
    img.src = "images/del.jpg";

    inputbox.appendChild(img);
    notesContainer.appendChild(inputbox);

    inputbox.addEventListener("keyup", updateStorage); // Ensure changes are saved
    updateStorage();
});

// Event listener for handling delete and input events
notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

// Prevent new paragraph on "Enter" key
document.addEventListener("keydown", event => {
    if (event.key === 'Enter') {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

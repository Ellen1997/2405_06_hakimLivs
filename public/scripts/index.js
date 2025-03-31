console.log("hello")
const openModalBtn = document.querySelector("#openModalBtn"); 
const closeModalBtn = document.querySelector("#closeModal"); 
const loginModal = document.querySelector("#loginModal"); 

openModalBtn.addEventListener("click", (e) =>{
e.preventDefault();
loginModal.style.display = "block";
});

closeModalBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    loginModal.style.display = "none";
});

window.addEventListener("click", (e) =>{
    if (e.target === loginModal){
        loginModal.style.display = "none";
    }
});
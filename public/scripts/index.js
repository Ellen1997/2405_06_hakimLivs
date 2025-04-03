
const openModalBtn = document.querySelector("#openModalBtn"); 
const closeModalBtn = document.querySelector("#closeModal"); 
const loginModal = document.querySelector("#loginModal"); 

const loginForm = document.querySelector(".loginForm");
const loginText = document.querySelector("#loginText");
const email = document.querySelector("#email");
const password = document.querySelector("#password"); 
const btnCreateAccount = document.querySelector("#btn-create-account");

const emailInput = document.querySelector("#username-input-login");
const passwordInput = document.querySelector("password-input-login");

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

loginForm.addEventListener("click", (e)=>{
    e.preventDefault();

    const username = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username] === password) {
        localStorage.setItem("currentUser", username);
        window.location.href = "./login.html";
    } else {
        alert("Inloggning misslyckades. Du har uppgett ett felaktigt användarnamn eller lösenord.");
    }
});

    btnCreateAccount.addEventListener("click", () => {
    const username = emailInput.value.tirm();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        alert("Vänligen fyll i både email och lösenord.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        alert("Denna användare finns redan. Logga in istället.");
        return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Konto skapat! Du kan nu logga in.");
});
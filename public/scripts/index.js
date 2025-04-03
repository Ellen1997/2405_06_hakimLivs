const openModalBtn = document.querySelector("#openModalBtn"); 
const closeModalBtn = document.querySelector("#closeModal"); 
const loginModal = document.querySelector("#loginModal"); 
const accountModal = document.querySelector("#accountModal");
const logoutBtn = document.querySelector("#logoutBtn");

const loginForm = document.querySelector(".loginForm");
const loginText = document.querySelector("#loginText");
const createAccountBtn = document.querySelector("#btn-create-account");

const emailInput = document.querySelector("#username-input-login");
const passwordInput = document.querySelector("#password-input-login");
let currentUser = localStorage.getItem("currentUser");

openModalBtn.addEventListener("click", (e) =>{
e.preventDefault();
if(!currentUser){
    loginModal.style.display = "block";
}else{
    accountModal.style.display = "block";
}
});

closeModalBtn.addEventListener("click", (e) =>{
    loginModal.style.display = "none";
    accountModal.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () =>{

    if (!localStorage.getItem("currentUser")){
        loginModal.style.display = "none";
    }else{
        accountModal.style.display = "none";
    }
});

loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if(!email || !password){
        alert("Vänligen fyll i både e-post och lösenord för att logga in.");
        return;
    }
    
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email] && users[email] === password) {
        localStorage.setItem("currentUser", email);
        loginModal.style.display = "none";
        loginState();

        const siteContent = document.querySelector("siteContent");
        if(siteContent) siteContent.style.display = "none";
    } else {
        alert("Inloggning misslyckades. Du har uppgett ett felaktigt användarnamn eller lösenord.");
    }
});

createAccountBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        alert("Vänligen fyll i både email och lösenord.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
        alert("Denna användare finns redan. Logga in istället.");
        return;
    }

    users[email] = password;
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("currentUser", email);

    loginModal.style.display = "none";
    loginState();

    const siteContent = document.querySelector("#siteContent");
    if(siteContent) siteContent.style.display = "block";
});

logoutBtn.addEventListener("click", () =>{
    localStorage.removeItem("currentUser");
    loginState();
    accountModal.style.display = "none";
});

const loginState =()=>{
    currentUser = localStorage.getItem("currentUser");

    if(!currentUser){
        loginText.textContent = "Logga in";
    } else {
        loginText.textContent = "Ditt konto";
    }
}

window.addEventListener("DOMContentLoaded", loginState);
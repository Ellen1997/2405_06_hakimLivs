// const openModalBtn = document.querySelector("#openModalBtn"); 
// const loginModal = document.querySelector("#loginModal"); 
// const accountModal = document.querySelector("#accountModal"); 
// const closeLoginModal = document.querySelector("#closeLoginModal");
// const closeAccountModal = document.querySelector("#closeAccountModal");
// const logoutBtn = document.querySelector("#logoutBtn");


// const userIsLoggedIn = false;


// openModalBtn.addEventListener("click", (e) => {
//   e.preventDefault();
  
//   if(userIsLoggedIn) {
//     accountModal.style.display = "block";
//   } else {
//     loginModal.style.display = "block";
//   }
// });

// closeLoginModal.addEventListener("click", (e) => {
//   e.preventDefault();
//   loginModal.style.display = "none";
// });

// closeAccountModal.addEventListener("click", (e) => {
//   e.preventDefault();
//   accountModal.style.display = "none";
// });


// function loginSuccess() {
//   userIsLoggedIn = false;
//   openModalBtn.textContent = "Ditt konto"; 
//   loginModal.style.display = "none";
// }

// logoutBtn.addEventListener("click", () =>{
//   localStorage.removeItem("currentUser");
//   loginText.textContent = "Logga in";
//   accountModal.style.display = "none";
//   window.location.href = "index.html";
// })
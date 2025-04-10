const loginModal = document.querySelector("#loginModal");
const createAccountModal = document.querySelector("#createAccountModal");
const accountModal = document.querySelector("#accountModal");

const openModalBtn = document.querySelector("#openModalBtn");
const closeModal = document.querySelector("#closeModal");
const closeCreateAccountModal = document.querySelector(
  "#closeCreateAccountModal"
);
const closeAccountModal = document.querySelector("#closeAccountModal");
const createAccountBtn = document.querySelector("#createAccountBtn");
const loginForm = document.querySelector(".loginForm");

const registerForm = document.querySelector("#registerForm");
const email = document.querySelector("#email-input-register");
const mobileNumber = document.querySelector("#mobile-input-register");
const password = document.querySelector("#password-input-register");
const logoutBtn = document.querySelector("#logoutBtn");

openModalBtn.addEventListener("click", () => {
  showModal(loginModal);
});

closeModal.addEventListener("click", () => {
  hideModal(loginModal);
});

closeCreateAccountModal.addEventListener("click", () => {
  hideModal(createAccountModal);
});

closeAccountModal.addEventListener("click", () => {
  hideModal(accountModal);
});

createAccountBtn.addEventListener("click", () => {
  email.value = "";
  mobileNumber.value = "";
  password.value = "";
  hideModal(loginModal);
  showModal(createAccountModal);
});

function showModal(modal) {
  modal?.classList.add("show");
  modal?.classList.remove("hide");
}

function hideModal(modal) {
  modal?.classList.remove("show");
  modal?.classList.add("hide");
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email-input-login").value;
  const password = document.getElementById("password-input-login").value;

  try {
    const response = await fetch(
      "https://be-webshop-2025-fe-two.vercel.app/api/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      document.getElementById("loginText").innerHTML = "Ditt Konto";
      hideModal(loginModal);
      showModal(accountModal);
    } else {
      alert(
        data.error ||
          "Inloggning misslyckades. Du har uppgett ett felaktigt användarnamn eller lösenord"
      );
    }
  } catch (error) {
    alert("Något gick fel vid inloggning.");
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailValue = email.value.trim();
  const mobileNumberValue = mobileNumber.value.trim();
  const passwordValue = password.value;

  try {
    const response = await fetch(
      "https://be-webshop-2025-fe-two.vercel.app/api/users/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailValue,
          mobileNumber: mobileNumberValue,
          password: passwordValue,
          username: emailValue.split("@")[0],
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      hideModal(createAccountModal);
      showModal(accountModal);
    } else {
      alert(data.error || "kunde inte skapa konto.");
    }
  } catch (error) {
    alert("Någon gick fel vid registering.");
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  document.getElementById("loginText").innerHTML = "Logga in";
  hideModal(accountModal);
  alert("Du har loggats ut.");
});

if (localStorage.getItem("token")) {
  document.getElementById("loginText").innerHTML = "Ditt Konto";
}

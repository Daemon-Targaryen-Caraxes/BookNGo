// Simulated login credentials
const validUsername = "vijay";
const validPassword = "123456789";

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === validUsername && password === validPassword) {
    alert("Login successful!");
  } else {
    alert("Incorrect username or password.");
  }
});
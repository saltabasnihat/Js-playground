let isLoggedIn = false;
let loginBtn = document.getElementById("login-btn");

let isUserValid = (username, password) => {
  return localStorage.getItem(username) === password;
};

loginBtn.addEventListener("click", () => {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (isUserValid(username, password)) {
    isLoggedIn = true;
    alert("You have successfully logged in!");
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password. Please try again.");
  }
});

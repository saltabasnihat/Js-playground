let signUpBtn = document.getElementById("signup-btn");

let storeUser = (username, password) => {
  localStorage.setItem(username, password);
};

let isSignUpFormValid = (username, password) => {
  return username.trim() !== "" && password.trim() !== "";
};

signUpBtn.addEventListener("click", () => {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (isSignUpFormValid(username, password)) {
    if (!localStorage.getItem(username)) {
      storeUser(username, password);
      alert("You have successfully signed up! You can now log in.");
      window.location.href = "loginpage.html";
    } else {
      alert("Username already exists. Please choose another one.");
    }
  } else {
    alert("Username and password should not be empty. Please try again.");
  }
});

function switchToRegister() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("registerBox").classList.remove("hidden");
}

function switchToLogin() {
  document.getElementById("registerBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
}

function register() {
  const user = document.getElementById("registerUser").value;
  const pass = document.getElementById("registerPass").value;
  if (user && pass) {
    localStorage.setItem(`user_${user}`, pass);
    alert("Registrierung erfolgreich!");
    switchToLogin();
  } else {
    alert("Bitte fülle alle Felder aus.");
  }
}

function login() {
  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;
  const stored = localStorage.getItem(`user_${user}`);
  if (stored && stored === pass) {
    localStorage.setItem("loggedInUser", user);
    showMainContent();
  } else {
    alert("Login fehlgeschlagen. Falsche Daten?");
  }
}

function showMainContent() {
  document.getElementById("authContainer").classList.add("hidden");
  document.getElementById("mainContent").classList.remove("hidden");
}

function checkLogin() {
  const loggedIn = localStorage.getItem("loggedInUser");
  if (loggedIn) {
    showMainContent();
  }
  createRain();
}

function createRain() {
  const rain = document.getElementById('rain');
  for (let i = 0; i < 150; i++) {
    const drop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = 0.5 + Math.random() * 1.5 + 's';
    drop.style.animationDelay = Math.random() * 5 + 's';
    rain.appendChild(drop);
  }
}

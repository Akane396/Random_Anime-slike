// Prijava
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("password").value;
    
    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
      localStorage.setItem("loggedInUser", username);
      alert("Prijava uspešna!");
      window.location.href = "Anime.html";
    } else {
      alert("Pogrešno korisničko ime ili šifra.");
    }
  });
}

function togglePassword() {
  const input = document.getElementById("password");
  const icon = document.getElementById("slikica");
  
  if (input.type === "password") {
    input.type = "text";
    icon.src = "../slike/nevidjivo.png"; // stavi ovde sliku "zatvorenog" oka
    icon.alt = "Sakrij lozinku";
  } else {
    input.type = "password";
    icon.src = "../slike/hide.png"; // stavi ovde sliku "otvorenog" oka
    icon.alt = "Prikaži lozinku";
  }
}
// regristriranje
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("repassword").value;
    
    if (localStorage.getItem(username)) {
      alert("Korisničko ime već postoji!");
    } else {
      localStorage.setItem(username, password);
      alert("Registracija uspešna!");
      localStorage.setItem("loggedInUser", username);
      window.location.href = "index.html";
    }
  });
}


function togglePassword() {
  const input = document.getElementById("repassword");
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
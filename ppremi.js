  const users = [
    { username: "Adem54", password: "1234" },
    { username: "itači", password: "učiha123" },
    { username: "Kitbruda", password: "Mađara123" },
    { username: "test", password: "test" }
  ];

  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const un = document.getElementById("loginUsername").value.trim();
    const pw = document.getElementById("password").value.trim();
    const err = document.getElementById("error");

    const found = users.find(user => user.username === un && user.password === pw);

    if (found) {
      localStorage.setItem("loggedUser", un);
      localStorage.setItem("isPremium", "true"); // Zabeleži da je prijavljen kao premijum
      window.location.href = "hanime.html";
    } else {
      err.textContent = "Pogrešno korisničko ime ili lozinka.";
    }
  });

  function togglePassword() {
    const input = document.getElementById("password");
    const icon = document.getElementById("slikica");

    if (input.type === "password") {
      input.type = "text";
      icon.src = "../slike/nevidjivo.png";
      icon.alt = "Sakrij lozinku";
    } else {
      input.type = "password";
      icon.src = "../slike/hide.png";
      icon.alt = "Prikaži lozinku";
    }
  }

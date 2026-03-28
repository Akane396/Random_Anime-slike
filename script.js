  window.onload = function () {
    // Avatar i provera korisnika
    const icon = document.getElementById("userIcon");
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    if (icon) {
      const savedIcon = localStorage.getItem("avatar_" + user);
      if (savedIcon) {
        icon.src = savedIcon;
      }
    }

    // Ako postoji img element za anime slike, učitaj ih
    if (document.getElementById('anime-img')) {
      loadImage();
    }
  };

  async function loadImage() {
    const img = document.getElementById('anime-img');
    const category = document.getElementById('category')?.value || "neko";
    const url = `https://nekos.best/api/v2/${category}`;

    img.style.opacity = '0.1';

    try {
      const res = await fetch(url);
      const data = await res.json();
      img.src = data.results[0].url;

      img.onload = () => {
        img.style.opacity = '1';
      };
    } catch (err) {
      console.error("Greška:", err);
      alert("Greška pri učitavanju slike.");
      img.style.opacity = '1';
    }
  }

  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  }

  function toggleMenu() {
    const menu = document.getElementById("userMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }

  // Registracija
  if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("regUsername").value;
      const password = document.getElementById("regPassword").value;
      if (localStorage.getItem(username)) {
        alert("Korisničko ime već postoji!");
      } else {
        localStorage.setItem(username, password);
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
      }
    });
  }

  // Prijava
  if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;
      const storedPassword = localStorage.getItem(username);
      if (storedPassword === password) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
      } else {
        alert("Pogrešno korisničko ime ili šifra.");
      }
    });
  }


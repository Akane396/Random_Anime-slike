// 1. Inicijalizacija
const client = new Appwrite.Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69d39b33002b0cac5f83');

const account = new Appwrite.Account(client);
const avatars = new Appwrite.Avatars(client); // Dodato za ikonice

// 2. Registracija
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("repassword").value;
    
    // Appwrite striktno traži email format
    const email = username.includes('@') ? username : `${username}@example.com`;
    
    try {
      // PRVO: Pokušaj obrisati staru sesiju ako postoji (čisti greške)
      try {
        await account.deleteSession('current');
      } catch (err) { /* Ignoriši ako nema sesije */ }
      
      // DRUGO: Napravi korisnika
      // Parametri: ID (unique), Email, Password, Name
      await account.create('unique()', email, password, username);
      
      console.log("Korisnik kreiran uspješno!");
      
      // TREĆE: Automatski login nakon registracije
      await account.createEmailPasswordSession(email, password);
      
      // Četvrto: Generiši URL ikonice odmah da provjeriš radi li
      const iconUrl = avatars.getInitials(username);
      console.log("Ikonica generisana:", iconUrl.toString());
      
      alert("Registracija i prijava uspješne!");
      
      // Prebaci ga na Anime.html (ili index.html zavisno šta želiš)
      window.location.href = "anime.html";
      
    } catch (error) {
      console.error("Greška pri registraciji:", error.message);
      
      // Specifična upozorenja za tebe dok testiraš na telefonu:
      if (error.message.includes("8 characters")) {
        alert("Greška: Lozinka mora imati najmanje 8 znakova!");
      } else if (error.message.includes("already exists")) {
        alert("Greška: Ovaj korisnik (email) već postoji!");
      } else {
        alert("Greška: " + error.message);
      }
    }
  });
}

function togglePassword() {
  const input = document.getElementById("repassword");
  const icon = document.getElementById("slikica");
  
  if (input.type === "password") {
    input.type = "text";
    icon.src = "nevidjivo.png"; // stavi ovde sliku "zatvorenog" oka
    icon.alt = "Sakrij lozinku";
  } else {
    input.type = "password";
    icon.src = "hide.png"; // stavi ovde sliku "otvorenog" oka
    icon.alt = "Prikaži lozinku";
  }
}
// 1. Inicijalizacija
const client = new Appwrite.Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69d39b33002b0cac5f83');

const account = new Appwrite.Account(client);
const avatars = new Appwrite.Avatars(client);

// DODATAK: Provjera čim se stranica učita
// Ako je korisnik već ulogovan, nemoj mu dati da opet vidi formu za login
window.onload = async () => {
  try {
    const user = await account.get();
    console.log("Korisnik već ulogovan:", user.name);
    window.location.href = "anime.html";
  } catch (error) {
    console.log("Niko nije ulogovan, prikaži formu.");
  }
};

// 2. Prijava (Login)
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("password").value;
    const email = username.includes('@') ? username : `${username}@example.com`;
    
    try {
      // PRVO: Provjeravamo ima li aktivnih sesija da izbjegnemo onu grešku
      try {
        await account.deleteSession('current');
      } catch (err) {
        // Ako nema aktivne sesije, ignorisemo grešku i idemo dalje na login
      }
      
      // DRUGO: Pravimo novu sesiju
      await account.createEmailPasswordSession(email, password);
      
      const user = await account.get();
      localStorage.setItem("loggedInUser", user.name);
      
      alert("Prijava uspješna!");
      window.location.href = "anime.html";
      
    } catch (error) {
      console.error(error);
      alert("Greška: Pogrešno korisničko ime ili šifra (min. 8 znakova).");
    }
  });
}

function togglePassword() {
  const input = document.getElementById("password");
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
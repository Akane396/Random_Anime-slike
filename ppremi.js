// Inicijalizacija
const client = new Appwrite.Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69d39b33002b0cac5f83');

const account = new Appwrite.Account(client);

document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("password").value.trim();
  const err = document.getElementById("error");
  
  const email = username.includes('@') ? username : `${username}@example.com`;
  
  try {
    // 1. SILOM OBRIŠI STARU SESIJU (Rješenje za tvoju grešku)
    try {
      await account.deleteSession('current');
      console.log("Stara sesija obrisana.");
    } catch (sessionErr) {
      // Ignorišemo grešku ako sesija uopšte nije ni postojala
    }
    
    // 2. Sada pokušaj novu prijavu
    await account.createEmailPasswordSession(email, password);
    
    // 3. Uzmi podatke o korisniku
    const user = await account.get();
    
    // PROVJERA LABELE: 'premium'
    const isPremiumUser = user.labels && user.labels.includes("premium");
    
    if (isPremiumUser) {
      localStorage.setItem("isPremium", "true");
      alert("Dobrodošli, Premium korisniče!");
      window.location.href = "hanime.html";
    } else {
      localStorage.setItem("isPremium", "false");
      alert("Prijavljeni ste na običan račun.");
      window.location.href = "anime.html";
    }
    
  } catch (error) {
    console.error(error);
    // Ako je lozinka prekratka ili pogrešna
    if (error.message.includes("8 characters")) {
      err.textContent = "Greška: Lozinka mora imati najmanje 8 znakova!";
    } else {
      err.textContent = "Pogrešno korisničko ime ili lozinka.";
    }
  }
});


function togglePassword() {
  const input = document.getElementById("password");
  const icon = document.getElementById("slikica");
  
  if (input.type === "password") {
    input.type = "text";
    icon.src = "nevidjivo.png";
    icon.alt = "Sakrij lozinku";
  } else {
    input.type = "password";
    icon.src = "hide.png";
    icon.alt = "Prikaži lozinku";
  }
}

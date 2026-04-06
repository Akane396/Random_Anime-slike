// 1. Inicijalizacija Appwrite-a
const client = new Appwrite.Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69d39b33002b0cac5f83');

const account = new Appwrite.Account(client);

// 2. Zaštita stranice i učitavanje slike
window.onload = async function() {
  try {
    const user = await account.get();
    
    // Provjera da li korisnik ima "premium" labelu
    const isPremium = user.labels && user.labels.includes("premium");
    
    if (!isPremium) {
      alert("Pristup odbijen! Ova stranica je samo za Premium korisnike.");
      window.location.href = "anime.html";
      return;
    }
    
    loadImage();
    
  } catch (error) {
    window.location.href = "index.html";
  }
};

// 3. Funkcija za učitavanje slika
async function loadImage() {
  const img = document.getElementById('image');
  const category = document.getElementById('category')?.value || "hentai";
  const url = `https://nekobot.xyz/api/image?type=${category}`;
  
  if (!img) return;
  img.style.opacity = '0.1';
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.message;
    
    img.onload = () => {
      img.style.opacity = '1';
    };
  } catch (err) {
    img.style.opacity = '1';
  }
}

// 4. ISPRAVLJENO: Odjava samo iz Premium dijela
// Ova funkcija se poziva na tvoje dugme "Odjavi se" u Premium dijelu
function logout() {
  // Ne brišemo sesiju (account.deleteSession), samo čistimo lokalne podatke
  // i vraćamo korisnika na običnu stranicu.
  localStorage.removeItem("isPremium");
  alert("Izlazak iz Premium zone...");
  window.location.href = "anime.html";
}

// Dugme za povratak (identično kao logout u tvom slučaju)
const idina = document.getElementById('vrati');
if (idina) {
  idina.addEventListener('click', function() {
    window.location.href = "anime.html";
  });
}
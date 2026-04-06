// 1. Inicijalizacija (Isto kao u postavkama)
const client = new Appwrite.Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69d39b33002b0cac5f83');

const account = new Appwrite.Account(client);
const storage = new Appwrite.Storage(client);
const avatars = new Appwrite.Avatars(client);

const bucketId = '69d3a6bc003b65ec71d3';

// 2. Funkcija za učitavanje profila i ikonice
async function checkUser() {
  try {
    const user = await account.get();
    const icon = document.getElementById("userIcon");
    
    if (icon) {
      // Koristimo getFileView kao u tvojim postavkama jer kažeš da tamo radi
      if (user.prefs && user.prefs.avatarId) {
        const fileUrl = storage.getFileView(bucketId, user.prefs.avatarId);
        icon.src = fileUrl.toString();
      } else {
        // Ako nema slike, inicijali
        icon.src = avatars.getInitials(user.name).toString();
      }
    }
    
    // Ako imaš anime slike na ovoj stranici, učitaj ih
    if (document.getElementById('anime-img')) {
      loadImage();
    }
    
  } catch (error) {
    console.error("Nisi ulogovan:", error);
    window.location.href = "./index.html";
  }
}

// 3. Pokretanje provjere čim se stranica učita
window.addEventListener('load', checkUser);

// 4. Funkcija za Anime slike
async function loadImage() {
  const img = document.getElementById('anime-img');
  const category = document.getElementById('category')?.value || "neko";
  const url = `https://nekos.best/api/v2/${category}`;
  
  if (!img) return;
  img.style.opacity = '0.1';
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.results[0].url;
    img.onload = () => { img.style.opacity = '1'; };
  } catch (err) {
    console.error("Greška kod slike:", err);
    img.style.opacity = '1';
  }
}

// 5. Odjava (Logout)
async function logout() {
  try {
    await account.deleteSession('current');
    alert("Odjavljeni ste!");
    window.location.href = "./index.html";
  } catch (error) {
    window.location.href = "./index.html";
  }
}

// 6. Meni (Toggle)
function toggleMenu() {
  const menu = document.getElementById("userMenu");
  if (menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
}

// 5. Prikaz/skrivanje menija
function toggleMenu() {
  const menu = document.getElementById("userMenu");
  if (menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
}
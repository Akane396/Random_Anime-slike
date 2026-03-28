async function loadImage() {
  const img = document.getElementById('image');
  const category = document.getElementById('category')?.value || "hentai";
  const url = `https://nekobot.xyz/api/image?type=${category}`;
  
  img.style.opacity = '0.1';
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.message;
    img.onload = () => {
      img.style.opacity = '1';
    };
  } catch (err) {
    console.error("Greška:", err);
    alert("Greška pri učitavanju slike.");
    img.style.opacity = '1';
  }
}
window.onload = loadImage

const idina = document.getElementById('vrati')
idina.addEventListener('click' ,  function () {
  location.href = "Anime.html"
})

const isPremium = localStorage.getItem("isPremium");
const user = localStorage.getItem("loggedUser");

if (isPremium !== "true" || !user) {
  // Ako nije prijavljen kao premium korisnik, vrati ga na prijavu
  window.location.href = "prijavadabi.html";
}

function logout() {
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("isPremium");
  window.location.href = "prijavadabi.html";
}


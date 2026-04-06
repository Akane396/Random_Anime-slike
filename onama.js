// 1. Inicijalizacija Appwrite-a
const client = new Appwrite.Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69d39b33002b0cac5f83');

const account = new Appwrite.Account(client);

// 2. Provjera da li je korisnik ulogovan
window.onload = async function() {
  try {
    // Pokušavamo dohvatiti korisnika
    await account.get();
    console.log("Korisnik je prijavljen, dozvoljen pristup stranici O Nama.");
  } catch (error) {
    // Ako baci grešku, znači da nije ulogovan
    alert("Morate biti prijavljeni da biste vidjeli ovu stranicu.");
    window.location.href = "index.html";
  }
};

// 3. Tvoje dugme za povratak
const idina = document.getElementById('vrati');
if (idina) {
  idina.addEventListener('click', function() {
    window.location.href = "Anime.html";
  });
}
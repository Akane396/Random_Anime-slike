// 1. Inicijalizacija
const client = new Appwrite.Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69d39b33002b0cac5f83');

const account = new Appwrite.Account(client);
const storage = new Appwrite.Storage(client);
const avatars = new Appwrite.Avatars(client);

const bucketId = '69d3a6bc003b65ec71d3'; // ID onog bucketa koji si napravio

const fileInput = document.getElementById('iconUpload');
const preview = document.getElementById('avatarPreview');
const usernameDisplay = document.getElementById('username');

// 2. Prikaz pri učitavanju
window.onload = async function() {
  try {
    const user = await account.get();
    usernameDisplay.textContent = user.name;
    
    // Proveravamo da li korisnik ima sačuvan ID slike u prefs (podešavanjima)
    if (user.prefs.avatarId) {
      const fileUrl = storage.getFileView(bucketId, user.prefs.avatarId);
      preview.src = fileUrl.toString();
    } else {
      // Ako nema sliku, prikaži inicijale (nema više default.png)
      preview.src = avatars.getInitials(user.name).toString();
    }
  } catch (error) {
    usernameDisplay.textContent = "Nema prijavljenog korisnika";
    // window.location.href = "prijava.html";
  }
};

// 3. Preview slike pre slanja
fileInput.onchange = function() {
  const file = fileInput.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
  }
};

// 4. SPAŠAVANJE NA RAČUN (Appwrite Storage)
async function saveIcon() {
  const file = fileInput.files[0];
  if (!file) return alert("Izaberi sliku!");
  
  try {
    // A. Upload fajla u Storage
    const uploadedFile = await storage.createFile(bucketId, 'unique()', file);
    
    // B. Spasi ID te slike u profil korisnika (prefs)
    // Tako ćemo znati koju sliku da učitamo sledeći put
    await account.updatePrefs({
      avatarId: uploadedFile.$id
    });
    
    alert("Ikonica sačuvana na tvom računu!");
  } catch (error) {
    console.error(error);
    alert("Greška pri čuvanju: " + error.message);
  }
}
    
const iditamo =  document.getElementById('hanimec')
  
iditamo.addEventListener('click',

function () {
  location.href = "./prijavadabi.html"
})
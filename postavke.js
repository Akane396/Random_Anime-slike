    const fileInput = document.getElementById('iconUpload');
    const preview = document.getElementById('avatarPreview');
    const usernameDisplay = document.getElementById('username');
    const loggedInUser = localStorage.getItem("loggedInUser");
    
    // Prikaz slike i imena korisnika
    window.onload = function() {
      if (loggedInUser) {
        usernameDisplay.textContent = loggedInUser;
        
        const savedAvatar = localStorage.getItem("avatar_" + loggedInUser);
        if (savedAvatar) {
          preview.src = savedAvatar;
        } else {
          preview.src = "../slike/default.png";
        }
      } else {
        usernameDisplay.textContent = "Nema prijavljenog korisnika";
      }
    };
    
    // Prikaz nove slike pre čuvanja
    fileInput.onchange = function() {
      const file = fileInput.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(e) {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    };
    
    function saveIcon() {
      const file = fileInput.files[0];
      if (!file) return alert("Izaberi sliku!");
      
      const reader = new FileReader();
      reader.onload = function(e) {
        const base64 = e.target.result;
        if (loggedInUser) {
          localStorage.setItem("avatar_" + loggedInUser, base64);
          alert("Ikonica sačuvana!");
        }
      };
      reader.readAsDataURL(file);
    }
    
  const iditamo =  document.getElementById('hanimec')
  
  iditamo.addEventListener('click',  function () {
      location.href = "prijavadabi.html"
  })
  
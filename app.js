const cars = [
  { id: 1, brand: "Renault Clio", status: "available", color: "black", type: "hybride", image: "assets/voiture/renault.jpeg", description: "Polyvalente et confortable, elle offre un équilibre parfait entre agence urbaine et confort sur autoroute.", price:"300000Ar" },
  { id: 2, brand: "Peugeot 208", status: "available", color: "white", type: "essence", image: "assets/voiture/peugeot.jpeg", description: "Avec son design moderne et ses technologies embarquées, elle est idéale pour les trajets urbains et les escapades en week-end.", price:"400000Ar" },
  { id: 3, brand: "Citroën C3", status: "available", color: "black", type: "diesel", image: "assets/voiture/citroen.jpeg", description: "Un véhicule élégant et fiable, parfait pour les trajets quotidiens en ville.", price:"200000Ar" },
  { id: 4, brand: "Ford Fiesta", status: "available", color: "grey", type: "essence", image: "assets/voiture/ford.jpeg", description: "Compacte et performante, elle est idéale pour la conduite en ville et les trajets courts.", price:"350000Ar" },
  { id: 5, brand: "Volkswagen Golf", status: "unavailable", color: "white", type: "hybride", image: "assets/voiture/wagen.jpeg", description: "Un véhicule familial de grande qualité, avec un design moderne et des performances élevées." , price:"250000Ar"},
]



function renderHomePage() {
  const homePage = document.getElementById("page-home");
  
  // On sélectionne par exemple les 3 premières voitures pour la page d'accueil
  const topCars = cars.slice(0, 3);

  homePage.innerHTML = `
  <div>
    <div class="home-header">
      <h1>Votre prochaine aventure commence ici</h1>
      <p>Louez la voiture parfaite pour vos voyages. Des citadines aux sportives, trouvez le véhicule idéal à prix imbattable.</p>
      <button class="home-header-btn" onclick="showPage('cars')">Découvrez nos voitures <i class="fas fa-arrow-right"></i></button>
    </div>
    <section class="features">
        <div class="feature">
          <span><i class="fas fa-shield-alt"></i></span>
          <h3>Assurance complète incluse</h3>
          <p>Protection complète sur tous nos véhicules.</p>
        </div>
        <div class="feature">
          <span><i class="fas fa-clock"></i></span>
          <h3>Disponible 24/7</h3>
          <p>Réservez et récupérez votre voiture à tout moment.</p>
        </div>
        <div class="feature">
          <span><i class="fas fa-tag"></i></span>
          <h3>Prix imbattable</h3>
          <p>Des tarifs compétitifs pour tous les budgets.</p>
        </div>
    </section>

    <section class="discover">
      <h2>Découvrez nos voitures</h2>
      <p>Nos voitures les plus demandées par nos clients</p>
      <div class="car-demo">
        ${topCars.map(car => `
          <div class="car-card">
            <div class="car-image" style="background-image: url(${car.image}); background-size: cover; background-position: center;">
                <button class="car-type">${car.type}</button>
            </div>
            
            <div class="car-content">
              <h2>${car.brand}</h2>
              <p> ${car.description} </p>
              <p>Status: ${car.status === "available" ? '✅' : '❌'} </p> 
            </div>
            ${getReservationButton(car)}
          </div>
        `).join('')}
      </div>
      <button class="home-footer-btn" onclick="showPage('cars')">Voir toutes les voitures <i class="fas fa-arrow-right"></i></button>
       
       
      
    </section>

  </div>`
}

function renderAuthPage() {
  const authPage = document.getElementById("page-auth");
  authPage.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <button id="tab-login" class="active" onclick="toggleAuth('login')">
          Connexion</button>
          <button id="tab-register" onclick="toggleAuth('register')">Inscription</button>
        </div>

        <form id="login-form" onsubmit="handleAuth(event, 'login')">
        <span class="auth-icon"><i class="fas fa-user-circle" style="font-size: 24px;
        color:#f39c12"></i></span>
        <h3>Connexion</h3>
          <input type="email" id="login-email" placeholder="Email" required>
          <input type="password" id="login-pass" placeholder="Mot de passe" required>
          <button type="submit" class="btn-main">Se connecter</button>
        </form>

        <form id="register-form" style="display:none;" onsubmit="handleAuth(event, 'register')">
        <span class="auth-icon"><i class="fas fa-user-circle" style="font-size: 24px;
        color:#f39c12"></i></span>
        <h3>Inscription</h3>
          <input type="text" id="reg-name" placeholder="Nom complet" required>
          <input type="email" id="reg-email" placeholder="Email" required>
          <input type="password" id="reg-pass" placeholder="Mot de passe" required>
          <button type="submit" class="btn-main">S'inscrire</button>
        </form>
      </div>
    </div>
  `;
}

function toggleAuth(tab) {
  const isLogin = tab === 'login';
  document.getElementById("login-form").style.display = isLogin ? 'block' : 'none';
  document.getElementById("register-form").style.display = isLogin ? 'none' : 'block';
  document.getElementById("tab-login").classList.toggle('active', isLogin);
  document.getElementById("tab-register").classList.toggle('active', !isLogin);
}
function handleAuth(event, type) {
  event.preventDefault();
  let userData = {};

  let allUsers = JSON.parse(localStorage.getItem('pwa_registered_users')) || [];

  if(type === 'register') {
   
      const newName = document.getElementById("reg-name").value;
      const newEmail=  document.getElementById("reg-email").value;
      const NewPassword = document.getElementById("reg-pass").value;

      const alreadyExists = allUsers.find(u => u.email === newEmail);
      if (alreadyExists) {
        alert("Cet email est déjà utilisé !");
        return;
      }

      // Ajouter l'utilisateur à la liste
      const newUser = { name: newName, email: newEmail, password: NewPassword };
      allUsers.push(newUser);
      localStorage.setItem('pwa_registered_users', JSON.stringify(allUsers));
      
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      toggleAuth('login');
  }else{
      const emailLogin = document.getElementById("login-email").value;
      const passLogin = document.getElementById("login-pass").value;

      const userFound = allUsers.find(u => u.email === emailLogin && u.password === passLogin);

      if (userFound) {
        localStorage.setItem('pwa_user', JSON.stringify(userFound));
        alert(`Ravi de vous revoir, ${userFound.name} !`);
        updateNavbar();
        showPage('home');
      } else {
        alert("Erreur : Compte inexistant ou mauvais mot de passe.");
      }
  }
}

function updateNavbar() {
  const user = JSON.parse(localStorage.getItem('pwa_user'));
  const authBtn = document.getElementById('nav-auth-btn');
  
  if (user) {
    authBtn.innerHTML = `${user.name} <i class="fas fa-sign-out-alt"></i>`;
    authBtn.onclick = logout; // On crée une fonction logout pour vider le localStorage
  } else {
    authBtn.innerHTML = "Connexion";
    authBtn.onclick = () => showPage('auth');
  }
}

function logout() {
  localStorage.removeItem('pwa_user');
  updateNavbar();
  showPage('home');
}

function showPage(pageId, data = null) {
  // 1. Cacher toutes les pages
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });

  // 2. Afficher la section cible
  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.style.display = 'block';
  }

  // 3. L'AIGUILLAGE : Appeler la bonne fonction de rendu
  if (pageId === 'home') {
    renderHomePage();
  } else if (pageId === 'cars') {
    displayCars();
  } else if (pageId === 'auth') {
    renderAuthPage();
  } else if (pageId === 'reserve') {
    // Si on va sur réservation, on passe l'ID de la voiture (data)
    renderBookingPage(data); 
  } else if (pageId === 'my-bookings') {
    renderMyBookingsPage();
  }
}

showPage('home'); 

function getReservationButton(car) {
  const user = JSON.parse(localStorage.getItem('pwa_user'));

  if (car.status === "unavailable") {
    return `<button class="btn-reserve" disabled>Indisponible</button>`;
  }

  if (!user) {
    return `<button class="btn-reserve" onclick="showPage('auth')">Se connecter pour réserver</button>`;
  }

  return `<button class="btn-reserve" onclick="goToBooking(${car.id})">Réserver</button>`;
}

function goToBooking(carId) {
    showPage('reserve', carId);
}


const carListContainer = document.getElementById("car-list");

function displayCars() {
  const carPage = document.getElementById("page-cars");
  
  carPage.innerHTML = `
    <div class="cars-container">
      <h1>Nos Véhicules Disponibles</h1>
      <div class="car-grid" id="grid-container"></div>
    </div>
  `;

  const gridContainer = document.getElementById("grid-container");

  cars.forEach(car => {
    const card = document.createElement("div");
    card.className = "card-car";
    
    card.innerHTML = `
      <div class="car-image-box" style="background-image: url(${car.image}); background-size: cover; background-position: center;">
          <span class="badge-type">${car.type}</span>
      </div>
      <div class="content-car">
        <h2>${car.brand}</h2>
        <p class="car-desc">${car.description}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; padding:1rem">
            <span class="price-tag">${car.price} <small>/semaine</small></span>
            <p>Statut: ${car.status === "available" ? '✅' : '❌'}</p>
        </div>
      </div>
      <div style="padding: 0 20px 20px 20px;">
        ${getReservationButton(car)}
      </div>
    `;
    gridContainer.appendChild(card);
  });
}
function renderBookingPage(carId) {
  const car = cars.find(c => c.id === carId);
  const user = JSON.parse(localStorage.getItem('pwa_user'));
  const reservePage = document.getElementById("page-reserve");

  reservePage.innerHTML = `
    <div class="booking-container">
      <div class="card-car">
        <div class="booking-car-image" style="background-image: url(${car.image}); background-size: cover; background-position: center;">
        <button class="btn-back" onclick="showPage('cars')"><i class="fas fa-arrow-left"></i> Retour</button>
        </div>
        
        <div class="booking-car-info">
          <h2>${car.brand}</h2>
          <p>${car.description}</p>
          <p class="price-tag">Prix: ${car.price} Ar/semaine</p>
        </div>
      </div>

      <div class="booking-form-card">
        <h3>Finalisez votre réservation</h3>
        <form id="final-booking-form" style="padding: 1rem; gap: 1rem; display: flex; flex-direction: column;" onsubmit="confirmBooking(event, ${car.id})">
          <label>Nom Complet</label>
          <input type="text" value="${user.name}" disabled>
          
          <label>Date de début</label>
          <input type="date" id="start-date" required min="${new Date().toISOString().split('T')[0]}">
          
          <label>Date de fin</label>
          <input type="date" id="end-date" required>
          
          <div class="total-preview">
             <p>Statut du compte : <span style="color: green;">Vérifié ✅</span></p>
          </div>
          
          <button type="submit" class="btn-main">Confirmer la réservation</button>
        </form>
      </div>
    </div>  `
}

function confirmBooking(event, carId) {
  event.preventDefault();
  
  const car = cars.find(c => c.id === carId);
  const user = JSON.parse(localStorage.getItem('pwa_user'));
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  const bookingData = {
    id: Date.now(), // ID unique pour la réservation
    userName: user.name,
    carBrand: car.brand,
    carId: car.id,
    startDate: startDate,
    endDate: endDate
  }
  let allBookings = JSON.parse(localStorage.getItem('pwa_bookings')) || [];
  allBookings.push(bookingData);
  localStorage.setItem('pwa_bookings', JSON.stringify(allBookings));

  car.status = "unavailable";
  alert(`Merci ${user.name}, votre réservation pour la ${car.brand} du ${startDate} au ${endDate} a été confirmée !`);
  showPage('my-bookings');
}

function renderMyBookingsPage() {
  const container = document.getElementById("page-my-bookings");
  const bookings = JSON.parse(localStorage.getItem('pwa_bookings')) || [];

  container.innerHTML = `
    <div class="bookings-list-container">
      <h2>Mes Réservations</h2>
      ${bookings.length === 0 ? '<p>Aucune réservation pour le moment.</p>' : `
        <table class="bookings-table">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Voiture</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${bookings.map(b => `
              <tr>
                <td>${b.userName}</td>
                <td>${b.carBrand}</td>
                <td>${b.startDate}</td>
                <td>${b.endDate}</td>
                <td>
                  <button class="btn-edit" onclick="editBooking(${b.id})"><i class="fas fa-edit"></i></button>
                  <button class="btn-delete" onclick="deleteBooking(${b.id})"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `}
      <button onclick="showPage('cars')" class="btn-outline">Réserver une autre voiture</button>
    </div>
  `
}

function deleteBooking(id) {
    if(confirm("Annuler cette réservation ?")) {
        let bookings = JSON.parse(localStorage.getItem('pwa_bookings'));
        const bookingToDelete = bookings.find(b => b.id === id);
        
        // Rendre la voiture à nouveau disponible
        const car = cars.find(c => c.id === bookingToDelete.carId);
        if(car) car.status = "available";
        
        // Filtrer la liste
        bookings = bookings.filter(b => b.id !== id);
        localStorage.setItem('pwa_bookings', JSON.stringify(bookings));
        renderMyBookingsPage();
    }
}
displayCars();
updateNavbar();
function getUsers() {
  let users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

document.getElementById('show-register').addEventListener('click', () => {
  document.querySelector('.welcome-screen').style.display = 'none';
  document.querySelector('.register-screen').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', () => {
  document.querySelector('.register-screen').style.display = 'none';
  document.querySelector('.welcome-screen').style.display = 'block';
});

document.getElementById('register-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;
  const users = getUsers();

  if (users.some(user => user.username === username)) {
    alert('Este usuario ya está registrado.');
    return;
  }

  users.push({ username, password });
  saveUsers(users);
  alert('Usuario registrado con éxito.');
  document.querySelector('.register-screen').style.display = 'none';
  document.querySelector('.welcome-screen').style.display = 'block';
});

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const users = getUsers();
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    localStorage.setItem('loggedInUser', username);
    document.querySelector('.welcome-screen').style.display = 'none';

    if (username === 'admin' && password === 'admin123') {
      document.getElementById('admin-panel').style.display = 'block';
      updateAdminPanel();
    } else {
      document.querySelector('.content').classList.add('active');
      document.querySelector('.ads').style.display = 'block';
    }
  } else {
    alert('Credenciales incorrectas');
  }
});

function logout() {
  localStorage.removeItem('loggedInUser');
  location.reload();
}

document.getElementById('ad-click').addEventListener('click', function () {
  alert('¡Gracias por hacer clic en el anuncio!');
  let adClicks = parseInt(localStorage.getItem('adClicks')) || 0;
  let revenue = parseFloat(localStorage.getItem('revenue')) || 0;
  adClicks++;
  revenue += 0.05;
  localStorage.setItem('adClicks', adClicks.toString());
  localStorage.setItem('revenue', revenue.toFixed(2));

  const user = localStorage.getItem('loggedInUser');
  if (user === 'admin') updateAdminPanel();
});

function updateAdminPanel() {
  const users = getUsers();
  const adClicks = localStorage.getItem('adClicks') || '0';
  const revenue = localStorage.getItem('revenue') || '0.00';

  document.getElementById('admin-user-count').textContent = users.length;
  document.getElementById('admin-ad-clicks').textContent = adClicks;
  document.getElementById('admin-revenue').textContent = parseFloat(revenue).toFixed(2);
}

// Mantener sesión si ya estaba iniciada
const loggedInUser = localStorage.getItem('loggedInUser');
if (loggedInUser) {
  document.querySelector('.welcome-screen').style.display = 'none';
  if (loggedInUser === 'admin') {
    document.getElementById('admin-panel').style.display = 'block';
    updateAdminPanel();
  } else {
    document.querySelector('.content').classList.add('active');
    document.querySelector('.ads').style.display = 'block';
  }
}

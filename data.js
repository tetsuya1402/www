// 🌙 Відновлення теми при завантаженні
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}
function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

// 👤 Відображення користувача
const user = localStorage.getItem('user');
const loginLink = document.getElementById('login-link');
const logoutBtn = document.getElementById('logout-btn');
const welcomeText = document.getElementById('welcome-text');

function updateUserUI() {
  if (user) {
    welcomeText.textContent = `👋 Вітаю, ${user}`;
    loginLink.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  }
}
function logout() {
  localStorage.removeItem('user');
  window.location.reload();
}
updateUserUI();

// 📦 Базові товари
const defaultProducts = [
  {
    id: 1,
    name: "Футболка біла",
    price: 500,
    category: "Футболки",
    image: "images/product1.jpg",
    description: "Легка та зручна футболка білого кольору з 100% бавовни."
  },
  {
    id: 2,
    name: "Костюм",
    price: 700,
    category: "Костюми",
    image: "images/product2.jpg",
    description: "Елегантний костюм для особливих випадків."
  },
  {
    id: 3,
    name: "Куртка",
    price: 5100,
    category: "Куртки",
    image: "images/product3.jpg",
    description: "Тепла куртка для холодної погоди з водовідштовхувальним покриттям."
  },
  {
    id: 4,
    name: "Кроссовки",
    price: 4100,
    category: "Кроссовки",
    image: "images/product4.jpg",
    description: "Зручні кросівки для спорту та прогулянок."
  }
];

// ➕ Адмінські товари
const adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
const products = [...defaultProducts, ...adminProducts];

// 🖼️ Вивід товарів
function displayProducts(items) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  items.forEach(product => {
    productList.innerHTML += `
      <div class="card">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
        </a>
        <p>${product.price} грн</p>
        <button onclick="addToCart(${product.id})">До кошика</button>
      </div>
    `;
  });
}

// 🛒 Додавання до кошика
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ id, size: 'M' }); // За замовчуванням M
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Товар додано до кошика!");
}

// 🔍 Пошук і фільтрація
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');

function filterProducts() {
  const query = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) &&
    (category === '' || p.category === category)
  );
  displayProducts(filtered);
}

searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);

// ▶️ Старт: вивести всі товари
displayProducts(products);
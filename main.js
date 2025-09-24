async function loadJSON(url) {
  const response = await fetch(url);
  return response.json();
}

function renderProducts(containerId, products) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  products.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
      ${item.description ? `<p>${item.description}</p>` : ""}
      <span class="price">${item.price.toFixed(2)} €</span>
    `;
    container.appendChild(div);
  });
}

async function init() {
  // Ρυθμίσεις site
  const settings = await loadJSON("data/settings/general.json");
  document.getElementById("sitename").innerText = settings.sitename;
  document.getElementById("logo").src = settings.logo;
  document.body.style.backgroundImage = `url(${settings.background})`;
  document.body.style.backgroundSize = "cover";

  // Φόρτωμα προϊόντων
  const coffees = await Promise.all([
    loadJSON("data/coffees/espresso.json"),
  ]);
  const drinks = await Promise.all([
    loadJSON("data/drinks/tea.json"),
  ]);
  const snacks = await Promise.all([
    loadJSON("data/snacks/sandwich.json"),
  ]);

  renderProducts("coffees", coffees);
  renderProducts("drinks", drinks);
  renderProducts("snacks", snacks);
}

init();

document.addEventListener("DOMContentLoaded", async () => {
  await loadResources();
  addOptions();
});

let products = [];

async function loadResources() {
  try {
    let response = await fetch("assets/products.json");
    products = await response.json();
  } catch (error) {
    console.error("Erro ao carregar os produtos:", error);
  }
}

function verifyProducts(event) {
  event.preventDefault();
  let search = document.getElementById("search").value;
  let productName = document.getElementById("product-name");
  let productPrice = document.getElementById("product-price");

  let foundProduct = products.find((product) => product.name === search);

  if (foundProduct) {
    productName.innerText = foundProduct.name;
    productPrice.innerText = formaterPrice(foundProduct.price);
  } else {
    productName.innerText = "Produto não encontrado";
    productPrice.innerText = "";
  }
}

function formaterPrice(price) {
  let formatted = price.toFixed(2).replace(".", ",");
  return `R$ ${formatted}`;
}

function addOptions() {
  let datalist = document.getElementById("options");

  products.forEach((product) => {
    let option = document.createElement("option");
    option.value = product.name;
    datalist.appendChild(option);
  });
}

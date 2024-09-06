document.addEventListener("DOMContentLoaded", async () => {
  await loadResources();
  addOptions();
});

let products = [];

async function loadResources() {
  try {
    let response = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRwFqwwwOjkAgtasNkmpHB0dnbMx6H0i9vUllrklX-5Up3378g8ng1irJN_NIIWPmmg4XQeIn-NlitI/pub?output=csv"
    );
    products = await response.text();
    products = csvToJson(products);
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
  price = Number(price);
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

function csvToJson(csv) {
  const lines = csv.split("\n");
  const result = [];
  var headers = lines[0].replace(/"/g, "").replace("\r", "").split(",");

  for (let line = 1; line < lines.length; line++) {
    const obj = {};
    const currentLine = lines[line]
      .replace(/"/g, "")
      .replace("\r", "")
      .split(",");

    for (let collumn = 0; collumn < headers.length; collumn++) {
      obj[headers[collumn]] = currentLine[collumn];
    }

    result.push(obj);
  }

  return result;
}

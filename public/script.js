const data = {
  produtos: [
    {
      id: 1,
      nome: "Camisa Polo Ralph Lauren Vermelha",
      preco: 599.9,
      categoria: "camisas",
      imagem: "https://www.cavalheirosoutlet.com.br/cdn/shop/products/Arquivo_006_3.jpg?v=1679939470",
      descricao: "Camisa Polo clássica em vermelho vibrante, confeccionada em algodão piqué.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Camisa Polo Ralph Lauren Azul Marinho",
      preco: 599.9,
      categoria: "camisas",
      imagem: "https://cdn-images.farfetch-contents.com/18/49/77/38/18497738_39918889_1000.jpg",
      descricao: "Camisa Polo azul marinho, corte slim fit.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Camisa Polo Ralph Lauren Branca",
      preco: 599.9,
      categoria: "camisas",
      imagem: "https://images.tcdn.com.br/img/img_prod/422345/camisa_polo_ralph_lauren_branca_1727_1_20170802113102.jpg",
      descricao: "Camisa Polo branca clássica e versátil.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "Camisa Polo Ralph Lauren Verde",
      preco: 599.9,
      categoria: "camisas",
      imagem: "https://adaptive-images.uooucdn.com.br/tr:w-1100,h-1594,c-at_max,pr-true,q-90/a22362-ogxys3lhyz0/pv/33/5a/db/5ddccae8d6f6bf34d4e51f845d.jpg",
      descricao: "Camisa Polo verde, leve e confortável.",
      emEstoque: false
    },
    {
      id: 5,
      nome: "Camisa Polo Ralph Lauren Preta",
      preco: 599.9,
      categoria: "camisas",
      imagem: "https://cdn-images.farfetch-contents.com/14/85/47/56/14854756_24244158_600.jpg",
      descricao: "Camisa Polo preta, estilo atemporal.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Camisa Polo Ralph Lauren Cinza Mescla",
      preco: 599.9,
      categoria: "camisas",
      imagem: "https://adaptive-images.uooucdn.com.br/ik-seo/tr:w-1100,h-1594,c-at_max,pr-true,q-90/a22362-ogxys3lhyz0/pv/f4/ed/e7/0ced8dc73d96bbc355167d3175/camisa-polo-ralph-lauren-custom-fit-masculina-black-icon-cinza-mescla-large-2.jpg",
      descricao: "Camisa Polo cinza mescla, moderna e discreta.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "Camisa Polo Ralph Lauren Rosa",
      preco: 599.9,
      categoria: "camisas",
      imagem: "https://www.cavalheirosoutlet.com.br/cdn/shop/products/Arquivo_001_10.jpg?v=1679939578",
      descricao: "Camisa Polo rosa, toque suave e elegante.",
      emEstoque: false
    },
    {
      id: 8,
      nome: "Camisa Polo Ralph Lauren Amarela",
      preco: 599.9,
      categoria: "camisas",
      imagem: "https://http2.mlstatic.com/D_NQ_NP_694733-MLB110673627499_042026-O.webp",
      descricao: "Camisa Polo amarela, vibrante e cheia de personalidade.",
      emEstoque: true
    }
  ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

function formatPrice(preco) {
  return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", produto.id);
  card.style.border = "1px solid #ccc";
  card.style.padding = "10px";
  card.style.background = "#f9f9f9";

  const title = document.createElement("h2");
  title.textContent = produto.nome;
  title.classList.add("card-title");

  const img = document.createElement("img");
  img.src = produto.imagem;
  img.alt = produto.nome;
  img.style.width = "150px";

  const price = document.createElement("p");
  price.textContent = formatPrice(produto.preco);

  const category = document.createElement("p");
  category.textContent = `Categoria: ${produto.categoria}`;

  const btnDetails = document.createElement("button");
  btnDetails.textContent = "Ver detalhes";
  btnDetails.addEventListener("click", () => showProductDetails(produto));

  const btnHighlight = document.createElement("button");
  btnHighlight.textContent = "Destacar";
  btnHighlight.addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(price);
  card.appendChild(category);
  card.appendChild(btnDetails);
  card.appendChild(btnHighlight);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";
  produtos.forEach(produto => {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    console.log(card.getAttribute("data-id"));
    card.style.margin = "10px";
  });
}

function renderCategories() {
  categorySelect.innerHTML = "";
  const todas = document.createElement("option");
  todas.value = "todas";
  todas.textContent = "Todas";
  categorySelect.appendChild(todas);
  const categorias = [...new Set(data.produtos.map(p => p.categoria))];
  categorias.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
}

function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p>${formatPrice(produto.preco)}</p>
    <p>Categoria: ${produto.categoria}</p>
    <p>${produto.emEstoque ? "Em estoque" : "Fora de estoque"}</p>
    <p>${produto.descricao}</p>
  `;
}

function filterProducts() {
  const texto = searchInput.value.toLowerCase();
  const categoria = categorySelect.value;
  return data.produtos.filter(p => {
    const matchNome = p.nome.toLowerCase().includes(texto);
    const matchCategoria = categoria === "todas" || p.categoria === categoria;
    return matchNome && matchCategoria;
  });
}

searchInput.addEventListener("input", () => {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
  renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);

const link = "https://striveschool-api.herokuapp.com/books";
const bookContainer = document.getElementById("book-container");
const cartList = document.getElementById("cart-list");
const totalPriceEl = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartDisplay() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((book, index) => {
    total += book.price;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
          ${book.title} - € ${book.price.toFixed(2)}
          <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})">Rimuovi</button>
        `;
    cartList.appendChild(li);
  });

  totalPriceEl.textContent = `Totale: € ${total.toFixed(2)}`;
}

// Aggiunge al cart
function addToCart(book) {
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

// Rimuove dal cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

// Ottenimento libri
fetch(link)
  .then((response) => response.json())
  .then((books) => {
    books.forEach((book) => {
      const col = document.createElement("div");
      col.className = "col-sm-6 col-md-4 col-lg-3";

      col.innerHTML = `
            <div class="card h-100 shadow-sm">
              <img src="${book.img}" class="card-img-top" alt="${book.title}">
              <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title text-truncate">${book.title}</h5>
                <p class="card-text">Prezzo: € ${book.price.toFixed(2)}</p>
                <div class="mt-auto d-flex justify-content-between">
                  <button class="btn btn-danger scarta-btn">Scarta</button>
                  <button class="btn btn-success compra-btn">Compra ora</button>
                </div>
              </div>
            </div>
          `;

      col.querySelector(".scarta-btn").addEventListener("click", () => col.remove());
      col.querySelector(".compra-btn").addEventListener("click", () => addToCart(book));

      bookContainer.appendChild(col);
    });
  })
  .catch((error) => console.error("Errore nel recupero dei dati:", error));

updateCartDisplay();

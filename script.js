const link = "https://striveschool-api.herokuapp.com/books";
const bookContainer = document.getElementById("book-container");

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
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">Prezzo: € ${book.price.toFixed(2)}</p>
          <button class="btn btn-danger mt-auto scarta-btn">Scarta</button>
        </div>
      </div>
    `;

      col.querySelector(".scarta-btn").addEventListener("click", () => {
        col.remove();
      });

      bookContainer.appendChild(col);
    });
  })
  .catch((error) => console.error("Errore nel recupero dei dati:", error));

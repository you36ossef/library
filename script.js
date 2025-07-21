document.addEventListener("DOMContentLoaded", () => {
  const triggerBtn = document.querySelector(".open-form-btn");
  const popup = document.getElementById("bookPopup");
  const bookForm = document.getElementById("bookForm");
  const bookList = document.querySelector(".book-list");

  let bookShelf = [];

  triggerBtn.onclick = () => (popup.style.display = "flex");

  popup.onclick = (e) => {
    if (e.target === popup) popup.style.display = "none";
  };

  bookForm.onsubmit = (e) => {
    e.preventDefault();

    const bookData = {
      title: document.getElementById("inputTitle").value,
      author: document.getElementById("inputAuthor").value,
      pages: document.getElementById("inputPages").value,
      read: document.getElementById("inputRead").checked,
    };

    bookShelf.push(bookData);
    bookForm.reset();
    popup.style.display = "none";
    renderBooks();
  };

  function renderBooks() {
    bookList.innerHTML = "";

    bookShelf.forEach((book, idx) => {
      const card = document.createElement("div");
      card.className = "book-card";

      card.innerHTML = `
        <h3>"${book.title}"</h3>
        <p>By ${book.author}</p>
        <p>${book.pages} pages</p>
        <button class="read-status ${
          book.read ? "read" : ""
        }" data-index="${idx}">
          ${book.read ? "Read" : "Not Read"}
        </button>
        <button class="delete-btn" data-index="${idx}">Delete</button>
      `;

      bookList.appendChild(card);
    });

    document.querySelectorAll(".read-status").forEach((btn) => {
      btn.onclick = () => {
        const i = btn.getAttribute("data-index");
        bookShelf[i].read = !bookShelf[i].read;
        renderBooks();
      };
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.onclick = () => {
        const i = btn.getAttribute("data-index");
        bookShelf.splice(i, 1);
        renderBooks();
      };
    });
  }
});

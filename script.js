// Función para crear una tarjeta (card) de producto
function createCard(product) {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.src = product.image;
    image.classList.add("card-image");

    const title = document.createElement("h3");
    title.innerText = product.title;

    const description = document.createElement("p");
    description.innerText = product.description;

    const price = document.createElement("h4");
    price.innerText = `$${product.price}`;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const like = document.createElement("button");
    like.classList.add("like");
    like.innerText = "♥";
    let liked = false;
    like.addEventListener("click", () => {
        if (liked) {
            like.classList.remove("liked");
            liked = false;
        } else {
            like.classList.add("liked");
            liked = true;
        }
    });

    const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.innerText = "X";
    remove.addEventListener("click", () => {
        card.remove();
    });

    actions.appendChild(like);
    actions.appendChild(remove);

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(actions);

    const cardContainer = document.getElementById("card-container");
    cardContainer.appendChild(card);
}

// Función para obtener datos de una API y crear nodos dinámicamente
function fetchAndCreateCards() {
    const apiUrl = "https://fakestoreapi.com/products";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Filtrar productos por categoría
            const category = "electronics"; // Cambia esta categoría según lo que necesites
            const filteredProducts = data.filter(product => product.category === category);

            // Crear tarjetas solo para los productos filtrados
            filteredProducts.forEach(product => {
                createCard(product);
            });
        })
        .catch(error => {
            console.error("Error al obtener los datos de la API:", error);
        });
}

// Llamada a la función para obtener y crear las tarjetas
fetchAndCreateCards();

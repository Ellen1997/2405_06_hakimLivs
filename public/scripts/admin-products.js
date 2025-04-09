let renderPage = async () => {
    let productCardsContainer = document.querySelector("#admin-all-products-container");
    try {
        let response = await axios.get("https://be-webshop-2025-fe-two.vercel.app/api/products/");
        let products = response.data;
        console.log("Antal produkter:", products.length);
        console.log("Produkter:", products);
        
        products.forEach(product => {
            let productCard = document.createElement("div");
            productCard.classList.add("testar-denna");
            productCard.dataset.id = product._id;
            productCard.dataset.name = product.name;
            productCard.dataset.price = product.price;
            productCard.dataset.description = product.description;
            productCard.dataset.category = product.category ? product.category.name : "Ingen kategori";
            productCard.dataset.stock = product.stock;
            productCard.dataset.image = product.img;
            
            let productImg = document.createElement("img");
            productImg.src = product.img;
            productImg.classList.add("productImg");
            productCard.appendChild(productImg);
            
            let price = document.createElement("p");
            price.classList.add("price");
            price.innerText = `${product.price} :-`;
            productCard.appendChild(price);
            
            let productName = document.createElement("p");
            productName.classList.add("product-name");
            productName.innerText = product.name;
            productCard.appendChild(productName);

            let buttonContainer = document.createElement("div");
            buttonContainer.classList.add("product-button-container");

            let editButton = document.createElement("button");
            editButton.classList.add("button", "icon-button", "edit-button");
            let buttonImgEdit = document.createElement("img");
            buttonImgEdit.src = "./Bilder/edit.png";
            buttonImgEdit.alt = "Redigera";
            buttonImgEdit.width = 20;
            editButton.appendChild(buttonImgEdit);
            buttonContainer.appendChild(editButton);

            editButton.addEventListener("click", () => openEditModal(productCard));

            let deleteButton = document.createElement("button");
            deleteButton.classList.add("button", "icon-button");
            let buttonImgDelete = document.createElement("img");
            buttonImgDelete.src = "./Bilder/delete.png";
            buttonImgDelete.alt = "Radera";
            buttonImgDelete.width = 20;

            deleteButton.addEventListener("click", async () => {
                await axios.delete(`https://be-webshop-2025-fe-two.vercel.app/api/products/${product._id}`);
                productCard.remove();
            });

            deleteButton.appendChild(buttonImgDelete);
            buttonContainer.appendChild(deleteButton);
            productCard.appendChild(buttonContainer);
            
            productCardsContainer.appendChild(productCard);
        });
    } catch (error) {
        console.log("Error fetching data:", error);
    }
};

let editModal = document.createElement("div");
editModal.classList.add("editModal");
editModal.innerHTML = `
    <div class="editModalContainer">
        <span class="close">&times;</span>
        <h2>Redigera produkt</h2>

        <label for="product-name">Produktnamn:</label>
        <input type="text" id="product-name">

        <label for="product-description">Beskrivning:</label>
        <input type="text" id="product-description">

        <label for="product-category">Kategori:</label>
        <select name="product-category" id="admin-product-category"></select>
        
        <label for="product-price">Pris (i kr):</label>
        <input type="number" id="product-price">
        
        <label for="product-stock">Lagersaldo:</label>
        <input type="number" id="product-stock">
        
        <label for="product-image">Produktbild (URL):</label>
        <input type="text" id="product-image">
        
        <button id="save-product">Spara ändringar</button>
    </div>
`;
document.body.appendChild(editModal);
editModal.style.display = "none";

const closeButton = editModal.querySelector(".close");
closeButton.addEventListener("click", () => {
    editModal.style.display = "none";
});

let fetchCategories = async () => {
    try {
        let response = await axios.get("https://be-webshop-2025-fe-two.vercel.app/api/category");
        let categories = response.data;
        let categorySelect = document.querySelector("#admin-product-category");

        categorySelect.innerHTML = `<option disabled selected>Välj kategori</option>`;

        categories.forEach(category => {
            let option = document.createElement("option");
            option.value = category.name;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.log("Error fetching categories:", error);
    }
};

let openEditModal = async (productElement) => {
    await fetchCategories(); 

    editModal.dataset.id = productElement.dataset.id;
    document.querySelector("#product-name").value = productElement.dataset.name;
    document.querySelector("#product-price").value = productElement.dataset.price;
    document.querySelector("#product-description").value = productElement.dataset.description;
    document.querySelector("#admin-product-category").value = productElement.dataset.category;
    document.querySelector("#product-stock").value = productElement.dataset.stock;
    document.querySelector("#product-image").value = productElement.dataset.image;
    editModal.style.display = "block";
};

editModal.querySelector("#save-product").addEventListener("click", async () => {
    const updatedProduct = {
        name: document.querySelector("#product-name").value,
        price: Number(document.querySelector("#product-price").value),
        description: document.querySelector("#product-description").value,
        category: document.querySelector("#admin-product-category").value,
        stock: Number(document.querySelector("#product-stock").value),
        img: document.querySelector("#product-image").value
    };
    
    const productId = editModal.dataset.id;
    await axios.put(`https://be-webshop-2025-fe-two.vercel.app/api/products/${productId}`, updatedProduct);

    let updatedCard = document.querySelector(`[data-id="${productId}"]`);
    updatedCard.dataset.name = updatedProduct.name;
    updatedCard.dataset.price = updatedProduct.price;
    updatedCard.dataset.description = updatedProduct.description;
    updatedCard.dataset.category = updatedProduct.category;
    updatedCard.dataset.stock = updatedProduct.stock;
    updatedCard.dataset.image = updatedProduct.img;

    updatedCard.querySelector(".price").innerText = `${updatedProduct.price} :-`;
    updatedCard.querySelector(".product-name").innerText = updatedProduct.name;
    updatedCard.querySelector("img").src = updatedProduct.img;

    editModal.style.display = "none";
});

renderPage();

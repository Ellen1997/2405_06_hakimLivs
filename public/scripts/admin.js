const productName = document.querySelector("#admin-product-name");
const description = document.querySelector("#admin-product-description");
const price = document.querySelector("#admin-product-price");
const stock = document.querySelector("#admin-product-stock");
const categorySelect = document.querySelector("#admin-dropdown-category");
const img = document.querySelector("#admin-product-image");
const saveBtn = document.querySelector("#admin-save-button");

const clearInput = () => {
    productName.value = "";
    description.value = "";
    price.value = "";
    stock.value = "";
    categorySelect.value = "";
    img.value = "";
};

const fetchCategories = async () => {
    try {
        const response = await axios.get("https://be-webshop-2025-fe-two.vercel.app/api/category");
        const categories = response.data;

        categorySelect.innerHTML = `<option disabled selected>Välj kategori</option>`;

        categories.forEach(category => {
            let option = document.createElement("option");
            option.textContent = category.name; 
            categorySelect.appendChild(option);
        });

    } catch (error) {
        console.log("Kunde inte hämta kategorier:", error);
    }
};

saveBtn.addEventListener("click", async () => {    
    const newProduct = {
        name: productName.value,
        price: Number(price.value),
        description: description.value,
        stock: Number(stock.value),
        category: categorySelect.value, 
        img: img.value
    };

    try {
        await axios.post("https://be-webshop-2025-fe-two.vercel.app/api/products/", newProduct);
        alert("Produkten har lagts till!");
        clearInput();
    } catch (error) {
        console.log("Error: Produkten kunde inte läggas till:", error);
    }
});

fetchCategories();





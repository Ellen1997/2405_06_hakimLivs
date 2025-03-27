const productName = document.querySelector("#product-name");
const description = document.querySelector("#product-description");
const price = document.querySelector("#product-price");
const stock = document.querySelector("#product-stock");
const category = document.querySelector("#admin-dropdown-category");
const img = document.querySelector("#product-image");
const saveBtn = document.querySelector("#admin-save-button");

const clearInput = () => {
    productName.value = "";
    description.value = "";
    price.value = "";
    stock.value = "";
    category.value = "";
    img.value = null;
};

saveBtn.addEventListener("click", async () => {    
    const newProduct = {
        name: productName.value,
        price: Number(price.value),
        description: description.value,
        stock: Number(stock.value),
        category: category.value,
        img: img.value
    };

    const postData = async (URL, data) => {
        try {
            const response = await axios.post(URL, data);
            alert("Produkten har lagts till!");
            clearInput();
            
        } catch (error) {
            console.log("Error no added product:", error);
        }
    };
    
    postData("https://be-webshop-2025-fe-two.vercel.app/api/products/", newProduct);
});





const products = [
    {
        id: 'witchhat',
        description: 'Witch Hat',
        price: 13.37,
        reviews: []
    },
    {
        id: 'twosidedukulele',
        description: 'Two-sided Ukulele',
        price: 52.44,
        reviews: []
    }
];

// Get all products
function getAllProducts() {
    return products;
}

// Get product by ID
function getProductById(id) {
    return products.find((product) => {
        return product.id === id;
    });
}

// Get products within a price range
function getProductsByPrice(min, max) {
    return products.filter((product) => {
        return product.price >= min && product.price <= max;
    });
}

// Add a new product and push it to our in-memory database
function addNewProduct(id, description, price) {
    const newProduct = {
        id,
        price,
        description,
        reviews: []
    };
    products.push(newProduct);
    return newProduct;
}

module.exports = {
    getAllProducts,
    getProductsByPrice,
    getProductById,
    addNewProduct
}

const products = [
    {
        id: 'witchhat',
        description: 'Witch Hat',
        price: 13.37
    },
    {
        id: 'twosidedukulele',
        description: 'Two-sided Ukulele',
        price: 52.44
    }
];

// Get all products
function getAllProducts() {
    return products;
}

// Get products within a price range
function getProductsByPrice(min, max) {
    return products.filter((product) => {
        return product.price >= min && product.price <= max;
    });
}

module.exports = {
    getAllProducts,
    getProductsByPrice
}

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

function getAllProducts() {
    return products;
}

module.exports = {
    getAllProducts,
}

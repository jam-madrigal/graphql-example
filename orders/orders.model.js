const orders = [
    {
        date: '2021-11-27',
        subtotal: 72.91,
        items: [
            {
                product: {
                    id: 'twosidedukulele',
                    description: 'Two-sided Ukulele',
                    price: 59.59
                },
                quantity: 1
            },
            {
                product: {
                    id: 'witchhat',
                    description: 'Old Witch Hat',
                    price: 6.66
                },
                quantity: 2
            }
        ]
    }
];

// Get all orders
function getAllOrders() {
    return orders;
}

module.exports = {
    getAllOrders,
}
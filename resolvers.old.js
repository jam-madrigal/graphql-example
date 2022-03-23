// This code was originally placed in our makeExecutableSchema function, after our typeDefs property, and now serves as a learning example
resolvers: {
    // Place functions here that match the root values of our schema. Graphql provides the parameters if we need them, as follows. Often times many of them are excluded, as they only come into play in some advanced contexts.
    // The parent argument is by default set to the rootValue in our schema
    // The args argument is for parameterized queries
    // The context argument is useful for data shared across all the different resolvers, such as authentication data
    // The info argument contains information about the current state of the operation  
    // After adding this, when we query, we can console.log and see these functions are now fetching our response
    // We can even make these problems async in one of two ways, illustrated below
    Query: {
        products: (parent, args, context, info) => {
            console.log('Getting products...');
            return Promise.resolve(parent.products);
        },
        orders: async (parent) => {
            console.log('Getting orders...');
            const orders = await parent.orders;
            return orders;
        },
    }
}

// This was originally what we passed in into rootValues defaults, no longer needed with modular resolvers.js files
// Static description and price values to use for now
const root = {
    products: require(path.join(__dirname, 'products/products.model.js')),
    orders: require(path.join(__dirname, 'orders/orders.model.js'))
}
// Originally in our graphqlHTTP function
// Values used in the response to the query
rootValue: root,
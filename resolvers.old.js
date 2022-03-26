// This code was originally placed in our makeExecutableSchema function, after our typeDefs property, and now serves as a learning example. Don't try to make sense of it, it's just a trash bin for code blocks if we so want to copy them and look over old commits. 
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
// rootValue: root

// Original graphql endpoint, when we weren't using apollo
/* 
// Using the graphql function to build a schema for an ecommerce app. We define all the types of data we will have, and we always start with the query type, which every graphql service has. It defines the entry point of every query: it is the shape of the data that will be returned from our queries.
// We can make types, which remind me of Classes, by doing what we did with Product and Review here. Adding ! after the type makes it a required field.
// ID is a built in graphql type
// ***See old commits for original schema using the graphql buildSchema funtion

// This function takes in arguments which determine how graphql will respond, and specifying the endpoint
app.use('/graphql', graphqlHTTP({
    // What data types we support
    schema: schema,
    // Enabling the graphiql front end interface built into graphql, under our /graphql endpoint. It allows us to query using the schema we created and even provides documentation automatically.
    graphiql: true
}));
*/
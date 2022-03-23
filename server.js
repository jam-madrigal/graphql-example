const path = require('path');
const express = require('express');
// An express middleware function that responds to graphql queries
const { graphqlHTTP } = require('express-graphql');
// Function imported from graphql-tools/load-files to use our .graphql files in our typeDefs array
const { loadFilesSync } = require('@graphql-tools/load-files');
// Function from graphql tools schema package which replaces buildSchema
const { makeExecutableSchema } = require('@graphql-tools/schema');
// Array to hold our schemas/types from our .graphql files. It takeas in a string with our file path. The ** (wildcard) means it looks in all directories in our project, and they can have any filename (another * wildcard) and it will find all the files with the .graphql extension
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
// Replacing our old schema with the graphql-tools schema function, which takes in an object
// typeDefs is just what graphql calls schemas, and it contains an array of our schema strings
const schema = makeExecutableSchema({
    typeDefs: typesArray,
    // Resolvers property which has our resolver functions: queries to fetch data from servers
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
});
// Using the graphql function to build a schema for an ecommerce app. We define all the types of data we will have, and we always start with the query type, which every graphql service has. It defines the entry point of every query: it is the shape of the data that will be returned from our queries.
// We can make types, which remind me of Classes, by doing what we did with Product and Review here. Adding ! after the type makes it a required field.
// ID is a built in graphql type
// ***See old commits for original schema using the graphql buildSchema funtion

// Static description and price values to use for now
const root = {
    products: require(path.join(__dirname, 'products/products.model.js')),
    orders: require(path.join(__dirname, 'orders/orders.model.js'))
}

const app = express();
// This function takes in arguments which determine how graphql will respond, and specifying the endpoint
app.use('/graphql', graphqlHTTP({
    // What data types we support
    schema: schema,
    // Values used in the response to the query
    rootValue: root,
    // Enabling the graphiql front end interface built into graphql, under our /graphql endpoint. It allows us to query using the schema we created and even provides documentation automatically.
    graphiql: true
}));

app.listen(3000, () => {
    console.log('Running GraphQL server on port 3000...');
})

// Try sending in, as a raw json post request, the following to our endpoint through postman
/* 
{
    "query": "{ description }"
} 
OR 
{
    "query": "{ description, price }"
} 
*/
const express = require('express');
// An express middleware function that responds to graphql queries
const { graphqlHTTP } = require('express-graphql');
// Function from graphql tools schema package which replaces buildSchema
const { makeExecutableSchema } = require('@graphql-tools/schema');

// Replacing our old schema with the graphql-tools schema function, which takes in an object
// typeDefs is just what graphql calls schemas, and it contains an array of our schema strings
const schema = makeExecutableSchema({
    typeDefs: [schemaText]
})
// Using the graphql function to build a schema for an ecommerce app. We define all the types of data we will have, and we always start with the query type, which every graphql service has. It defines the entry point of every query: it is the shape of the data that will be returned from our queries.
// We can make types, which remind me of Classes, by doing what we did with Product and Review here. Adding ! after the type makes it a required field.
// ID is a built in graphql type
// ***See old commits for original schema using the graphql buildSchema funtion

// Static description and price values to use for now
const root = {
    products: [
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
    ],
    orders: [
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
    ]
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
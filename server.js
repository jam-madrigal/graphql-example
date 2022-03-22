const express = require('express');
const { buildSchema } = require('graphql');
// An express middleware function that responds to graphql queries
const { graphqlHTTP } = require('express-graphql');
// Using the graphql function to build a schema for an ecommerce app. We define all the types of data we will have, and we always start with the query type, which every graphql service has. It defines the entry point of every query: it is the shape of the data that will be returned from our queries.
const schema = buildSchema(`
    type Query {
        description: String
        price: Float
    }
`);
// Static description and price values to use for now
const root = {
    description: 'Witch Hat',
    price: 66.6
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
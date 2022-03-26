const path = require('path');
const express = require('express');
// Exporting the apollo server to handle our incoming requests, be them for graphql or another express middleware in our server
const { ApolloServer } = require('apollo-server-express');
// Function imported from graphql-tools/load-files to use our .graphql files in our typeDefs array
const { loadFilesSync } = require('@graphql-tools/load-files');
// Function from graphql tools schema package which replaces buildSchema
const { makeExecutableSchema } = require('@graphql-tools/schema');
// Array to hold our schemas/types from our .graphql files. It takeas in a string with our file path. The ** (wildcard) means it looks in all directories in our project, and they can have any filename (another * wildcard) and it will find all the files with the .graphql extension
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
// Loading our resolver functions
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

// Starting the apollo server
async function startApolloServer() {
    const app = express();
    // Replacing our old schema with the graphql-tools schema function, which takes in an object
    // typeDefs is just what graphql calls schemas, and it contains an array of our schema strings
    const schema = makeExecutableSchema({
        typeDefs: typesArray,
        // Resolvers property which has our resolver functions: queries to fetch data from servers. Now that we set these up with imported files with loadFilesSync, we no longer need to use the rootValues property in our graphqlHTTP function
        resolvers: resolversArray
    });
    // Contains all the logic and middleware to handle incoming graphql requests. Works similarly to when we used our graphql endpoint, and can use the grapphql-tools, which was written by one of the original Apollo developers. They work well together. It knows to use our graphql makeExecutableSchema. 
    const server = new ApolloServer({
        schema
    });
    // Telling Apollo to prepare to handle incoming graphql operations, then connecting Apollo's graphql middleware with our express server. applyMiddleware is like using app.use on the middleware in ApolloServer, mounting it on app, and the path is the endpoint.
    await server.start();
    server.applyMiddleware({ app, path: '/graphl' });

    app.listen(3000, () => {
        console.log('Running GraphQL server on port 3000...');
    });
}

startApolloServer();
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
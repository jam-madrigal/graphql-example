const productsModel = require('./products.model');

module.exports = {
    Query: {
        products: () => {
            return productsModel.getAllProducts();
        },
        // The convention for using built in graphql arguments is to use _ if you are not using it in your callback, as shown here, we omit parent and put _ in its place
        productsByPrice: (_, args) => {
            // These argument values come from the query
            return productsModel.getProductsByPrice(args.min, args.max)
        }
    }
};
const productsModel = require('./products.model');

module.exports = {
    Query: {
        products: () => {
            return productsModel.getAllProducts();
        },
        // The convention for using built in graphql arguments is to use _ if you are not using it in your callback, as shown here, we omit parent and put _ in its place
        // Get products by ID and by price range
        product: (_, args) => {
            return productsModel.getProductById(args.id);
        },
        productsByPrice: (_, args) => {
            // These argument values come from the query
            return productsModel.getProductsByPrice(args.min, args.max)
        }
    },

    Mutation: {
        addNewProduct: (_, args) => {
            return productsModel.addNewProduct(args.id, args.description, args.price);
        },
        addNewProductReview: (_, args) => {
            return productsModel.addNewProductReview(args.id, args.rating, args.comment);
        }
    }
};
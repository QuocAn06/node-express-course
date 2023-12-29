const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({
        name: "entertainment center"
    });

    const result = {
        count: products.length,
        products
    }

    res.status(200).json(result);
};

const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: 'products route' });
};

module.exports = {
    getAllProductsStatic,
    getAllProducts
};
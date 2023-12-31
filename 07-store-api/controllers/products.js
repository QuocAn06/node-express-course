const { query } = require('express');
const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort('-name price');

    const result = {
        count: products.length,
        products
    }

    res.status(200).json(result);
};

const getAllProducts = async (req, res) => {
    const { featured, company, name } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    console.log(queryObject);
    const products = await Product.find(queryObject);
    const result = {
        count: products.length,
        products
    }

    res.status(200).json(result);
};

module.exports = {
    getAllProductsStatic,
    getAllProducts
};
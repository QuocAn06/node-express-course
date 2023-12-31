const { query } = require('express');
const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).select('name price');

    const result = {
        count: products.length,
        products
    }

    res.status(200).json(result);
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query;
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
    const result = Product.find(queryObject);

    //sort
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result.sort(sortList);
    }
    else {
        result.sort('createdAt');
    }

    //fields
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result.select(fieldsList);
    }

    const products = await result;
    res.status(200).json({ count: products.length, products });
};

module.exports = {
    getAllProductsStatic,
    getAllProducts
};
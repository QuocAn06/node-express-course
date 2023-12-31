const { query } = require('express');
const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({ price: { $gt: 30 } })
        .sort('price')
        .select('name price');

    const result = {
        count: products.length,
        products
    }

    res.status(200).json(result);
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFields } = req.query;
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

    if (numericFields) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };

        const regEX = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFields.replace(
            regEX,
            (match) => `-${operatorMap[match]}-`
        );

        console.log(filters)
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

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result.skip(skip).limit(limit);
    const products = await result;
    res.status(200).json({ count: products.length, products });
};

module.exports = {
    getAllProductsStatic,
    getAllProducts
};
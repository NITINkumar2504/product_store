import mongoose from "mongoose";
import Product from "../models/product.model.js";

const getProducts = async (req, res) => {
    try {
        // const products = await Product.find({}).select("-_id");   // empty obj to retrieve all documents in collection excluding _id
        // console.log(products)

        const products = await Product.find({})
        return res.status(200).json({
            success : true,
            data : products,
            message : 'products fetched successfully'
        })
    } 
    catch (error) {
        console.error('Error in fetching products:', error.message)
        return res.status(500).json({
            success : false,
            message : 'Server error'
        })
    }
}

const createProduct = async (req, res) => {
    const product = req.body  // user send this data

    if(!product.name || !product.image || !product.price){
        return res.status(400).json({
            success : false,
            message : 'Please provide all details'
        })
    }

    const existedproduct = await Product.findOne({
        name: product.name
    })

    if(existedproduct){
        return res.status(409).json({
            success: false,
            message: 'Product already exists'
        })
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        return res.status(201).json({
            success : true,
            data : newProduct,
            message : 'Product created successfully'
        });    
    } 
    catch (error) {
        console.error('Error in creating product:', error.message)
        return res.status(500).json({
            success : false,
            message : 'Server error'
        })
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params;

    const product = req.body;
    // console.log(product)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success : false,
            message : 'Product not found'
        })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            product,
            {returnDocument : 'after'}
        )

        return res.status(200).json({
            success : true,
            data : updatedProduct,
            message : 'Product updated successfully'
        })
    } 
    catch (error) {
        console.log('Error in updating product:', error.message);
        return res.status(500).json({
            success : false,
            message : 'Server error'
        })
    }
}

const deleteProduct = async(req, res) => {
    const {id} = req.params
    // console.log('id:', id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success : false,
            message : 'Product not found'
        })
    }

    try {
        await Product.findByIdAndDelete(id)
        return res.status(200).json({
            success : true,
            message : 'product deleted successfully',
        })    
    } 
    catch (error) {
        console.log('Error in deleting product:', error.message)
        return res.status(500).json({
            success : false,
            message : 'Server error'
        })
    }
}

export {getProducts, createProduct, updateProduct, deleteProduct}
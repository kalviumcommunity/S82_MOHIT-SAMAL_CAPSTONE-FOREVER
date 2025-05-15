const { v2: cloudinary } = require('cloudinary');
const Product = require('../models/productModel.js'); // ✅ Correct import

// Function for ADD product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestSeller, date } = req.body;

    const image1 = req.files?.image1?.[0] || null;
    const image2 = req.files?.image2?.[0] || null;
    const image3 = req.files?.image3?.[0] || null;
    const image4 = req.files?.image4?.[0] || null;

    const images = [image1, image2, image3, image4].filter(Boolean);

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price,
      category,
      subCategory,
      bestSeller: bestSeller === 'true',
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: new Date(),
    };

    console.log(productData);

    const product = new Product(productData);
    await product.save();

    return res.status(200).json({
      success: true,
      message: 'Product Added',
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Function for LIST product
const listProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
}
};

// Function for REMOVE product
const removeProduct = async (req, res) => {
    
    try {

        await Product.findByIdAndDelete(req.body.id)
        return res.status(200).json({
            success : true,
            message : "Product Removed"
        })
        
    } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
        
    }
};


// Function for SINGLE product
const singleProduct = async (req, res) => {
    
    try {
        const {productId} = req.body;

        const products = await Product.findById(productId)

        return res.status(200).json({
            status:true,
            products
        })
        
    } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
        
    }
};

module.exports = { addProduct, listProduct, removeProduct, singleProduct };

const db = require('../util/database');
const asyncHandler = require('express-async-handler')

exports.createProduct = asyncHandler(async(req,res)=>{
    const {name,image,brand,category,pdescription,rating,price,numberOfReviews,countInStock} = req.body
    console.log({name,image,brand,category,pdescription,rating,price,numberOfReviews,countInStock})
    const [insertProduct] = await db.execute(
    "INSERT INTO products (name,image,brand,category,pdescription,rating,price,numberOfReviews,countInStock,userId) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [name,image,brand,category,pdescription,rating,price,numberOfReviews,countInStock,req.user._id]
    );
    const [newProduct] = await db.execute("SELECT * FROM products where _id=?",[insertProduct.insertId])
    res.status(201).json(newProduct)
})


exports.getProducts = asyncHandler(async(req,res)=>{
    const productId = req.params.id;
    const [getProducts] = await db.execute(`SELECT products.name,products.image,products.pdescription,products.price,products.category,products.rating,products.countInStock,users.name as uName
    FROM products INNER JOIN users ON products.userId = users._id WHERE products._id=?`,[productId])
    const [getReviews] = await db.execute(`SELECT reviews.rating,reviews.comment,users.name FROM reviews INNER JOIN products ON reviews.productId=products._id INNER JOIN users ON reviews.userId = users._id WHERE reviews.productId=?`,[productId])
    const [numReviews] = await db.execute("SELECT COUNT(*) as numofRevies FROM reviews INNER JOIN products ON products._id=reviews.productId WHERE reviews.productId=?",[productId])
    
    res.json({
        getProducts,
        getReviews,
        numReviews
    })
    //res.json(getReviews);
})


exports.createReview = asyncHandler(async(req,res)=>{
    const productId = req.params.id;
    const {rating,comment} = req.body;
    const [name] = await db.execute("SELECT name FROM users WHERE users._id=?",[req.user._id])
    const [saveComment] = await db.execute("INSERT INTO reviews (rating,comment,productId,userId) VALUES (?,?,?,?)",[rating,comment,productId,req.user._id])
    res.json(saveComment);

})


exports.deleteProduct = asyncHandler(async(req,res)=>{
    const productId = req.params.id;
    const [deletProd] = await db.execute("DELETE FROM products WHERE _id=?",[productId])
    const [deleteReviews] = await db.execute("DELETE  FROM reviews WHERE productId=?",[productId]);
    res.json("DELETE PRODUCT AND review.")

})
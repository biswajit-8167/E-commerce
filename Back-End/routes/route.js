const express = require('express');
const router = express.Router();
const userSignUpController = require('../controller/userSignUp');
const userSignInController = require('../controller/userSignIn');
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middleware/authToken');
const userLogOut = require('../controller/userLogOut');
const allUser = require('../controller/allUser');
const updateUser = require('../controller/updateUser');
const uploadProductController = require('../controller/uploadProduct');
const getProductController = require('../controller/getProduct');
const updateProductController = require('../controller/updateProduct');
const getCetagoryProductController = require('../controller/product/getCetagoryProductOne');
const getCategoryWiseProductController = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/addToCartController');
const countAddToCartProductController = require('../controller/countAddToCartProduct');
const addToCartViewProduct = require('../controller/addToCartViewProduct');
const updateAddToCartProductController = require('../controller/updateAddToCartProduct');
const deleteAddToCartProductController = require('../controller/deleteAddToCartProduct');
const searchProduct = require('../controller/product/searchProduct');
const filterProduct = require('../controller/product/filterProduct');

router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.get('/user-details', authToken, userDetailsController);
router.get('/userlogout',userLogOut)

//admin panel
router.get('/all-user',authToken,allUser);
router.post('/update-user',authToken,updateUser);

// upload Product
router.post('/upload-product',authToken,uploadProductController);
router.get('/all-product',getProductController);
router.post('/update-product',authToken,updateProductController)
router.get('/get-category',getCetagoryProductController);
router.post('/category-product',getCategoryWiseProductController);
router.post('/product-details',getProductDetails);
router.get('/search',searchProduct);
router.post('/filter-product',filterProduct);


//user addtocart

router.post('/addtocart',authToken,addToCartController)
router.get('/addtocount',authToken,countAddToCartProductController)
router.get('/view-cart-product',authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProductController);
router.post('/delete-cart-product',authToken,deleteAddToCartProductController)




module.exports = router;
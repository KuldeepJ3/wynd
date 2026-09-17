const express = require('express')
const router = express.Router();
const { handleSignUp, handleLogin, handleUpdateUser, handleAddToCart, handleGetCart, handleRemoveCartItem, handleCreateOrder, addProductReview, getProductReviews } = require('../Controller/Controller')
const verifyToken = require('../middleware/jwt')
const upload = require('../multer/multer')

router.post('/signup', handleSignUp)
router.post('/login', handleLogin)
router.put('/update-profile', verifyToken, upload.single('profileImage'), handleUpdateUser)
router.post('/add-to-cart', verifyToken, handleAddToCart)
router.post('/create-order', verifyToken, handleCreateOrder)
router.get('/add-to-cart', verifyToken, handleGetCart)
router.delete('/cart/remove/:id', verifyToken, handleRemoveCartItem);
router.get('/:productId', getProductReviews);
router.post('/add', verifyToken, addProductReview);

module.exports = router
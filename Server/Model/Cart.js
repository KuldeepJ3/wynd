const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true })

const Cart = mongoose.model('cart-items', CartSchema)
module.exports = Cart;
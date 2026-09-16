const { setUser } = require('../jwt/jwt');
const User = require('../Model/Model')
const bcrypt = require('bcrypt') //PassWord Hash
const Cart = require('../Model/Cart')
const Razorpay = require('razorpay')

async function handleSignUp(req, res) {
    const body = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        await User.create({
            name: body.name,
            email: body.email,
            password: hashedPassword
        })

        return res.json({
            staus: "Success",
            message: "User Created Successfully!"
        })
    } catch (error) {
        console.log("BACKEND CRASHED BECAUSE: ", error);

        if (error.code === 11000) {
            return res.status(400).json({ message: "Email Already Exists!" })
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function handleLogin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ status: "Failed", message: "No Such User" })

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = setUser(user)
            return res.status(200).json({ message: "User Login Successfull", token: token })
        }

        return res.status(401).json({ status: "Failed", message: "Incorrect Password" });
    } catch (error) {
        return res.json({ status: "Failed", message: error.message })
    }
}

async function handleUpdateUser(req, res) {
    console.log("REQUEST USER: ", req.user)
    console.log("REQ.FILE: ", req.file);
    try {
        const { name, email } = req.body;
        const updateData = { name, email }

        if (req.file) {
            updateData.profileImage = `/uploads/${req.file.filename}`
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            //the return Document return the newly updated document of the user
            { returnDocument: 'after', runValidators: true }

        );

        const newToken = setUser(updatedUser)

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        res.status(200).json({ success: true, token: newToken, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function handleAddToCart(req, res) {
    console.log("REQ BODY: ", req.body)

    const { id, name, price } = req.body
    await Cart.create({
        id,
        name,
        price,
        createdBy: req.user._id
    })

    return res.status(200).json({ Success: true })
}

async function handleGetCart(req, res) {
    const userID = req.user._id;
    const CartItems = await Cart.find({ createdBy: userID })
    return res.status(200).json({ Success: true, cart: CartItems })
}

async function handleRemoveCartItem(req, res) {
    try {
        const userID = req.user._id;
        const itemId = req.params.id;

        // Delete the item ensuring it belongs strictly to the logged-in user
        const deletedItem = await Cart.findOneAndDelete({
            $or: [{ id: itemId }, { _id: itemId.match(/^[0-9a-fA-F]{24}$/) ? itemId : null }],
            createdBy: userID
        });

        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        // Fetch the updated list of cart items for this user
        const remainingItems = await Cart.find({ createdBy: userID });

        return res.status(200).json({
            success: true,
            message: "Item removed successfully",
            cart: remainingItems
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function handleCreateOrder(req, res) {
    console.log("1. /create-order route hit successfully!");
    try {
        const userID = req.user._id;
        console.log("2. User ID found:", userID);

        const cartItems = await Cart.find({ createdBy: userID });
        console.log("3. Cart items fetched:", cartItems.length);

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        const totalAmountUSD = cartItems.reduce((acc, item) => {
            let priceNum = 0;
            if (item.price !== undefined && item.price !== null) {
                if (typeof item.price === 'string') {
                    priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
                } else if (typeof item.price === 'number') {
                    priceNum = item.price;
                }
            }
            const qty = Number(item.quantity) || 1;
            return acc + (priceNum * qty);
        }, 0);

        console.log("4. Calculated Total USD:", totalAmountUSD);

        if (totalAmountUSD <= 0) {
            return res.status(400).json({ success: false, message: "Cart total must be greater than zero." });
        }

        const conversionRate = 83;
        const totalAmountINR = totalAmountUSD * conversionRate;

        const options = {
            amount: Math.round(totalAmountINR * 100),
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`
        };

        console.log("5. Attempting to create Razorpay order with options:", options);
        const order = await razorpay.orders.create(options);
        console.log("6. Razorpay order created successfully:", order.id);

        return res.status(200).json({
            success: true,
            order,
            keyId: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error("CRASHED INSIDE CATCH BLOCK:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}


module.exports = {
    handleSignUp,
    handleLogin,
    handleUpdateUser,
    handleAddToCart,
    handleGetCart,
    handleRemoveCartItem,
    handleCreateOrder
}
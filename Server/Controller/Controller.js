const { setUser } = require('../jwt/jwt');
const User = require('../Model/Model')
const bcrypt = require('bcrypt') //PassWord Hash

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

module.exports = {
    handleSignUp,
    handleLogin
}
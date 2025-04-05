const userModel = require('../modules/userModel'); // Corrected path
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }

        if (!password) {
            throw new Error("Please provide password"); // Corrected error throwing
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) {

            const tokenData = {
                _id : user._id,
                email: user.email
            }
           
            const token =jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '7d' });

            const tokenOptions={
                 httpOnly: true,
                 secure: true
            }
            res.cookie('token', token, tokenOptions).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            })

        }else{
            throw new Error("Invalid password");
        }

        
        

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = userSignInController;
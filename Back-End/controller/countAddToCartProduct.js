const addToCartModel = require("../modules/cartProduct");

const countAddToCartProductController = async (req, res) => {
    try {

        const userId = req.userId;

        const count = await addToCartModel.countDocuments({
            user: userId
        })

        res.status(200).json({
            data:{
                count: count
            },
            message: "ok",
            error: false,
            success: true
        })
        
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Failed to update cart",
            error: true,
            success: false
        });
    }
}

module.exports = countAddToCartProductController
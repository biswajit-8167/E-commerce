const addToCartModel = require("../modules/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentUserId = req.userId;

        // More precise query
        const existingCartItem = await addToCartModel.findOne({
            product: productId,
            user: currentUserId
        });

        if (existingCartItem) {
            return res.status(200).json({
                message: "Product already in your cart",
                data: existingCartItem,
                error: true,
                success: false
            });
        }

        const newCartItem = await addToCartModel.create({
            user: currentUserId,
            product: productId,
            quantity: 1
        });

        return res.status(200).json({
            message: "Product added to cart successfully",
            data: newCartItem,
            error: false,
            success: true
        });
        
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Failed to update cart",
            error: true,
            success: false
        });
    }
}

module.exports = addToCartController
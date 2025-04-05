const addToCartModel = require("../modules/cartProduct");

const deleteAddToCartProductController = async (req, res) => {
    try {

        const currentUserId = req.userId
        const addToCartProductId = req.body._id;

        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId, user: currentUserId });

        res.json({
            message: "Product Delete from your cart",
            data: deleteProduct,
            success: true,
            error: false
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = deleteAddToCartProductController
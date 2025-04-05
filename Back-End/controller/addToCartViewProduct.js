const addToCartModel = require("../modules/cartProduct");


const addToCartViewProduct = async (req, res) => {
    try {

        const currentUser = req.userId;

        const allProduct = await addToCartModel.find({
            user: currentUser
        }).populate("product");

        res.json({
            data: allProduct,
            message: "All product",
            error: false,
            success: true
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = addToCartViewProduct
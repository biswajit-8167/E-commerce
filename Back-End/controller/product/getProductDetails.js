
const productModel = require("../../modules/productModel");
const getProductDetails = async (req, res) => {
    try {
        const {productId} = req.body;

        const product = await productModel.findById(productId);

        res.status(200).json({
            message: "Product details",
            data: product,
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

module.exports = getProductDetails;
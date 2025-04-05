const productModel = require("../../modules/productModel");

const filterProduct = async (req, res) => {
    try {

        const categoryList = req?.body?.category || [];
        const product = await productModel.find({
             category: { $in: categoryList },
        })

        res.json({
            data: product,
            message: "Product filter",
            error: false,
            success: true,
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = filterProduct;
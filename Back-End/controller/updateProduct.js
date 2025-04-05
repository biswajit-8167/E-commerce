const uploadProductPermission = require("../helper/permissions");
const productModel = require("../modules/productModel");


async function updateProductController(req, res) {
    try {

        if (!uploadProductPermission(req.userId)) {
            throw new Error("You don't have permission to upload product");
        }

        const { _id, ...resBody} = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody,  { new: true }) ;

        res.json({
            message:"Product Update Successfully",
            data: updateProduct,
            success:true,
            error:false
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = updateProductController;
const uploadProductPermission = require("../helper/permissions");
const productModel = require("../modules/productModel");
async function uploadProductController(req, res) {
    try {

         const sessionUserId = req.userId;
         if(!uploadProductPermission(sessionUserId)) {
             throw new Error("You don't have permission to upload product");
         }


        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

        res.status(200).json({
            message: "Product uploaded successfully",
            data: saveProduct,
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

module.exports = uploadProductController;
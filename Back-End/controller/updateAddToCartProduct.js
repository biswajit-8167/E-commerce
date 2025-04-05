const addToCartModel = require("../modules/cartProduct");

 

// const updateAddToCartProductController = async (req, res) => {
//     try {

//         const currentUserId = req.userId;
//         const addTocartProductId = req.body._id;
//         const qty = req.body.quantity;

//         const updateProduct = await addToCartModel.updateOne(addTocartProductId,{
//               ...(qty && {quantity: qty})
//         })

//         res.json({
//             message:"Product Update Successfully",
//             data: updateProduct,
//             success:true,
//             error:false
//         })
        
//     } catch (error) {
//         res.status(400).json({
//             message: error.message || error,
//             data:[],
//             error: true,
//             success: false
//          })
//     }
// }

const updateAddToCartProductController = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addTocartProductId = req.body._id;
        const qty = req.body.quantity;

        // Add validation for quantity
        if (!qty || qty < 1) {
            throw new Error("Invalid quantity");
        }

        const updateProduct = await addToCartModel.updateOne(
            { 
                _id: addTocartProductId,
                user: currentUserId // Ensure the cart item belongs to the current user
            },
            { 
                quantity: qty 
            }
        );

        if (updateProduct.matchedCount === 0) {
            throw new Error("Product not found in your cart");
        }

        res.json({
            message: "Product Update Successfully",
            data: updateProduct,
            success: true,
            error: false
        });
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data: [],
            error: true,
            success: false
        });
    }
}


module.exports = updateAddToCartProductController;
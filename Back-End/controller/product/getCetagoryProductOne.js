const productModel = require("../../modules/productModel");


const getCetagoryProductController = async (req, res) => {
 
    try {
        const productCetagory = await productModel.distinct('category');

       console.log("productCetagory",productCetagory);

       const productByCetagory= [];

       for(const category of productCetagory) {
           const product = await productModel.findOne({category: category});

            if(product){
                productByCetagory.push(product);
            }
       }

       res.status(200).json({
           message:"Product Cetagory",
           error:false,
           success:true,
           data: productByCetagory,
       })


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
}

module.exports = getCetagoryProductController
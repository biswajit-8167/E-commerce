const userModel = require('../modules/userModel');
async function  allUser(req, res) {
    try {
        
        console.log("All userId",req.userId);
        const allUser = await userModel.find();


        res.json({
            message: "All user",
            data: allUser,
            error: false,
            success: true
            
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
module.exports = allUser;
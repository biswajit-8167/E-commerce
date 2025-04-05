
async function  userLogOut(req, res) {
    try {
        res.clearCookie('token');
        res.status(200).json({
            message: "Logged Out Successfully",
            data:[],
            error: false,
            success: true
         })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data:[],
            error: true,
            success: false
         })
        
    }
}

module.exports = userLogOut;
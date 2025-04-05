const userModel = require('../modules/userModel');

async function userDetailsController(req, res) {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(404).json({
                message: "User not found",
                data: null,
                error: true,
                success: false
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                data: null,
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: "User details",
            data: user,
            error: false,
            success: true
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = userDetailsController;
const jwt = require('jsonwebtoken');

async function userDetails(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(200).json({
                message: "Please login",
                data: [],
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            if (err) {
                console.log("error auth", err);
                return res.status(401).json({
                    message: "Invalid token",
                    error: true,
                    success: false
                });
            }

            req.userId = decoded?._id; // Set userId in req object
            next();
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

module.exports = userDetails;
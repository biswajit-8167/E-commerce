const userModel = require('../modules/userModel');
async function updateUser(req, res) {
    try {
          
        const sessionUser = req.userId;

        const {userId,name,email,role} = req.body;

        const payload = {
            ...(name && {name: name}),
            ...(email && {email: email}),
            ...(role && {role: role}),
        }

        const user = await userModel.findById(sessionUser);

        console.log("user role",user.role);

        const updatedUser = await userModel.findByIdAndUpdate(userId, payload);
        
        res.status(200).json({
            data: updatedUser,
            message: "User updated successfully",
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

module.exports = updateUser;
const userModel = require("../modules/userModel")

const uploadProductPermission = async(userId) => {

    const user = await userModel.findById(userId);

    if(user.role !== "ADMIN") {
        return false;
    } else {    
        return true;
    }
}

module.exports = uploadProductPermission;
 
const userModel = require('../modules/userModel');
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
      const { name, email, password, profilePic } = req.body;
  
    //   console.log("Request Body:", req.body); // Debugging
  
      // Check if user already exists
      const user = await userModel.findOne({ email });
      if (user) {
        throw new Error("User already exists");
      }
  
      // Validate required fields
      if (!email) throw new Error("Please provide email");
      if (!password) throw new Error("Please provide password");
      if (!name) throw new Error("Please provide name");
      // if (!profilePic) throw new Error("Please provide profilePic");
  
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
  
      if (!hashPassword) {
        throw new Error("Something went wrong");
      }
  
      // Create user payload
      const payload = {
        name,
        email,
        password: hashPassword,
        profilePic,
        role: "GENERAL",
      };
  
    //   console.log("User Payload:", payload); // Debugging
  
      // Save user to database
      const userData = new userModel(payload);
      const saveUser = await userData.save();
  
      console.log("User saved:", saveUser); // Debugging
  
      res.status(201).json({
        data: saveUser,
        message: "User created successfully",
        error: false,
        success: true,
      });
    } catch (error) {
    //   console.error("Error in userSignUpController:", error); // Debugging
      res.status(400).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
  }

module.exports = userSignUpController;
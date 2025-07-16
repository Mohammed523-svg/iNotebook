import express from 'express';
import UserModel from '../models/User.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fetchUser from '../middleware/fetchUser.js'; // Middleware to fetch user details

const router = express.Router();
let success = false;

// Route 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
  body('name', 'Endter a valid name').isLength({min: 3}),
  // checking if the email is valid and not already in use
  body('email', 'Enter a valid email').isEmail().custom(async value => {
    const user = await UserModel.findOne({email: value});
    if (user) {
      throw new Error('E-mail already in use');
    }
  }),
  body('password', 'Password length should be of 8 characters').isLength({min: 8}),
], async (req, res) => {
  let success = false;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() }); // Return validation errors if any
  }
  try {
    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const { name, email, password } = req.body;
    const user = new UserModel({
      name,
      email,
      password: hashedPassword
    });
    const data = {
      user: {
        id: user.id
      }
    };
    const savedUser = await user.save();

    var token = jwt.sign(data, process.env.JWT_SECRET);
    success = true;
    res.json({success: success, token: token}); // Send the saved user data as a response
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).send({success: success, error:"Internal Server Error"});
  }
});

// Route 2: Authenticate a User using: POST "/api/auth/login". 
router.post('/login',[
  // checking if the email is valid 
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password should not be empty').exists()
], async (req, res) => {

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() }); // Return validation errors if any
  }

  try {
    const { email, password } = req.body;
    // checking if the user exists
    const user = await UserModel.findOne({email: email});
    if (!user) {
      success = false;
      return res.status(400).json({success: success, error: "Please try to login with correct credentials" });
    }
    // checking if the password is correct
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
      success = false;
      return res.status(400).json({success: success, error: "Please try to login with correct credentials" });
    }
    // If the user is authenticated successfully, create a JWT token
    const data = {
      user: {
        id: user.id
      }
    };

    var token = jwt.sign(data, process.env.JWT_SECRET);
    success = true;
    res.json({success: success, token: token}); // Send the saved user data as a response
    
  } catch (error) {
    console.error(error.message);
    success = false;
    res.status(500).send({success: success, error: "Internal Server Error"});
  }

});

// Route 3: Get loggedin user details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchUser,  async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await UserModel.findById(userId).select("-password"); // Exclude password from the response
    res.send(user); // Send the user data as a response
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

});


export default router;
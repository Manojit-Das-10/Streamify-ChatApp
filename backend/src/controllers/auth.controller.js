import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export async function signup(req, res) {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least of 8 characters",
      });
    }

    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({ message: "User email already existed, please use a different one" });
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

    const newUser = await User.create({
        email,
        fullName,
        password,
        profilePic:randomAvatar,
    });

    const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
        expiresIn: "7d"
    })

    res.cookie("token",token, {
        maxAge:7*24*60*60*1000,
        httpOnly:true,  //prevent xss attack
        samesite:"strict",  //prevent csrf attack
        secure: process.env.NODE_ENV === 'production'
    })

    res.status(201).json({
        success:true,
        user:newUser,
        message:"Account created successfully"
    })

  } catch (error) {
        console.log('error in signup controller', error);
        res.status(500).json({
            message:"Internal server error"
        });
  }
}

export async function login(req, res) {
    try {
        const {email,password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const user = await User.findOne({email});
        if(!user) return res.status(401).json({
            message:"Invalid credentials"
        })

        const isPasswordCorrect = await user.matchPassword(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn: "7d"
        })
    
        res.cookie("token",token, {
            maxAge:7*24*60*60*1000,
            httpOnly:true,  //prevent xss attack
            samesite:"strict",  //prevent csrf attack
            secure: process.env.NODE_ENV === 'production'
        })

        res.status(200).json({
            success:true,
            user,
            message:"User logged in successfully"
        });

    } catch (error) {
        console.log('Error in login controller', error.message);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export async function logout(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        success:true,
        message:"Logout Successful"
    })
}

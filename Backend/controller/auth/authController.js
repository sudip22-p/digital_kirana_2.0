const Costumer  = require('../../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const sendMail = require('../helper/emailSender');
const {validationResult} = require("express-validator");
const passport = require('passport');

exports.registerCustomer = async(req,res) => {
    const {username,fullName,email,password,phoneNumber} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errorMessage: errors.array()[0].msg,
            oldInput: {
                fullName,
                username,
                email,
                password,
                phoneNumber,
            },
        })
    }

    console.log("Inside Register Customer")
    
    try{
        const hashedPassword = await bcrypt.hash(password,12);
        
        const costumer = new Costumer({
            fullName:fullName,
            userName:username,
            email:email,
            password:hashedPassword,
            phoneNumber:phoneNumber,
        });
        await costumer.save();
        // can automatically log in the user after registration--using passport-local
        let userToken;
        req.login(costumer, async (err) => {

            if (err) {
                return next(err);
            }
            
            // Generate JWT token
            userToken = jwt.sign({ id: costumer._id }, process.env.USER_SECRET_KEY, {
                expiresIn: '30d',
            });
            
            // Set userToken as a cookie
            res.cookie('userToken', userToken, {
                secure: true,
            }); 
        });  
            
        const userId = costumer._id;
        const verificationToken = jwt.sign({ userId }, process.env.USER_SECRET_KEY, { expiresIn: '1h' });
        costumer.verificationToken=verificationToken;
        await costumer.save();
        const verificationLink = `https://digital-kirana-gules.vercel.app/verify-user/${verificationToken}`;
        
        const emailSubject = 'Digital Kirana : User Verification';
        const emailBody = `
        <html>
        <head>
        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f5f5;
            color: #333;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .content {
            padding: 20px;
        }
        .link {
            font-size: 16px;
            font-weight: bold;
            color: #4CAF50;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            color: #888;
        }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
                <h2>User Verification</h2>
            </div>
            <div class="content">
                <p>Click the link below to verify your account:</p>
                <p><a href="${verificationLink}" class="link">Verify Your Account</a></p>
            </div>
            <div class="footer">
                <p>Do not reply to this email. Visit our website <a href="http://localhost:5173">Digital Kirana</a> for more information.</p>
            </div>
        </div>
        </body>
        </html>
        `;
        const emailStatus = await sendMail(email, emailSubject, emailBody)
        if (emailStatus === 'success') {
            return res.status(200).json({
                message: "User registered and logged in successfully",
                userToken: userToken,
                customerId:userId,
            })
        }
        await Costumer.findByIdAndDelete(costumer._id);
        res.status(422).json({
            message: "Please enter a valid email for verification"
        })
    } catch (e) {
        const errMsg = "Error Occurred " + e
        res.status(422).json({
        message: errMsg
        })
    }
}

// Login customer
exports.loginCustomer = async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
      try {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(403).json({
            message: info.message,
            oldInput: req.body,
          });
        }
  
        req.login(user, async (err) => {
          if (err) {
            return next(err);
          }
  
          const userToken = jwt.sign({ id: user._id }, process.env.USER_SECRET_KEY, {
            expiresIn: '30d',
          });
  
          res.cookie('userToken', userToken, {
            secure: true,
          });
  
          return res.status(200).json({
            message: 'Logged in successfully',
            userToken: userToken,
            customerId:user._id,
          });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  };
  

//sending reset link
exports.passwordReset = async(req,res) => {
    const { email } = req.body;
    try{
        const user = await Costumer.findOne({ email });
  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(user.reset.tokenExpiration > Date.now()){
            return res.status(429).json({ message: 'Reset link already sent to email' });
        }
        const resetToken = jwt.sign({ userId: user._id }, process.env.USER_SECRET_KEY, { expiresIn: '1h' });
    
        const resetLink = `https://digital-kirana-gules.vercel.app/reset-password?token=${resetToken}`;

        const tokenExpiration = new Date(Date.now() + 60 * 60 * 1000); 

        // Updating db
        user.reset.token = resetToken;
        user.reset.tokenExpiration = tokenExpiration;
        await user.save();
    
        const emailSubject = 'Digital Kirana : Password Reset Request';
        const emailBody = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f5f5;
                    color: #333;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #4CAF50;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }
                .content {
                    padding: 20px;
                }
                .link {
                    display: block;
                    margin-top: 20px;
                    text-align: center;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Password Reset Request</h2>
                </div>
                <div class="content">
                    <p>Click the link below to reset your password:</p>
                    <div class="link">
                        <a href="${resetLink}" target="_blank">${resetLink}</a>
                    </div>
                </div>
                <div class="footer">
                    <p>Do not reply to this email. Visit our website <a href="http://localhost:3000">Digital Kirana</a> for more information.</p>
                </div>
            </div>
        </body>
        </html>
        `;
    
        await sendMail(email, emailSubject, emailBody);
        res.status(200).json({ message: 'Password reset link sent to your email' });
    }catch(e){

        return res.status(500).json({ message: 'Error Occurred' });
    }
  };

//sending reset link
exports.passwordChange = async(req,res) => {
    const {token,password} = req.body;
    try{
        const decoded = jwt.verify(token,process.env.USER_SECRET_KEY);
        const customerId = decoded.userId;
        console.log(customerId)
        const user = await Costumer.findById(customerId);
        //check token expired or not:
        if(!user){
            return res.status(404).json({ message: 'Error occurred' });
        }
        if(user.reset.tokenExpiration < Date.now()){
            return res.status(410).json({ message: 'Token expired' });
        }
        if(user.reset.token!==token){
            return res.status(400).json({ message: 'Invalid token' });
        }
        if(await bcrypt.compare(password,user.password)){
            return res.status(422).json({ message: 'Password must be different from previous one' });
        }
        const hashedPassword = await bcrypt.hash(password,12);
        if(user){
            user.password=hashedPassword
            user.reset.token=null
            user.reset.tokenExpiration=null
            await user.save()
            return res.status(200).json({ message: 'Password changed Successfully' });
        }
        return res.status(500).json({ message: 'Error Occurred' });
    }catch(e){
        res.status(500).json({ message: e });
        res.status(500).json({ message: e });
    }
};

//user verification
exports.verifyUser = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token) {
            return res.status(400).json({
                message:"Verification token is required"
            });
        }
        const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
        const userId = decoded.userId;
        
        const user = await Costumer.findById(userId);
        
        if (!user) {
            return res.status(400).json({
                message:"no User With That Token exists"
            });
        }
        if(user.verified===true){
            return res.status(400).json({
                message:'User already verified'
            });
        }
        if(token!==user.verificationToken){
            return res.status(400).json({
                message:'Invalid token'
            });
        }
        user.verified = true;
        user.verificationToken=null;
        await user.save();

        res.status(201).json({
            message:'User verified successfully'
        });
    } catch (error) {
        res.status(400).json({
            message:'Invalid or expired token'+error,
        });
    }
};


exports.getFailedLogin = async(req,res) => {
    console.log("Inside Failed Google Login")
    res.status(401).json({
        success:false,
        message:'Failed to login using google'
    })
    
}

exports.getSuccessLogin = async(req,res) => {
    try {
        if (req.query) {
            const userToken = jwt.sign({id:req.query._id.toString()},process.env.USER_SECRET_KEY,{
                expiresIn:"24h"
            })
            res.status(200).json({
                success: true,
                message: "Successfully logged in",
                cookies: req.cookies,
                googleToken: userToken,
                user:req.query,
            });
        } else {
            res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }
    } catch (error) {
        console.log(error)
    }
    
}

exports.getLogoutGoogle = async(req,res) => {
    try {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('http://localhost:5173');
        });
    } catch (error) {
       console.log(error) 
    }
}

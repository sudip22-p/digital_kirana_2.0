const Admin = require("../../model/adminModel")
const Product = require("../../model/productModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Category = require("../../model/categoryModel")
const Customer = require("../../model/userModel")
const GoogleCustomer = require("../../model/googleLogin.js")
const Order = require("../../model/orderModel")
// works
exports.getDashboard = async (req, res) => {
  // if (!req.admin) {
  //   return res.status(401).json({
  //     login: false,
  //     message: "Admin is not logged in"
  //   })
  // }
  try {
    res.status(200).json({
      login: true,
      message: "Admin is logged in",
      admin: req.admin,
      // adminToken:req.cookies.adminToken,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "DB 500 Error"
    })
  }
}
//works
exports.getAllProducts = async (req, res) => {
  // if (!req.admin) {
  //   return res.status(401).json({
  //     login: false,
  //     message: "Admin is not logged in"
  //   })
  // }
  try {
    const products = await Product.find();
    res.status(200).json({
      login: true,
      message: "Product Send Successfully",
      products: products
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "DB 500 Error"
    })
  }
}
//works
exports.getAllCustomers = async(req,res) => {
  try {
    const allLocalCustomers = await Customer.find({});
    const allGoogleCustomers = await GoogleCustomer.find({});
    res.status(200).json({
      allCustomers :{
        allLocalCustomers,
        allGoogleCustomers
      }
      
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:"DB Error"
    })
  }
}
//works
exports.postAdminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ adminEmail : email });
  // if (!admin) {
  //   return res.status(404).json({
  //     message: "No Admin With That Email Exists",
  //   })
  // }
  // const isMatch = await bcrypt.compare(password, admin.adminPassword);
  // if (!isMatch) {
  //   return res.status(401).json({
  //     message: "Password is Incorrect"
  //   })
  // }
  const adminToken = jwt.sign({ id: admin._id }, process.env.ADMIN_SECRET_KEY, {
    expiresIn: "24h"
  })

  const excludedAdmin = await Admin.findOne({adminEmail:email}).select("-adminPassword");

  res.cookie("adminToken", adminToken, {
    secure: true,
  })
  res.status(200).json({
    message: "Admin Login Successfull",
    adminToken,
    admin:excludedAdmin
  })
}
//works
exports.postAddProduct = async (req, res) => {
  const {productName,salesPrice,category,stocks,description,Brand,Unit} = req.body;
  const {frontView,backView,topView,sideView} = req.files;
  
  try {
    const newProduct = new Product({
      productName,
      salesPrice,
      category,
      stocks,
      description,
      frontView:frontView[0].originalname,
      backView:backView[0].originalname,
      sideView:sideView[0].originalname,
      topView:topView[0].originalname,
      Brand,
      Unit
    })
    if(await newProduct.save()){
      return res.status(200).json({
        message:"Success",
        admin:req.admin,
      })
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:"DB Error"
    })
  }


}
//works
exports.getAllCategories = async(req,res) => {
  try {
    const allCategories = await Category.find({})
    res.status(200).json({
      allCategories
    })
    } catch (error) {
    console.log(error);
    res.status(500).json({
      message:"DB Error"
    })
  }
}
//for customer profile
exports.getAllOrders = async (req, res) => {
  try {

    const { email } = req.params;
    const allOrders = await Order.find({ customerEmail: email }).populate('products.product');
    res.status(200).json({
      allOrders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "DB Error",
    });
  }
};

//for customer data
exports.getUserData = async (req, res) => {
  try {
    //find customer by email
    const { email } = req.params;
    const customer=await Customer.findOne({email:email});

      if (!customer) {
          return res.status(404).json({ message: 'Customer not found' });
      }
      let responseData={
        userName:customer.userName,
        fullName:customer.fullName,
        email:customer.email,
        phoneNumber:customer.phoneNumber,
      }
      res.json(responseData);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};


//works
exports.postAddCategory = async (req, res) => {
  if (!req.admin) {
    return res.status(401).json({
      login: false,
      message: "Admin is not logged in"
    })
  }
  try {
    const { name } = req.body;
    const { imageUrl } = req.files;
    const category = new Category({
      name,
      imageUrl:imageUrl[0].originalname,
    });
    await category.save();
    res.status(200).json({
      message:"Successfully Added category",
      admin:req.admin,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "DB 500 Error"
    })
  }
}
//works
exports.getEditProduct = async (req, res) => {
  if (!req.admin) {
    return res.status(401).json({
      login: false,
      message: "Admin is not logged in"
    })
  }
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json({
      productData: product,
      login: true,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "DB 500 Error"
    })
  }
}

exports.postEditProduct = async (req, res) => {
  const id = req.params.id;
  const { name, price, description, category, imageUrl } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id,{
      name,price,description,category
    });
    if(product){
      return res.status(200).json({
        message: "Product updated successfully",
      })
    }
    res.status(500).json({
      message:"Product Cant Be Updated",
    })
  } catch(error){
    console.log(error);
    res.status(500).json({
      message: "DB 500 Error"
    })
  }
}
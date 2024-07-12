
const crypto = require("crypto");
const Product = require("../../model/productModel");
const Category = require("../../model/categoryModel")
const orderService = require("../../services/orderServices");
const Promotion = require("../../model/promotionModel")


exports.getIndex = async (req, res) => {
  try {
    const products = await Product.find({});

    if (!req.costumerToken) {
      return res.status(200).json({
        products: products,
      })
    }
    return res.status(200).json({
      costumerToken: req.costumerToken,
      products: products,
    })
  } catch (error) {
    console.log(error)
  }
}
exports.getCategoryName = async(req,res) => {
  try{
    const categoryNames = await Category.find({});
    res.status(200).json({
      categories:categoryNames
    })
  } catch(err){
    console.log(err);
  }
}

exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const category = product.category;
    const similarProducts = await Product.find({
      category,
      _id: { $ne: product._id }  // Exclude the current product
    });
    if (!req.costumerToken) {
      return res.status(200).json({
        productData: product,
        similarProducts
      })
    }
    return res.status(200).json({
      costumerToken: req.costumerToken,
      productData: product,
      similarProducts
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "DB 500 Error"
    })
  }
}


exports.getCategoryProducts = async (req, res) => {
  try {
    const categoryName = req.params.name;
    
    const category = await Category.find({name: categoryName });
    
    const products = await Product.find({ category: category[0].name });
    if (!req.costumerToken) {
      return res.status(200).json({
        categoryProducts: products
      })
    }
    res.status(200).json({
      costumerToken: req.costumerToken,
      categoryProducts: products
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "DB 500 Error"
    })
  }
}
const createSignature = (message) => {
  // secret in env file
  const secret = "8gBm/:&EnhH.1/q"; //different in production
  // Create an HMAC-SHA256 hash
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);

  // Get the digest in base64 format
  const hashInBase64 = hmac.digest("base64");
  return hashInBase64;
};

exports.handleEsewaSuccess = async (req, res, next) => {
  // console.log("handling esewa success")
  try {
    const { data } = req.query;
    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf-8")
    );
    // console.log(decodedData);

    if (decodedData.status !== "COMPLETE") {
      return res.status(400).json({ messgae: "errror" });
    }
    const message = decodedData.signed_field_names
      .split(",")
      .map((field) => `${field}=${decodedData[field] || ""}`)
      .join(",");
    // console.log(message);
    const signature = createSignature(message);

    // if (signature !== decodedData.signature) {
    //   res.json({ message: "integrity error" });
    // }

    req.transaction_uuid = decodedData.transaction_uuid;
    req.transaction_code = decodedData.transaction_code;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err?.message || "No Orders found" });
  }
}
exports.createOrder = async (req, res) => {
  try {
    // console.log(req.body);
    const order = await orderService.save(req.body);
    // console.log(order)
    const signature = createSignature(
      `total_amount=${order.amount},transaction_uuid=${order._id},product_code=EPAYTEST`
    );
    // console.log(signature)
    if (order.payment_method === "esewa") {
      const formData = {
        amount: order.amount,
        failure_url: "http://localhost:5173",
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature: signature,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: "https://digitalkirana-server.vercel.app/api/esewa-success",
        tax_amount: "0",
        total_amount: order.amount,
        transaction_uuid: order._id,
      };
      res.json({
        message: "Order Created Sucessfully",
        order,
        payment_method: "esewa",
        formData,
      });
    }
  } catch (err) {
    return res.status(400).json({ error: err?.message || "No Orders found" });
  }
};

exports.updateOrderAfterPayment = async (req, res, next) => {
  // console.log("updating esewa payInfo")
  try {
    const order = await orderService.findById(req.transaction_uuid);
    order.status = "paid";
    order.transaction_code = req.transaction_code;

    await orderService.save(order);
    return res.redirect("http://localhost:5173");
  } catch (err) {
    return res.status(400).json({ error: err?.message || "No Orders found" });
  }
};

exports.getPromotionImage = async (req, res) => {
  try {
    console.log(req.body)
    const newPromotion = new Promotion(req.body);
    await newPromotion.save();
    res.status(201).json({ message: 'Promotion stored successfully!' });
  } catch (err) {
    // console.error('Error:', err);
    res.status(500).json({ message: 'Error storing promotion' });
  }
};

exports.getSelectedPromotion = async (req, res) => {
  console.log(req.query)
  const { bannerId, adId } = req.query;
  try {
    //remove previous banner & advertisement
    await Promotion.updateMany({ selected: true }, { $set: { selected: false } });
    //add new banner & advertisement
    await Promotion.updateMany(
      { _id: { $in: [bannerId, adId] } },
      { $set: { selected: true } }
    );
    res.status(200).send('Banner and Advertisement selected successfully.');
  } catch (error) {
    res.status(500).send('An error occurred.');
  }
};


exports.getSearchData = async (req, res) => {
  try {
      const query = req.params.query;
      if (!query) {
          return res.status(400).json({ message: 'Search query is required' });
      }

      // Filtering products 
      const products = await Product.find({
          productName: { $regex: query, $options: 'i' }
      });

      res.status(200).json(products);
  } catch (error) {
      console.error('Error fetching search data:', error.message, error.stack); // More detailed logging
      res.status(500).json({ message: 'Server error' });
  }
};

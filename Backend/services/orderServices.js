const Order = require("../model/orderModel");

exports.save = async (order) => {
  try {
    if (order && !order._id) {
      order = new Order(order);
    }
    return await order.save();
  } catch (error) {
    console.error('Error saving order:', error.message);
    throw new Error('Could not save order');
  }
};

exports.findById = async (id = {}) => {
  try {
    return await Order.findById(id);
  } catch (error) {
    console.error('Error finding order:', error.message);
    throw new Error('Could not find order');
  }
};

exports.getCount = async (id = {}) => {
  try {
    return await Order.countDocuments();
  } catch (error) {
    console.error('Error counting order:', error.message);
    throw new Error('Could not count order');
  }
};


exports.updateOne = async (filter = {}, update) => {
  try {
    return await Order.findOneAndUpdate(filter, update);
  } catch (error) {
    console.error('Error updating order:', error.message);
    throw new Error('Could not update order');
  }
};

exports.delete = async (id) => {
  try {
    return await Order.deleteOne({
      _id: id,
    });
  } catch (error) {
    console.error('Error deleting order:', error.message);
    throw new Error('Could not delete order');
  }
};
const Order = require('../../model/orderModel'); 
const User = require('../../model/userModel'); 
const Product = require('../../model/productModal'); 
const Cart = require('../../model/cartModel')

const placeOrder = async (req, res) => {
  try {
    const { address, paymentMethods, cartItems, cartSummary } = req.body;
    console.log(req.body);
    

    if ( !req.user?.id || !address || !paymentMethods || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    let totalPrice = 0;
    let subtotal = 0 
    let shippingCharge =0


    const products = await Promise.all(
      cartItems.map(async (item) => {
        const productId = item.product?._id
        const variantId = item.variant
    
    
        if (!productId) {
          throw new Error(`Invalid product details in cart item: ${JSON.stringify(item)}`);
        }
        
        const product = await Product.findById(productId);
         console.log('placeorder',product);
         

        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found.`);
        }

        const variant = product.variants.find(v => v._id.toString() === variantId);

        if (!variant) {
          throw new Error(`Variant with ID ${variantId} not found for product ${product._id}`);
        }

        if (variant.stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }

  
        const itemPrice = item.variantDetails?.salePrice
        const quantity = item.quantity
        const totalItemPrice = itemPrice * quantity

        subtotal += totalItemPrice
        totalPrice += totalItemPrice

         console.log('here the stock informantion',variant.stock);
         
         variant.stock-= item.quantity;
        await product.save();

        return {
          productId: product._id,
          variantId: variantId,
          quantity: item.quantity,
          price: item.variantDetails.salePrice, 
        };
      })
    );

    if(subtotal < 1000){
      shippingCharge = 50
      totalPrice += shippingCharge
    }

    const newOrder = new Order({
      userId: req.user?.id,
      subtotal:subtotal,
      totalPrice: totalPrice,  
      shippingAddressId:address._id,
      paymentInfo: paymentMethods,
      products, 
      status:'pending',
      shippingCost: shippingCharge

    });

    const savedOrder = await newOrder.save();

    await Cart.deleteMany({user: req.user?.id})


    res.status(201).json({ message: 'Order placed successfully', orderId: savedOrder._id });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
};





const getAllOrders = async (req, res) => {
  try {
    // Assuming user is authenticated and we can get user ID from req.user
    const orders = await Order.find({ userId: req.user?.id })
      .sort({ orderDate: -1 });
      console.log(orders);
      
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching orders', 
      error: error.message 
    });
  }
};



const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.orderId, 
      user: req.user._id 
    })
    .populate('products.productId')
    .populate('shippingAddressId')
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    console.log(order);
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching order details', 
      error: error.message 
    });
  }
};

const cancelOrder = async (req, res) =>{
   const {orderId} = req.params

   try {

    const order = await Order.findById(orderId)

    if(!order){
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = 'cancelled'
    await order.save()
    return res.json({  message: 'Order cancelled successfully' });

   } catch (error) {
    console.error('Error cancelling order:', error);
    return res.status(500).json({ success: false, message: 'Failed to cancel order' });
   }


}




module.exports = { 
  placeOrder,
  getAllOrders,
  cancelOrder,
  getOrderDetails
};

const Order = require('../../model/orderModel'); 
const User = require('../../model/userModel'); 
const Product = require('../../model/productModal'); 
const Cart = require('../../model/cartModel')
const razorpay = require('../../config/razorpay')
const Coupon = require('../../model/couponModel')
const crypto = require('crypto')

const placeOrder = async (req, res) => {
  try {
    const { address, paymentMethods, cartItems, cartSummary } = req.body;
    console.log('oooooo',req.body);
    

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

    const { discount = 0,  } = cartSummary || {};
    const total = subtotal + shippingCharge - discount;


    const newOrder = new Order({
      userId: req.user?.id,
      subtotal:subtotal,
      totalPrice: total,  
      shippingAddressId:address._id,
      paymentInfo: paymentMethods,
      products, 
      status:'pending',
      shippingCost: shippingCharge,
      discount:discount

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


const cancelProduct = async (req, res)=>{
  const {orderId, productId} = req.body


  try {

    const order = await Order.findById(orderId)

    if(!order){
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const productIndex = order.products.findIndex(
      (product)=> product.productId.toString() === productId
    )
    if(productIndex === -1){
      return res.status(404).json({ success: false, message: 'Product not found in order' });
    }

    order.products.splice(productIndex,1)

    order.totalPrice = order.products.reduce(
      (total, product) => total + product.price * product.quantity,0
    )
    await order.save();

    return res.status(200).json({ success: true, message: 'Product canceled successfully' });
    
  } catch (error) {
    console.error('Error canceling product:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  
  }
}






const rezorpayLoad = async (req, res)=>{
   const {amount, currency} = req.body
  console.log('razorpay',req.body);
  
   try {
    
     const options ={
       amount: amount * 100,
       currency: currency,
       receipt:`receipt_${Date.now()}`
     }

     const order = await razorpay.orders.create(options)
     console.log(order);
     
     res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID // Send key_id from backend
    });
     } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Something went wrong!" });
   }

}




const varifyPayment =  async (req, res) => {
  try {
    console.log('nbnbn',req.body);
    
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderDetails
    } = req.body;

    const { address, paymentMethods, cartItems,cartSummary } = orderDetails;


    if ( !address || !paymentMethods || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");


        let totalPrice = 0;
        let subtotal = 0 
        let shippingCharge =0

  
        const products = await Promise.all(
          cartItems.map(async (item) => {
            const productId = item.product?._id
            const variantId = item.variant
        
            console.log(productId,variantId);
            
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
    

    const { discount = 0 } = cartSummary || {};
    const total = subtotal + shippingCharge - discount;

    if (expectedSignature === razorpay_signature) {
      const order = await Order.create({
        userId: req.user.id,
        subtotal:subtotal,
        totalPrice:total,
        shippingAddressId:address._id,
        paymentInfo:paymentMethods,
        products,
        status:'pending',
        shippingCost: shippingCharge,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      });
  
      
      await Cart.deleteMany({user: req.user?.id})
    //  const savedOrder = await order.save();
    //  console.log('abcd',savedOrder);
     

      res.json({
         success: true,
         message: 'Payment verified successfully',
         order });
         
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }


  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
}




const couponApply = async(req, res)=>{
  const {code, cartSummary} =req.body

  console.log('applay copon',code , cartSummary);
  

   if(!code || !cartSummary){
    return res.status(400).json({ success: false, message: 'Coupon code or cart summary missing' });
   }
   try {

    const coupon = await Coupon.findOne({code})
    
    if(!coupon){
      return res.status(404).json({ success: false, message: 'Invalid coupon code' });
    }
    
    if(coupon.status !== 'Active'){
      return res.status(400).json({ success: false, message: 'Coupon is not active' });
    }
    console.log('copn',coupon);
    
    const currentDate = new Date()
    if(coupon.expiryDate < currentDate){
      return res.status(400).json({  message: 'Coupon has expired' });
    }
    
     if(cartSummary.totalPrice > coupon.maxAmount){
      return res.status(400).json({ message: `Cart subtotal must not exceed ${coupon.maxAmount} to use this coupon`});
     }

     
     const discount = (cartSummary.totalPrice * coupon.discount) / 100
     const total = cartSummary.totalPrice + cartSummary.shipping - discount

     return res.status(200).json({
      success: true,
      discount,
      total,
      message: 'Coupon applied successfully',
    });
    
   } catch (error) {
    console.error('Error applying coupon:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
   }
}



module.exports = { 
  placeOrder,
  getAllOrders,
  cancelOrder,
  cancelProduct,
  rezorpayLoad,
  varifyPayment,
  couponApply,
  getOrderDetails
};

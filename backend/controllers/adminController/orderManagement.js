const Orders = require('../../model/orderModel')



const loadOrderDetails = async (req, res) => {
  try {
    const orders = await Orders.find()
    .populate('products.productId')
    .populate('shippingAddressId')
    .populate('userId')
    
    console.log('vergin',orders);

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Orders not found' });
    }
 
    res.status(200).json(orders);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'An error occurred while retrieving orders' });
  }
};


const updateOrderStatus = async(req, res) =>{
  const {id} = req.params
  const {status} = req.body
  console.log('orr',id,status);
  
  try {
    const order = await Orders.findById(id)

    if(!order) return res.status(404).json({message: 'Order not found'})
     
      order.status =status
      await order.save()
    res.status(200).json({message:'Status update Successfully'})
  } catch (error) {
    res.status(500).json({ message:'UpdateOrder status failed'});

  }
}


const cancellOrder = async(req, res) => {
  const {id} = req.params
  
  try {
    const order = await Orders.findById(id)
    
    if(!order) return res.status(404).json({message:'Order not found'})
      
      order.status = 'cancelled'

      await order.save()
    
      res.status(200).json({message:'Order cancelled successfully'})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports={
  loadOrderDetails,
  updateOrderStatus,
  cancellOrder
}
const Orders = require('../../model/orderModel')
const mongoose = require('mongoose');
const Wallet = require('../../model/walletModel')
const { v4: uuidv4 } = require('uuid'); 
const { PDFDocument, rgb,StandardFonts } = require('pdf-lib');
const path = require('path');
const fs = require('fs')

const loadOrderDetails = async (req, res) => {
  try {
    const orders = await Orders.find()
    .populate('products.productId')
    .populate('shippingAddressId')
    .populate('userId')
    
    console.log('vfxorder',orders);

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Orders not found' });
    }
 
    res.status(200).json(orders);
  } catch (error) {
    console.error(error); 
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
      
      order.status = status
      
      
      if (status.toLowerCase() === 'delivered' && order.paymentInfo === 'COD') {
        
        order.products = order.products.map(product => {
          if (!product.isCanceled && (!product.returnRequest || product.returnRequest.status !== 'approved')) {
            return {
              ...product,
              paymentStatus: 'completed'
            };
          }
          return product;
        });
        
        order.paymentStatus = 'completed';
      }
      await order.save()
      console.log(order);
    res.status(200).json({message:'Status update Successfully'})
  } catch (error) {
    res.status(500).json({ message:'UpdateOrder status failed'});

  }
}


const cancelOrder = async(req, res) => {
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


const updateReturnRequest = async (req, res) => {
  try {
      const { orderId, productId } = req.params;
      const { status } = req.body;

      const validStatuses = ['approved', 'rejected', 'processing', 'completed'];
      if (!validStatuses.includes(status)) {
          return res.status(400).json({
              success: false,
              message: 'Invalid status provided'
          });
      }

      const order = await Orders.findOne({
          _id: orderId,
          'products._id': productId
      });

      if (!order) {
          return res.status(404).json({
              success: false,
              message: 'Order or product not found'
          });
      }

      const returnProduct = order.products.find(
          product => product._id.toString() === productId
      );

      if (status === 'approved') {
          const refundAmount = returnProduct.price * returnProduct.quantity;

          const wallet = await Wallet.findOne({ user: order.userId });

          if (!wallet) {
              const newWallet = new Wallet({
                  user: order.userId,
                  balance: refundAmount,
                  transactions: [{
                      transactionId: uuidv4(),
                      description: `Refund for order #${order._id.toString().slice(0, 8)}`,
                      amount: refundAmount,
                      type: 'credit',
                      status: 'completed',
                      date: new Date()
                  }]
              });
              await newWallet.save();
          } else {
              await Wallet.findOneAndUpdate(
                  { user: order.userId },
                  {
                      $inc: { balance: refundAmount },
                      $push: {
                          transactions: {
                              transactionId: uuidv4(),
                              description: `Refund for order #${order._id.toString().slice(0, 8)}`,
                              amount: refundAmount,
                              type: 'credit',
                              status: 'completed',
                              date: new Date()
                          }
                      }
                  }
              );
          }

          await Orders.findOneAndUpdate(
              {
                  _id: orderId,
                  'products._id': productId
              },
              {
                  $set: {
                      'products.$.returnRequest.status': status,
                      'products.$.returnRequest.updatedAt': new Date(),
                      'products.$.returnRequest.refundAmount': refundAmount,
                      'products.$.returnRequest.refundedAt': new Date(),
                      'products.$.paymentStatus': 'refunded'
                  }
              }
          );

          res.status(200).json({
              success: true,
              message: 'Return request approved and refund processed successfully',
              data: {
                  refundAmount,
                  orderId: order._id
              }
          });
      } else {
          await Orders.findOneAndUpdate(
              {
                  _id: orderId,
                  'products._id': productId
              },
              {
                  $set: {
                      'products.$.returnRequest.status': status,
                      'products.$.returnRequest.updatedAt': new Date()
                  }
              }
          );

          res.status(200).json({
              success: true,
              message: 'Return request updated successfully'
          });
      }
  } catch (error) {
      console.error('Error in updateReturnRequest:', error);
      res.status(500).json({
          success: false,
          message: 'Error updating return request',
          error: error.message
      });
  }
};


const exportPdf = async(req, res)=>{
  const { timeFilter, orderData } = req.body;
  console.log(req.body);
  
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    let yPosition = 750;

    page.drawText(`Sales Report (${timeFilter})`, { x: 50, y: yPosition, size: 16, font });
    yPosition -= 20;

    orderData.forEach((order, index) => {
      page.drawText(`${index + 1}. Order ID: ${order._id}, Total Price: Rs${order.totalPrice}`, {
        x: 50,
        y: yPosition,
        size: 12,
        font,
      });
      yPosition -= 15;
    });

    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=sales_report.pdf');
    res.send(pdfBytes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating PDF');
  }
}



module.exports={
  loadOrderDetails,
  updateOrderStatus,
  cancelOrder,
  updateReturnRequest,
  exportPdf
}
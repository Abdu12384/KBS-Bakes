const mongoose = require('mongoose')
const Order = require('../../model/orderModel')
const Product = require('../../model/productModal')
const category = require('../../model/category')



const getDashboardData = async (req, res) => {
  const {period} = req.query

  try {
      console.log(period);
      
    let matchCondition = {}
    const currentDate = new Date()

    if(period === 'Monthly'){
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(),1)
      matchCondition = { createdAt: {$gte: startOfMonth}}
    }else if (period === 'Yearly'){
      const startOfYear = new Date(currentDate.getFullYear(),0,1)
      matchCondition = {createdAt: {$gte: startOfYear}}
    }

    const stats = await Order.aggregate([
      {$match: matchCondition},
      {
        $group:{
          _id:null,
          totalRevenue:{$sum:'$totalPrice'},
          totalOrders: {$count:{}}
        }
      },
      {
        $project:{
          _id: 0,
          totalRevenue: 1,
          totalOrders: 1
        }
      }
    ])


    const bestSellingProducts = await Order.aggregate([
      {$match: matchCondition},
       {$unwind: '$products'},
       {
         $group: {
          _id: "$products.productId",
          totalSales: {$sum: "$products.quantity"},
         },
       },
       {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails"
        },
       },
       {$unwind: "$productDetails"},
       {
        $project: {
          _id:1,
          productId:"$_id",
          productName:"$productDetails.productName",
          category: "$productDetails.category",
          productImage: "$productDetails.images",
          price: "$productDetails.variants.salePrice",
          totalSales:1,
        },
       },
       {$sort:{totalSales: -1}},
       {$limit:5}
    ])


    const topCategories =  await Order.aggregate([
      {$match: matchCondition},
      {$unwind: '$products'},
      {
        $lookup:{
          from: 'products',
          localField:'products.productId',
          foreignField:'_id',
          as:'productDetails',
        }
      },
      {$unwind:'$productDetails'},
      {
        $group:{
          _id:'$productDetails.category',
          totalSales: {$sum: '$products.quantity'},
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'categoryDetails',
        },
      },
      { $unwind: '$categoryDetails' },
      {
        $project: {
          _id: 0,
          categoryId: '$_id',
          categoryName: '$categoryDetails.name',
          totalSales: 1,
        },
      },
      { $sort: { totalSales: -1 } },
      {$limit: 5}
    ])


    const dashboardData = {
      stats: stats[0] || { totalRevenue: 0, totalOrders: 0, totalExpenses: 0 },
      bestSellingProducts,
      topCategories
    };

 console.log(dashboardData);
 

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: dashboardData,
    });

  
    
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
      error: error.message,
    });

  }
}




module.exports={
  getDashboardData
}
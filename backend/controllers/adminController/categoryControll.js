
const Category = require('../../model/category');


const addCategory = async (req, res) => {
  try {
    console.log('category');
    
    const { name, description } = req.body;
   
     const existsCategory = await Category.findOne({name})

     if(existsCategory){
       return res.status(400).json({message:"Categroy already exists"})
     }

    const category = new Category({ name, description });
    console.log(category);
    
    await category.save();

    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const  fetchCategory = async(req, res)=>{
  
   try {

     const  Categories = await Category.find({})

     if(!Categories||Categories.length === 0){
      res.status(404).json({message:"Categories Not Fount "})
     }

     res.status(200).json(Categories)
    
   } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({message:"Server Error While Fetching Categorys"})
   }



}



 const editCategory = async(req, res)=>{

  try {
  
   const {id} = req.params
    const {name, description} = req.body
    const category = await Category.findByIdAndUpdate(
       id,
       {name,description},
       {new: true}
    )
   if(!category){
    return res.status(404).json({ message: 'Category not found' });
  }
  res.status(200).json({ message: 'Category updated successfully!',category });
 
} catch (error) {
  res.status(500).json({ message: 'Error updating category' });

}

 }





const softDeleteCategory = async(req,res)=>{
     console.log('categroy delete');
     const id = req.params.id

     const{isDeleted}= req.body

     try {
      const category = await Category.findByIdAndUpdate(
        id,
        {isDeleted},
        {new:true}
      )
      console.log(category);
      

      res.status(200).json(category)
      
     } catch (error) {
      console.error("Error in Categroy delete",error)
      res.status(500).json({message:"Server Error Block Category"})
     }
     
}

const addOfferCatogory = async (req, res)=>{
  const { categoryId } = req.params;
  const { offerName, offerPercentage, startDate, endDate } = req.body;

  try {
    // Find the category
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if there is an existing offer
    if (category.offer) {
      const existingOfferEndDate = new Date(category.offer.endDate);
      const currentDate = new Date();

      // Check if the existing offer is still valid
      if (existingOfferEndDate > currentDate) {
        return res.status(400).json({ message: 'An offer has already been applied and is still valid.' });
      }
    }

    // If no valid offer exists, update the category with the new offer
    category.offer = {
      offerName,
      offerPercentage,
      startDate,
      endDate,
    };

    const updatedCategory = await category.save(); // Save the updated category

    res.status(200).json({ message: 'Category offer applied successfully', updatedCategory });
  } catch (error) {
    console.error('Error adding offer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { 
  addCategory ,
  fetchCategory,
  editCategory,
  addOfferCatogory,
  softDeleteCategory,

};

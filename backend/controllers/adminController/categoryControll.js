
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

module.exports = { 
  addCategory ,
  fetchCategory,
  editCategory,
  softDeleteCategory,

};

import React,{useState,useEffect} from 'react'
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import axioInstence from '../utils/axioInstence';


function ProductList() {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6); // Start with 6 products

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axioInstence.get('/user/home-list-Product'); 
        console.log(response.data);
        setProducts(response.data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Load 6 more products each time
  };



console.log('product list',products);



  return (
    <section className="py-16 bg-[#d8cbc4]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-[#3d2516] mb-8 text-center">Our Signature Cakes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.slice(0,visibleCount).map((product) => (
         <Link to={`/user/product-details/${product._id}`} key={product._id}>
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
              <div className="relative h-64">
                <img
                  src={product.images[0] || '/src/assets/images/default.png'} 
                  alt={product.productName}
                  className="w-full h-full object-cover"
                  />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#5b3e31] mb-2">{product.productName}</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#8b6c5c] font-bold">
                ₹{product.variants?.[0]?.salePrice || 'Price not available'} 
                  </span>
                <div className="flex">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-500" />
                  ))}
                </div>
              </div>
              <button className="w-full bg-[#8b6c5c] text-white py-2 px-4 rounded-full hover:bg-[#765341] transition duration-300">
                Order Now
              </button>
            </div>
          </div>
       </Link>
        ))}
      </div>
      {visibleCount < products.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-[#8b6c5c] text-white py-2 px-6 rounded-full hover:bg-[#765341] transition duration-300"
            >
              Load More
            </button>
          </div>
        )}
    </div>

  </section>
  )
}

export default ProductList

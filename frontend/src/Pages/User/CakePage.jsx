import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import axioInstence from '../../utils/axioInstence';

const CakePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState('All');
  console.log('cakepage',products);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axioInstence.get('/user/home-list-Product');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['All', 'Birthday', 'Wedding', 'Anniversary', 'Special Occasion'];

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || product.category === selectedCategory)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="py-16 bg-[#d8cbc4] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#3d2516] mb-8 text-center">Our Delicious Cakes</h1>
        
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search cakes..."
              className="pl-10 pr-4 py-2 border border-[#8b6c5c] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8b6c5c]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8b6c5c]" size={20} />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-[#8b6c5c] text-white'
                    : 'bg-white text-[#8b6c5c] hover:bg-[#8b6c5c] hover:text-white'
                } transition duration-300`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-[#3d2516] text-xl">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product) => (
                <Link to={`/user/product-details/${product._id}`} key={product._id}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                    <div className="relative h-64">
                      <img
                        src={product.images[0] || '/src/assets/images/default.png'}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                      />
                      {/* <div className="absolute top-0 right-0 bg-[#8b6c5c] text-white px-2 py-1 m-2 rounded-full text-xs font-bold">
                        {product.category}
                      </div> */}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#5b3e31] mb-2">{product.productName}</h3>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[#8b6c5c] font-bold">
                          {product.variants && product.variants.length > 0
                            ? `$${product.variants.find(v => v.weight === '1 kg' || v.weight ==='500 g' )?.salePrice.toFixed(2) || 'N/A'}`
                            : 'Price not available'}
                        </span>
                      </div>
                      <button className="w-full bg-[#8b6c5c] text-white py-2 px-4 rounded-full hover:bg-[#765341] transition duration-300">
                        Order Now
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <nav className="flex items-center">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mr-2 p-2 rounded-full bg-white text-[#8b6c5c] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>
                {[...Array(Math.ceil(filteredProducts.length / productsPerPage))].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`mx-1 px-3 py-1 rounded-full ${
                      currentPage === index + 1
                        ? 'bg-[#8b6c5c] text-white'
                        : 'bg-white text-[#8b6c5c] hover:bg-[#8b6c5c] hover:text-white'
                    } transition duration-300`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
                  className="ml-2 p-2 rounded-full bg-white text-[#8b6c5c] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </nav>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CakePage;
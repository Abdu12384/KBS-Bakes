import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, SortAsc, SortDesc, Star, DollarSign, Clock, Zap, TrendingUp, ChevronDown, Filter, IndianRupee, Octagon } from 'lucide-react';
import axioInstence from '../../utils/axioInstence';
import NavBar from '../../Components/Navbar';
import Footer from '../../Components/Footer'

const CakePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('newest');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showSortButton, setShowSortButton] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState('All');


  const sortOptions = [
    { value: 'popularity', label: 'Popularity', icon: <TrendingUp size={16} /> },
    { value: 'price_asc', label: 'Price: Low to High', icon: <SortAsc size={16} /> },
    { value: 'price_desc', label: 'Price: High to Low', icon: <SortDesc size={16} /> },
    { value: 'avgRating', label: 'Average Ratings', icon: <Star size={16} /> },
    { value: 'featured', label: 'Featured', icon: <Zap size={16} /> },
    { value: 'newest', label: 'New Arrivals', icon: <Clock size={16} /> },
    { value: 'name_asc', label: 'Name: A to Z', icon: <SortAsc size={16} /> },
    { value: 'name_desc', label: 'Name: Z to A', icon: <SortDesc size={16} /> },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams()
         if(sortOption) params.append('sort',sortOption)
          if (selectedOccasion !== 'All') params.append('type', selectedOccasion);
        const response = await axioInstence.get(`/user/products-list?${params.toString()}`);
        console.log('ooooo',response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  },[sortOption,selectedOccasion]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSortButton(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const occasions = ['All', 'Birthday', 'Wedding', 'Anniversary', 'Custom'];

 

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
    (selectedOccasion === 'All' || (product.type && product.type?.includes(selectedOccasion)))
)


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="bg-gradient-to-br from-[#f3e8e3] to-[#d8cbc4] min-h-screen">
      <NavBar/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-[#3d2516] mb-8 text-center font-serif">Our Delicious Cakes</h1>
        
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search cakes..."
              className="pl-10 pr-4 py-2 border-2 border-[#8b6c5c] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8b6c5c] bg-white/80 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8b6c5c]" size={20} />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
          {occasions.map((occasion) => (
              <button
                key={occasion}
                className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                  selectedOccasion === occasion
                    ? 'bg-[#8b6c5c] text-white shadow-lg'
                    : 'bg-white/80 text-[#8b6c5c] hover:bg-[#8b6c5c] hover:text-white backdrop-blur-sm'
                }`}
                onClick={() => {
                  setSelectedOccasion(occasion);
                  setCurrentPage(1); // Reset to first page when changing occasion
                }}
              >
                {occasion}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mb-8">
          {showSortButton && (
            <button
              className={`px-4 py-2 bg-[#8b6c5c] text-white rounded-full flex items-center gap-2 hover:bg-[#765341] transition-all duration-300 ${
                showSortOptions ? 'w-full' : 'w-auto'
              }`}
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              <Filter size={16} className={`transition-transform duration-300 ${showSortOptions ? 'rotate-180' : ''}`} />
              <span className={`transition-opacity duration-300 ${showSortOptions ? 'opacity-100' : 'opacity-0'}`}>
                Sort by: {sortOptions.find(option => option.value === sortOption).label}
              </span>
            </button>
          )}
          {showSortOptions && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl z-10 p-2 w-full transition-all duration-300 ease-in-out transform origin-top">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`w-full text-left px-4 py-2 hover:bg-[#f3e8e3] flex items-center gap-2 transition-colors duration-200 ${
                    sortOption === option.value ? 'bg-[#f3e8e3] text-[#8b6c5c]' : 'text-gray-700'
                  }`}
                  onClick={() => {
                    setSortOption(option.value);
                    setShowSortOptions(false);
                  }}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center text-[#3d2516] text-xl">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#8b6c5c] mx-auto mb-4"></div>
            Loading...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product) => (
                <Link to={`/user/product-details/${product._id}`} key={product._id}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 group">
                    <div className="relative h-64">
                      <img
                        src={product.images[0] || '/src/assets/images/default.png'}
                        alt={product.productName}
                        className="w-full h-full object-cover transition duration-300 group-hover:opacity-75"
                      />
                      <div className="absolute top-0 left-0 bg-[#8b6c5c] text-white px-3 py-1 m-2 rounded-full text-xs font-bold">
                        {/* {product.category} */}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#5b3e31] mb-2 group-hover:text-[#8b6c5c] transition duration-300">{product.productName}</h3>
                      <div className="flex justify-between items-center mb-4">
                      <span className="text-[#8b6c5c] font-bold flex items-center">
                        <IndianRupee size={16} className="mr-1" />
                        {product.variants && product.variants.length > 0
                          ? product.variants[0].salePrice
                            ? product.variants[0].salePrice.toFixed(2)
                            : 'N/A'
                          : 'N/A'}
                      </span>
                        <span className="text-yellow-500 flex items-center">
                          <Star size={16} className="mr-1" fill="currentColor" />
                          {product.avgRating ? product.avgRating.toFixed(1) : 'N/A'}
                        </span>
                      </div>
                      <button className="w-full bg-[#8b6c5c] text-white py-2 px-4 rounded-full hover:bg-[#765341] transition duration-300 flex items-center justify-center gap-2">
                        <Zap size={16} />
                        Order Now
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <nav className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mr-2 p-2 rounded-full text-[#8b6c5c] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f3e8e3] transition duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
                {[...Array(Math.ceil(products.length / productsPerPage))].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`mx-1 w-8 h-8 rounded-full flex items-center justify-center ${
                      currentPage === index + 1
                        ? 'bg-[#8b6c5c] text-white'
                        : 'text-[#8b6c5c] hover:bg-[#f3e8e3]'
                    } transition duration-300`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                  className="ml-2 p-2 rounded-full text-[#8b6c5c] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f3e8e3] transition duration-300"
                >
                  <ChevronRight size={20} />
                </button>
              </nav>
            </div>
          </>
        )}
      </div>
      <Footer/>
    </section>
  );
};

export default CakePage;
import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [size, setSize] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    filterProducts(selectedCategory, priceRange, size);
  };

  const handlePriceChange = (event) => {
    const selectedPriceRange = event.target.value.split('-').map(Number);
    setPriceRange(selectedPriceRange);
    filterProducts(category, selectedPriceRange, size);
  };

  const handleSizeChange = (event) => {
    const selectedSize = event.target.value;
    setSize(selectedSize);
    filterProducts(category, priceRange, selectedSize);
  };

  const filterProducts = (selectedCategory, selectedPriceRange, selectedSize) => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]
    );

    // Filter by size
    if (selectedSize !== 'all') {
      filtered = filtered.filter((product) => product.sizes.includes(selectedSize));
    }

    setFilteredProducts(filtered);
  };

  return (
    
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 border-t mt-6 px-4">
      {/* Filter Sidebar */}
      <div className="sm:w-1/4">
        <p className="text-xl font-medium mb-4">Filters</p>
        <div className="border p-4 space-y-6">
          {/* Category Filter */}
          <div>
            <p className="font-medium mb-2">Category</p>
            <form className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={category === 'all'}
                  onChange={handleFilterChange}
                />
                All Products
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="Men"
                  checked={category === 'Men'}
                  onChange={handleFilterChange}
                />
                Men
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="Women"
                  checked={category === 'Women'}
                  onChange={handleFilterChange}
                />
                Women
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="Kids"
                  checked={category === 'Kids'}
                  onChange={handleFilterChange}
                />
                Kids
              </label>
            </form>
          </div>

          {/* Price Range Filter */}
          <div>
            <p className="font-medium mb-2">Price Range</p>
            <form className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  value="0-100"
                  checked={priceRange[0] === 0 && priceRange[1] === 100}
                  onChange={handlePriceChange}
                />
                $0 - $100
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  value="100-200"
                  checked={priceRange[0] === 100 && priceRange[1] === 200}
                  onChange={handlePriceChange}
                />
                $100 - $200
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  value="200-300"
                  checked={priceRange[0] === 200 && priceRange[1] === 300}
                  onChange={handlePriceChange}
                />
                $200 - $300
              </label>
            </form>
          </div>

          {/* Size Filter */}
          <div>
            <p className="font-medium mb-2">Size</p>
            <form className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="size"
                  value="all"
                  checked={size === 'all'}
                  onChange={handleSizeChange}
                />
                All Sizes
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="size"
                  value="S"
                  checked={size === 'S'}
                  onChange={handleSizeChange}
                />
                Small
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="size"
                  value="L"
                  checked={size === 'L'}
                  onChange={handleSizeChange}
                />
                Large
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="size"
                  value="XL"
                  checked={size === 'XL'}
                  onChange={handleSizeChange}
                />
                XL
              </label>
            </form>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      
      <div className="sm:w-3/4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

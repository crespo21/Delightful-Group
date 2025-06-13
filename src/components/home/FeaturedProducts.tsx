import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Button from '../ui/Button';
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}
const products: Product[] = [{
  id: 1,
  name: 'Premium Garden Soil',
  price: 149.99,
  image: 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  category: 'Garden'
}, {
  id: 2,
  name: 'Indoor Plant Collection',
  price: 299.99,
  image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  category: 'Plants'
}, {
  id: 3,
  name: 'Eco-Friendly Cleaning Kit',
  price: 199.99,
  image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  category: 'Cleaning'
}, {
  id: 4,
  name: 'Automatic Irrigation System',
  price: 599.99,
  image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  category: 'Garden'
}];
const ProductCard: React.FC<{
  product: Product;
}> = ({
  product
}) => {
  return <motion.div className="bg-white rounded-lg overflow-hidden shadow-md" whileHover={{
    y: -5
  }} transition={{
    duration: 0.3
  }}>
      <div className="h-48 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="text-lg font-semibold mt-1">{product.name}</h3>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-gray-800 font-bold">
            R{product.price.toFixed(2)}
          </span>
          <button className="p-2 bg-green-600 rounded-full text-white hover:bg-green-700 transition-colors" aria-label="Add to cart">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>;
};
const FeaturedProducts: React.FC = () => {
  return <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-gray-600">
              Discover our selection of premium products for your home and
              garden.
            </p>
          </div>
          <Button href="/shop" variant="outline">
            View All Products
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>;
};
export default FeaturedProducts;
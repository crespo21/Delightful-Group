import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, X, Plus, Minus } from 'lucide-react';
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
}, {
  id: 5,
  name: 'Gardening Tool Set',
  price: 249.99,
  image: 'https://images.unsplash.com/photo-1566842600175-97dca3c5ad38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  category: 'Garden'
}, {
  id: 6,
  name: 'Organic Plant Fertilizer',
  price: 89.99,
  image: 'https://images.unsplash.com/photo-1585314062340-95a8c3d5d0a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  category: 'Garden'
}, {
  id: 7,
  name: 'Decorative Flower Pots',
  price: 129.99,
  image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  category: 'Home'
}, {
  id: 8,
  name: 'Professional Cleaning Supplies',
  price: 179.99,
  image: 'https://images.unsplash.com/photo-1585421514284-efb74320d624?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  category: 'Cleaning'
}];
interface CartItem extends Product {
  quantity: number;
}
const Shop: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? product.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });
  const categories = Array.from(new Set(products.map(product => product.category)));
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => item.id === product.id ? {
          ...item,
          quantity: item.quantity + 1
        } : item);
      } else {
        return [...prevCart, {
          ...product,
          quantity: 1
        }];
      }
    });
  };
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart => prevCart.map(item => item.id === id ? {
        ...item,
        quantity
      } : item));
    }
  };
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  return <div className="min-h-screen">
      <section className="relative py-20 bg-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4 text-center" initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            Shop
          </motion.h1>
          <motion.div className="w-24 h-1 bg-white mx-auto mb-8" initial={{
          opacity: 0,
          scaleX: 0
        }} animate={{
          opacity: 1,
          scaleX: 1
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }}></motion.div>
          <motion.p className="text-center max-w-2xl mx-auto text-lg" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.5
        }}>
            Browse our selection of quality products for your home and garden.
          </motion.p>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-0">
              <div className="relative mb-4 md:mb-0 md:mr-4">
                <input type="text" aria-label="Search products" placeholder="Search products..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-64" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <Search size={20} className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
                <button className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${activeCategory === null ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`} onClick={() => setActiveCategory(null)}>
                  All
                </button>
                {categories.map(category => <button key={category} className={`px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === category ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`} onClick={() => setActiveCategory(category)}>
                    {category}
                  </button>)}
              </div>
            </div>
            <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={20} className="mr-2" />
              <span>Cart ({cartItemCount})</span>
            </button>
          </div>
          {filteredProducts.length === 0 ? <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No products found. Try adjusting your search.
              </p>
            </div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => <motion.div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md" whileHover={{
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
                    <h3 className="text-lg font-semibold mt-1">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-gray-800 font-bold">
                        R{product.price.toFixed(2)}
                      </span>
                      <button className="p-2 bg-green-600 rounded-full text-white hover:bg-green-700 transition-colors" onClick={() => addToCart(product)} aria-label="Add to cart">
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>)}
            </div>}
        </div>
      </section>
      {/* Shopping Cart Sidebar */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-180px)]">
          {cart.length === 0 ? <div className="text-center py-8">
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div> : <div className="space-y-4">
              {cart.map(item => <div key={item.id} className="flex items-center border-b pb-4">
                  <div className="h-16 w-16 rounded overflow-hidden mr-4">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-gray-600">R{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <button className="p-1 text-gray-500 hover:text-gray-700" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={16} />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="p-1 text-gray-500 hover:text-gray-700" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>)}
            </div>}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-xl">R{cartTotal.toFixed(2)}</span>
          </div>
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors" disabled={cart.length === 0}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>;
};
export default Shop;
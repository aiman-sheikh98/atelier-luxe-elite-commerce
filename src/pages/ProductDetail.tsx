
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getProductById, Product, getProductsByCategory } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<number>(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const { addItem } = useCart();
  const { isAuthenticated, addToWishlist, removeFromWishlist, checkInWishlist } = useAuth();
  
  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors[0]);
        
        // Get related products from the same category
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== productId)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [productId]);
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity,
        category: product.category
      });
    }
  };
  
  const isInWishlist = product && isAuthenticated && checkInWishlist(product.id);
  
  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }
    
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };
  
  if (!product) {
    return (
      <>
        <Header />
        <div className="luxury-container py-12 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The product you are looking for does not exist or has been removed.
            </p>
            <Button 
              asChild
              className="bg-luxury hover:bg-luxury-dark text-white"
            >
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  // Format price to currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <>
      <Header />
      
      <main className="luxury-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-muted aspect-square overflow-hidden">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square bg-muted border-2 ${
                    activeImage === index ? 'border-luxury' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-serif">{product.name}</h1>
              <p className="text-lg font-medium text-luxury mt-2">{formattedPrice}</p>
            </div>
            
            <p className="text-muted-foreground">{product.description}</p>
            
            {/* Color selection */}
            <div>
              <h3 className="text-sm font-medium mb-3">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full ${
                      selectedColor === color ? 'ring-2 ring-offset-2 ring-luxury' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex items-center border border-border w-32">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-10 flex items-center justify-center border-r border-border"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} className={quantity <= 1 ? 'text-muted-foreground' : ''} />
                </button>
                <span className="flex-1 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-10 flex items-center justify-center border-l border-border"
                  disabled={quantity >= 10}
                >
                  <Plus size={16} className={quantity >= 10 ? 'text-muted-foreground' : ''} />
                </button>
              </div>
            </div>
            
            {/* Add to cart & wishlist buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                className="bg-luxury hover:bg-luxury-dark text-white flex-1 py-6"
              >
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
              </Button>
              
              <Button
                onClick={handleWishlistToggle}
                variant="outline"
                className="border-luxury text-luxury hover:bg-luxury hover:text-white py-6"
              >
                <Heart 
                  size={18} 
                  className={`mr-2 ${isInWishlist ? 'fill-luxury text-luxury' : ''}`} 
                />
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
            
            {/* Product details */}
            <div className="border-t border-border pt-8">
              <h3 className="text-lg font-serif mb-4">Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-luxury mr-2">•</span>
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <section className="mt-24">
          <ProductGrid products={relatedProducts} title="You May Also Like" />
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default ProductDetail;

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useAuth } from '@/context/AuthContext';
interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product
}) => {
  const {
    isAuthenticated,
    addToWishlist,
    removeFromWishlist,
    checkInWishlist
  } = useAuth();
  const isInWishlist = isAuthenticated && checkInWishlist(product.id);
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  // Format price to currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price);
  return <div className="group relative">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          {/* Product image */}
          <img src={product.images[0]} alt={product.name} className="w-full h-80 object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.new && <span className="bg-luxury-light text-white px-3 py-1 text-xs font-medium">
                New
              </span>}
            {product.bestseller && <span className="bg-luxury-dark text-white px-3 py-1 text-xs font-medium">
                Bestseller
              </span>}
          </div>
          
          {/* Wishlist button */}
          <Button onClick={handleWishlistToggle} variant="ghost" size="icon" className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-foreground shadow-sm transition-all z-10">
            <Heart size={18} className={isInWishlist ? "fill-luxury text-luxury" : ""} />
          </Button>
        </div>
        
        {/* Product info */}
        <div className="mt-4 space-y-1">
          <h3 className="font-medium text-foreground">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground capitalize">
            {product.category}
          </p>
          <p className="font-medium text-luxury">
            {formattedPrice}
          </p>
        </div>
      </Link>
    </div>;
};
export default ProductCard;
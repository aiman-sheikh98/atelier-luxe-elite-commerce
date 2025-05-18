
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/data/products';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg text-muted-foreground">No products found</h3>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {title && (
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif">{title}</h2>
          <div className="w-20 h-0.5 bg-luxury mx-auto mt-4"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

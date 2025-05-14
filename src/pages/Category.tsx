
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { getProductsByCategory, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  useEffect(() => {
    if (categoryId) {
      const categoryProducts = getProductsByCategory(categoryId as any);
      setProducts(categoryProducts);
    }
  }, [categoryId]);
  
  const handleSort = (value: string) => {
    setSortBy(value);
    
    let sortedProducts = [...products];
    
    switch (value) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedProducts = sortedProducts.filter(p => p.new).concat(
          sortedProducts.filter(p => !p.new)
        );
        break;
      default: // 'featured'
        sortedProducts = sortedProducts.filter(p => p.featured).concat(
          sortedProducts.filter(p => !p.featured)
        );
        break;
    }
    
    setProducts(sortedProducts);
  };
  
  const getCategoryTitle = () => {
    if (!categoryId) return 'Products';
    
    // Convert from URL format (bags) to display format (Bags)
    return categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        <div className="luxury-container py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-serif">{getCategoryTitle()}</h1>
            <p className="text-muted-foreground mt-2">
              Discover our collection of luxury {categoryId}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <Button
              variant="outline"
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              className="flex items-center md:hidden"
            >
              <span>Filters</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            
            <div className={`w-full md:w-auto space-y-4 ${filterMenuOpen ? 'block' : 'hidden md:block'}`}>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={sortBy === 'featured' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSort('featured')}
                  className={sortBy === 'featured' ? 'bg-luxury hover:bg-luxury-dark' : ''}
                >
                  Featured
                </Button>
                <Button
                  variant={sortBy === 'newest' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSort('newest')}
                  className={sortBy === 'newest' ? 'bg-luxury hover:bg-luxury-dark' : ''}
                >
                  Newest
                </Button>
                <Button
                  variant={sortBy === 'price-low' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSort('price-low')}
                  className={sortBy === 'price-low' ? 'bg-luxury hover:bg-luxury-dark' : ''}
                >
                  Price: Low to High
                </Button>
                <Button
                  variant={sortBy === 'price-high' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSort('price-high')}
                  className={sortBy === 'price-high' ? 'bg-luxury hover:bg-luxury-dark' : ''}
                >
                  Price: High to Low
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {products.length} products
            </p>
          </div>
          
          <ProductGrid products={products} />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Category;

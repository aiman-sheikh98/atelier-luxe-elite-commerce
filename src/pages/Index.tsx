import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { getFeaturedProducts, getNewArrivals, getBestsellers } from '@/data/products';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const bestsellers = getBestsellers();
  const categories = [{
    name: 'Bags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1035&auto=format&fit=crop',
    path: '/category/bags',
    description: 'Iconic designs crafted from the finest materials.'
  }, {
    name: 'Wallets',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=987&auto=format&fit=crop',
    path: '/category/wallets',
    description: 'Functional elegance for the discerning customer.'
  }, {
    name: 'Sneakers',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=987&auto=format&fit=crop',
    path: '/category/sneakers',
    description: 'Where comfort meets uncompromising style.'
  }, {
    name: 'Clothing',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1011&auto=format&fit=crop',
    path: '/category/clothing',
    description: 'Timeless garments with exceptional craftsmanship.'
  }, {
    name: 'Watches',
    image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1742&auto=format&fit=crop',
    path: '/category/watches',
    description: 'Masterpieces of precision and artistry.'
  }, {
    name: 'Perfumes',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1780&auto=format&fit=crop',
    path: '/category/perfumes',
    description: 'Exquisite fragrances for the discerning individual.'
  }];
  
  return <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black">
          <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop" alt="Luxury Fashion" className="w-full h-full object-cover opacity-90" />
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium max-w-3xl leading-tight">
            Discover Timeless Luxury for the Modern Era
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-xl">
            Craftsmanship, heritage and exceptional materials define our collection
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-luxury hover:bg-luxury-dark text-white rounded-none px-8">
              <Link to="/category/bags">Shop Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none px-8">
              <Link to="/fashion-shows">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="luxury-container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif">Our Collections</h2>
          <div className="w-20 h-0.5 bg-luxury mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => <Link key={category.name} to={category.path} className="group relative overflow-hidden block">
              <div className="aspect-[4/3] bg-muted">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-serif">{category.name}</h3>
                <p className="text-white/80 mt-2 max-w-xs">{category.description}</p>
                <div className="mt-4 flex items-center text-luxury-light">
                  <span className="text-sm font-medium">Shop Collection</span>
                  <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>)}
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="bg-muted py-24">
        <div className="luxury-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif">New Arrivals</h2>
            <div className="w-20 h-0.5 bg-luxury mx-auto mt-4"></div>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
              The latest additions to our collection, representing the pinnacle of contemporary luxury.
            </p>
          </div>
          
          <ProductGrid products={newArrivals} />
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="border-luxury text-luxury hover:bg-luxury hover:text-white rounded-none px-8">
              <Link to="/collection/new-arrivals">View All New Arrivals</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="luxury-container py-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif">Featured Products</h2>
          <div className="w-20 h-0.5 bg-luxury mx-auto mt-4"></div>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            Our curated selection of exceptional products, chosen for their outstanding craftsmanship and design.
          </p>
        </div>
        
        <ProductGrid products={featuredProducts} />
        
        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="border-luxury text-luxury hover:bg-luxury hover:text-white rounded-none px-8">
              <Link to="/collection/featured">View All Featured</Link>
          </Button>
        </div>
      </section>
      
      {/* Brand Story Section */}
      <section className="bg-luxury-bg py-24">
        <div className="luxury-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Our Heritage</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Since 1897, we have been crafting luxury goods with an unwavering commitment to quality and design excellence.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our artisans combine traditional techniques with modern innovation, creating pieces that transcend time and trend.
              </p>
              <Button asChild className="bg-luxury hover:bg-luxury-dark text-white rounded-none px-8 mt-4">
                <Link to="/fashion-shows">Discover Our Story</Link>
              </Button>
            </div>
            <div className="relative">
              <img alt="Artisan craftsmanship" className="w-full h-auto" src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Bestsellers Section */}
      <section className="luxury-container py-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif">Bestsellers</h2>
          <div className="w-20 h-0.5 bg-luxury mx-auto mt-4"></div>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            Our most coveted items, cherished by discerning customers worldwide for their timeless appeal.
          </p>
        </div>
        
        <ProductGrid products={bestsellers} />
        
        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="border-luxury text-luxury hover:bg-luxury hover:text-white rounded-none px-8">
            <Link to="/collection/bestsellers">View All Bestsellers</Link>
          </Button>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-muted py-24">
        <div className="luxury-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-4">Join Our World</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to receive updates on new collections, exclusive events, and special offers.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="Your email address" className="flex-1 border border-border bg-background px-4 py-3 outline-none focus:border-luxury" required />
              <Button className="bg-luxury hover:bg-luxury-dark text-white rounded-none">
                Subscribe
              </Button>
            </form>
            
            <p className="text-xs text-muted-foreground mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </>;
};

export default Index;

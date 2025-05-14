
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const shows = [
  {
    id: 'show-001',
    name: 'Spring/Summer 2025 Collection',
    date: 'May 28, 2025',
    location: 'Paris, France',
    description: 'Unveiling our new Spring/Summer collection that blends timeless elegance with contemporary design. Experience the artistry of luxury craftsmanship.',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1965&auto=format&fit=crop'
  },
  {
    id: 'show-002',
    name: 'Fall/Winter 2024 Collection',
    date: 'January 15, 2024',
    location: 'Milan, Italy',
    description: 'Our Fall/Winter showcase represents a bold step into a new era of luxury, where traditional techniques meet innovative design concepts.',
    image: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?q=80&w=2069&auto=format&fit=crop'
  },
  {
    id: 'show-003',
    name: 'Resort 2025 Collection',
    date: 'October 10, 2024',
    location: 'Portofino, Italy',
    description: 'An exclusive presentation set against the backdrop of the Italian riviera, showcasing our vision for resort wear that embodies relaxed sophistication.',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1901&auto=format&fit=crop'
  },
  {
    id: 'show-004',
    name: 'Anniversary Collection',
    date: 'September 3, 2024',
    location: 'New York, USA',
    description: 'A celebration of our heritage with a retrospective collection that honors our iconic designs while presenting new interpretations for the modern era.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1974&auto=format&fit=crop'
  }
];

const FashionShows = () => {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
            alt="Fashion Show" 
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium max-w-3xl leading-tight">
            Our Fashion Shows
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-xl">
            Experience the artistry and innovation of our collections through our exclusive runway presentations
          </p>
        </div>
      </section>
      
      {/* Shows List Section */}
      <section className="luxury-container py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif">Upcoming & Recent Shows</h2>
          <div className="w-20 h-0.5 bg-luxury mx-auto mt-4 mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our runway presentations represent the pinnacle of our creative vision, showcasing the craftsmanship and innovation that define our house.
          </p>
        </div>
        
        <div className="space-y-16 mt-12">
          {shows.map((show, index) => (
            <div key={show.id} className={`grid grid-cols-1 ${index % 2 === 0 ? 'md:grid-cols-[2fr_3fr]' : 'md:grid-cols-[3fr_2fr] md:[grid-template-areas:content_image]'} gap-8 items-center`}>
              <div className={`${index % 2 !== 0 ? 'md:[grid-area:content] md:order-2' : ''}`}>
                <div className="flex items-center text-luxury mb-4">
                  <Calendar size={18} className="mr-2" />
                  <span>{show.date} • {show.location}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif mb-4">{show.name}</h3>
                <p className="text-muted-foreground mb-6">{show.description}</p>
                <Button asChild className="bg-luxury hover:bg-luxury-dark text-white rounded-none">
                  <Link to={`/fashion-show/${show.id}`}>
                    View Collection <ChevronRight size={16} className="ml-1" />
                  </Link>
                </Button>
              </div>
              <div className={`${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={show.image} 
                    alt={show.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Heritage Section */}
      <section className="bg-luxury-bg py-20">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-6">Our Runway Heritage</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Since our first presentation in 1929, our fashion shows have served as a platform for artistic expression and innovation. Each show is a carefully choreographed statement of our creative vision and commitment to excellence.
            </p>
            <p className="text-lg text-muted-foreground mb-10">
              Our presentations take place in iconic locations around the world, from historic Parisian landmarks to cutting-edge architectural spaces, creating an immersive experience that complements the collection.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=988&auto=format&fit=crop" 
                alt="Fashion Show Archive" 
                className="aspect-[3/4] object-cover w-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1605289982774-9a6fef564df8?q=80&w=664&auto=format&fit=crop" 
                alt="Fashion Show Archive" 
                className="aspect-[3/4] object-cover w-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1622127922040-13cab637ee78?q=80&w=687&auto=format&fit=crop" 
                alt="Fashion Show Archive" 
                className="aspect-[3/4] object-cover w-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1596725780000-228186e675ef?q=80&w=1170&auto=format&fit=crop" 
                alt="Fashion Show Archive" 
                className="aspect-[3/4] object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="luxury-container py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-4">Join Our Front Row</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to receive exclusive invitations to our fashion shows, behind-the-scenes content, and early access to our collections.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 border border-border bg-background px-4 py-3 outline-none focus:border-luxury" 
              required 
            />
            <Button className="bg-luxury hover:bg-luxury-dark text-white rounded-none">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default FashionShows;

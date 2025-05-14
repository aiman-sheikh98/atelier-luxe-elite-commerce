
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', url: '/contact' },
        { name: 'FAQs', url: '/faqs' },
        { name: 'Shipping & Returns', url: '/shipping' },
        { name: 'Care Guide', url: '/care' },
      ],
    },
    {
      title: 'The Company',
      links: [
        { name: 'About Us', url: '/about' },
        { name: 'Careers', url: '/careers' },
        { name: 'Our Stores', url: '/stores' },
        { name: 'Sustainability', url: '/sustainability' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', url: '/terms' },
        { name: 'Privacy Policy', url: '/privacy' },
        { name: 'Cookie Policy', url: '/cookies' },
        { name: 'Accessibility', url: '/accessibility' },
      ],
    },
  ];

  return (
    <footer className="bg-muted pt-16 pb-8">
      <div className="luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <Link to="/" className="inline-block mb-5">
              <h1 className="text-2xl font-serif tracking-wider font-semibold">LUXE</h1>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Crafting luxury since 1897. Timeless elegance meets contemporary design.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-foreground hover:text-luxury transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-luxury transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-luxury transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Footer links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-serif text-base font-medium mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.url} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © {year} LUXE. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <img src="/placeholder.svg" alt="Visa" className="h-6 w-auto" />
              <img src="/placeholder.svg" alt="Mastercard" className="h-6 w-auto" />
              <img src="/placeholder.svg" alt="American Express" className="h-6 w-auto" />
              <img src="/placeholder.svg" alt="PayPal" className="h-6 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

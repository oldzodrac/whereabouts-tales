import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mic2, Coffee } from 'lucide-react';
import { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Listen', href: '/listen' },
  { name: 'Blog', href: '/blog' },
  { name: 'Store', href: '/store' },
  { name: 'Book a Session', href: '/book' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mic2 className="text-black w-6 h-6" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">Whereabouts Tales</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors hover:text-brand-gold",
                    location.pathname === link.href ? "text-brand-gold" : "text-white/70"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <a 
              href="https://www.paypal.me/PaulPuscas600" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-brand-gold text-black px-4 py-2 rounded-full text-xs font-bold hover:scale-105 transition-transform"
            >
              <Coffee className="w-4 h-4" />
              <span>Buy Me a Coffee</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/70 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div
          className="md:hidden overflow-hidden bg-brand-surface border-b border-white/5"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === link.href ? "text-brand-gold bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="https://www.paypal.me/PaulPuscas600" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-brand-gold text-black px-4 py-3 rounded-md text-base font-bold mt-4"
            >
              <Coffee className="w-5 h-5" />
              <span>Buy Me a Coffee</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

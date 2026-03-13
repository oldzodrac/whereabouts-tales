import { Instagram, Twitter, Youtube, Coffee } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-surface border-t border-white/5 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">Whereabouts Tales</h3>
            <p className="text-white/50 max-w-xs">
              Immersive storytelling for the curious wanderer. Join us as we explore the hidden narratives of our world.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/30">Support the Show</h4>
            <a 
              href="https://www.paypal.me/PaulPuscas600" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#FFDD00] text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            >
              <Coffee className="w-5 h-5" />
              <span>Buy Me a Coffee</span>
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/30">Connect</h4>
            <div className="flex space-x-6">
              <a href="#" className="text-white/50 hover:text-brand-gold transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/50 hover:text-brand-gold transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/50 hover:text-brand-gold transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-white/30 text-sm">
          <p>© {new Date().getFullYear()} Whereabouts Tales. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="/admin" className="hover:text-brand-gold transition-colors">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

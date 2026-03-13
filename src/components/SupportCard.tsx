import { Coffee, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel p-8 md:p-12 rounded-3xl max-w-2xl mx-auto text-center space-y-8 relative overflow-hidden group"
    >
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl group-hover:bg-brand-gold/20 transition-colors" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl group-hover:bg-brand-gold/20 transition-colors" />

      <div className="relative space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-gold/10 rounded-2xl mb-4">
          <Coffee className="text-brand-gold w-10 h-10" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Enjoying the tales?</h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Help keep the stories alive by buying me a coffee or supporting the production. Every contribution helps us explore more hidden narratives.
          </p>
        </div>

        <div className="pt-4">
          <a 
            href="https://www.paypal.me/PaulPuscas600" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-brand-gold to-[#F5D76E] text-black font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
          >
            <span>Support on PayPal</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
        
        <p className="text-xs text-white/30 uppercase tracking-widest">Secure payment via PayPal</p>
      </div>
    </motion.div>
  );
}

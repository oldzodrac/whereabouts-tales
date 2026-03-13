import { motion } from 'framer-motion';
import SupportCard from '../components/SupportCard';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function Store() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-widest mb-4"
        >
          <ShoppingBag className="w-3 h-3" />
          <span>The Marketplace</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-serif font-bold"
        >
          Support the Journey
        </motion.h1>
      </div>

      {/* Support Section */}
      <section>
        <SupportCard />
      </section>

      {/* Coming Soon Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-serif font-bold">Digital Products Coming Soon</h2>
          <p className="text-white/50">We're crafting exclusive digital assets, storytelling guides, and more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative group">
              <div className="glass-panel aspect-[4/5] rounded-3xl overflow-hidden flex flex-col items-center justify-center p-8 space-y-4 border-white/5">
                {/* Blurred Placeholder Content */}
                <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-white/5 to-transparent blur-xl opacity-50" />
                
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto">
                    <Sparkles className="text-white/20 w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-white/10 rounded-full mx-auto" />
                    <div className="h-3 w-24 bg-white/5 rounded-full mx-auto" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest">Coming Soon</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

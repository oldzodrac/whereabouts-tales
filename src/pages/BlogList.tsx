import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Search, Play, Loader2 } from 'lucide-react';

interface Episode {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  youtubeId?: string;
}

export default function BlogList() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const response = await fetch('/api/episodes');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setEpisodes(data);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEpisodes();
  }, []);

  const filteredEpisodes = episodes.filter(episode => 
    episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    episode.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
      {/* Header */}
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold tracking-tight"
          >
            The Chronicles
          </motion.h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-serif italic">
            Immersive stories from the edge of the world, documented for the curious wanderer.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-brand-gold transition-colors" />
          <input 
            type="text"
            placeholder="Search the chronicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="space-y-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
            <p className="text-white/30 font-serif italic">Unrolling the scrolls...</p>
          </div>
        ) : filteredEpisodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEpisodes.map((episode, index) => {
              const formattedDate = new Date(episode.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <motion.div
                  key={episode.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex flex-col h-full"
                >
                  <div className="glass-panel rounded-3xl p-8 flex flex-col h-full space-y-6 hover:bg-white/10 transition-all border-white/5 relative overflow-hidden">
                    {/* Video Badge */}
                    {episode.youtubeId && (
                      <div className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-1 bg-brand-gold/20 text-brand-gold rounded-full text-[10px] font-bold uppercase tracking-widest border border-brand-gold/30">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Watch Video</span>
                      </div>
                    )}

                    <div className="space-y-4 flex-grow">
                      <div className="flex items-center space-x-2 text-brand-gold/60 text-[10px] font-bold uppercase tracking-widest">
                        <Calendar className="w-3 h-3" />
                        <span>{formattedDate}</span>
                      </div>
                      
                      <h2 className="text-2xl font-serif font-bold leading-tight group-hover:text-brand-gold transition-colors line-clamp-2">
                        {episode.title}
                      </h2>
                      
                      <p className="text-white/40 text-sm leading-relaxed line-clamp-4 font-light">
                        {episode.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <Link 
                        to={`/blog/${episode.slug}`} 
                        className="inline-flex items-center space-x-2 text-sm font-bold text-white group/btn"
                      >
                        <span>Read Story</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 text-brand-gold" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="glass-panel p-24 rounded-3xl text-center space-y-4">
            <p className="text-white/50 font-serif text-xl italic">
              {searchQuery ? "No tales match your search." : "More stories coming soon!"}
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-brand-gold text-sm font-bold hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

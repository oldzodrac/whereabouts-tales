import { motion } from 'framer-motion';
import { Play, ArrowRight, Youtube, Music, Calendar, Loader2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SupportCard from '../components/SupportCard';

interface Episode {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  youtubeId?: string;
}

export default function Home() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/episodes');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setEpisodes(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching latest episodes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const latestEpisode = episodes[0];
  const youtubeId = latestEpisode?.youtubeId;

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-dark/80 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=2070" 
            alt="Cinematic background" 
            className="w-full h-full object-cover opacity-40 scale-110 animate-pulse-slow"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold">Immersive Storytelling</span>
              <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter leading-[0.9]">
                Stories from the <br /> 
                <span className="italic text-gradient">edge of the world.</span>
              </h1>
              <p className="text-white/60 text-xl max-w-lg font-serif italic leading-relaxed">
                A podcast exploring the hidden narratives, forgotten paths, and the deep magic of our shared human journey.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/listen" className="bg-brand-gold text-black px-8 py-4 rounded-full font-bold flex items-center space-x-2 hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
                <Play className="w-5 h-5 fill-current" />
                <span>Listen Now</span>
              </Link>
              <Link to="/blog" className="border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-colors">
                Explore The Chronicles
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="glass-panel rounded-[2.5rem] p-4 border-white/10 shadow-2xl overflow-hidden group">
              <div className="absolute top-8 left-8 z-10">
                <span className="bg-brand-gold text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Latest Episode</span>
              </div>
              <div className="aspect-video rounded-[1.5rem] overflow-hidden bg-brand-dark/50 relative">
                {youtubeId ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&mute=1`}
                    title="Latest Episode"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
                  </div>
                )}
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-12 -right-12 w-64 h-64 bg-brand-gold/10 rounded-full blur-[100px]" />
            <div className="absolute -z-10 -bottom-12 -left-12 w-64 h-64 bg-brand-gold/5 rounded-full blur-[100px]" />
          </motion.div>
        </div>
      </section>

      {/* Quick-Links Bar */}
      <section className="max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-6 md:p-8 flex flex-wrap justify-center gap-6 md:gap-12 border-white/5"
        >
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-white/60 hover:text-brand-gold transition-colors group">
            <Music className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-bold tracking-widest uppercase text-xs">Listen on Spotify</span>
          </a>
          <div className="w-px h-6 bg-white/10 hidden md:block" />
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-white/60 hover:text-brand-gold transition-colors group">
            <Youtube className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-bold tracking-widest uppercase text-xs">Watch on YouTube</span>
          </a>
          <div className="w-px h-6 bg-white/10 hidden md:block" />
          <Link to="/book" className="flex items-center space-x-3 text-white/60 hover:text-brand-gold transition-colors group">
            <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-bold tracking-widest uppercase text-xs">Book a Story Session</span>
          </Link>
        </motion.div>
      </section>

      {/* Featured Stories */}
      <section className="max-w-6xl mx-auto px-4 space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Featured Chronicles</h2>
            <p className="text-white/50 max-w-md">The most recent tales documented from our explorations.</p>
          </div>
          <Link to="/blog" className="group flex items-center space-x-2 text-brand-gold font-bold uppercase tracking-widest text-xs">
            <span>View All Stories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="glass-panel aspect-[4/5] rounded-3xl animate-pulse bg-white/5" />
            ))
          ) : (
            episodes.map((episode, index) => (
              <motion.div
                key={episode.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group h-full"
              >
                <Link to={`/blog/${episode.slug}`} className="glass-panel rounded-[2rem] p-8 flex flex-col h-full space-y-6 hover:bg-white/10 transition-all border-white/5 relative overflow-hidden">
                  <div className="space-y-4 flex-grow">
                    <div className="text-brand-gold/60 text-[10px] font-bold uppercase tracking-widest">
                      {new Date(episode.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="text-2xl font-serif font-bold leading-tight group-hover:text-brand-gold transition-colors line-clamp-2">
                      {episode.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed line-clamp-3">
                      {episode.excerpt}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest">Read Story</span>
                    <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SupportCard />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-center space-y-8 border-brand-gold/20 bg-gradient-to-br from-brand-gold/5 to-transparent"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Have a story to share?</h2>
              <p className="text-white/60 leading-relaxed">
                I'm always looking for new perspectives and hidden narratives. Book a free 15-minute session to discuss collaborations or just to share a spark of a tale.
              </p>
            </div>
            
            <div>
              <Link 
                to="/book" 
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full border border-brand-gold text-brand-gold font-bold hover:bg-brand-gold hover:text-black transition-all group"
              >
                <span>Book a Session</span>
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>

            <div className="pt-4 flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-dark bg-white/10" />
                ))}
              </div>
              <p className="text-xs text-white/40 uppercase tracking-widest">Join 50+ storytellers this month</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

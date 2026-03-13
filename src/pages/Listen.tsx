import { Headphones, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface PodcastEpisode {
  title: string;
  pubDate: string;
  contentSnippet: string;
  enclosure?: {
    url: string;
  };
  link?: string;
  content?: string;
}

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

function EpisodeRow({ episode }: { episode: PodcastEpisode }) {
  const formattedDate = new Date(episode.pubDate).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });

  const slug = episode.title ? slugify(episode.title) : '';
  const description = episode.contentSnippet || episode.content || '';
  const truncatedDescription = description.length > 200 
    ? description.substring(0, 200) + '...' 
    : description;

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col gap-6 hover:bg-white/10 transition-all border-white/5">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center space-x-2 text-brand-gold text-xs font-bold uppercase tracking-widest">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <h3 className="text-2xl font-serif font-bold leading-tight">{episode.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed max-w-3xl">{truncatedDescription}</p>
        </div>
        <div className="flex flex-col gap-3 shrink-0">
          <Link to={`/blog/${slug}`} className="inline-flex items-center justify-center space-x-2 px-6 py-2 rounded-full bg-white/5 text-sm font-bold text-white hover:bg-brand-gold hover:text-black transition-all group">
            <span>Read Full Story</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      {episode.enclosure?.url && (
        <div className="bg-black/20 rounded-2xl p-3 border border-white/5">
          <audio controls className="w-full h-10 custom-audio-player">
            <source src={episode.enclosure.url} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </div>
  );
}

export default function Listen() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchFeed = async () => {
      try {
        // Fetching from our own server-side API to bypass CORS/403
        const response = await fetch('/api/podcast');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const feed = await response.json();
        
        if (isMounted) {
          setEpisodes(feed.items as PodcastEpisode[]);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching podcast from API:', err);
        if (isMounted) {
          setError('Podcast feed temporarily unavailable. We are working to restore the connection.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchFeed();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-20">
      <div className="text-center space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold rounded-full mb-4 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <Headphones className="text-black w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">Listen to the Tales</h1>
        </div>
      </div>

      <div className="space-y-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
            <p className="text-white/30 font-serif italic">Tuning into the frequency...</p>
          </div>
        ) : error ? (
          <div className="glass-panel p-12 rounded-3xl text-center">
            <p className="text-red-400/80">{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {episodes.map((episode, i) => (
              <EpisodeRow key={i} episode={episode} />
            ))}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-audio-player::-webkit-media-controls-panel { background-color: transparent; }
        .custom-audio-player::-webkit-media-controls-current-time-display,
        .custom-audio-player::-webkit-media-controls-time-remaining-display { color: rgba(255, 255, 255, 0.7); }
        .custom-audio-player::-webkit-media-controls-play-button { background-color: #D4AF37; border-radius: 50%; }
      `}} />
    </div>
  );
}

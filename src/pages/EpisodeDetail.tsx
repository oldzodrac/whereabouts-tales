import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Play, Pause, Volume2, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';

interface Episode {
  title: string;
  date: string;
  content: string;
  youtubeId?: string;
}

export default function EpisodeDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchEpisode() {
      if (!slug) return;
      try {
        const response = await fetch(`/api/episodes/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setEpisode(data);
      } catch (error) {
        console.error('Error fetching episode:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEpisode();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
        <p className="text-white/30 font-serif italic">Retrieving the chronicle...</p>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-serif font-bold">Episode Not Found</h2>
          <Link to="/blog" className="text-brand-gold hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formattedDate = new Date(episode.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="relative pb-32">
      {/* Hero Header */}
      <div className="relative h-[50vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-dark/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full space-y-6">
          <Link to="/blog" className="inline-flex items-center text-white/50 hover:text-brand-gold transition-colors mb-4 group">
            <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Episodes
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 text-brand-gold font-bold uppercase tracking-[0.2em] text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              {episode.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="markdown-body prose prose-invert prose-gold max-w-none">
          <Markdown>{episode.content}</Markdown>
        </div>

        {/* Video Section */}
        {episode.youtubeId && (
          <div className="mt-24 pt-16 border-t border-brand-gold/20 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold">Watch the Episode</h2>
              <p className="text-white/50">Experience the visual journey behind this story.</p>
            </div>
            
            <div className="relative aspect-video rounded-3xl overflow-hidden glass-panel">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${episode.youtubeId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

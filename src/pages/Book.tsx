import { Calendar, ArrowLeft, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Book() {
  const faqs = [
    {
      question: "Is this session free?",
      answer: "Yes, the initial 15-minute storytelling discovery session is completely free of charge. It's a chance for us to see if our creative vibes align."
    },
    {
      question: "How do we connect?",
      answer: "Once you book, you'll receive a Google Meet link automatically in your calendar invitation. We'll meet virtually there."
    },
    {
      question: "What should I prepare?",
      answer: "Just bring your curiosity and any rough ideas or stories you're currently working on. No formal preparation is needed."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 space-y-12">
      {/* Navigation */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link 
          to="/" 
          className="inline-flex items-center text-white/50 hover:text-brand-gold transition-colors group mb-8"
        >
          <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </motion.div>

      {/* Header */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
            Book a Storytelling Session
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Welcome! This 15-minute slot is a dedicated space for us to connect, share a spark of a story, or discuss potential collaborations. Whether you have a fully formed idea or just a whisper of a tale, I'd love to hear it.
          </p>
        </motion.div>
      </div>

      {/* Calendar Embed */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/10"
      >
        <div className="bg-white/5 p-1 border-b border-white/5 flex items-center px-4 py-2 space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <span className="text-[10px] text-white/20 uppercase tracking-widest ml-2">Scheduler</span>
        </div>
        <iframe 
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssM2l_placeholder_url?gv=true" 
          style={{ border: 0 }} 
          width="100%" 
          height="700" 
          frameBorder="0"
          className="bg-white"
          title="Google Calendar Appointment Scheduling"
        ></iframe>
        <div className="p-4 bg-brand-dark/80 backdrop-blur-sm text-center border-t border-white/5">
          <p className="text-xs text-white/40 italic">
            Note: If the calendar doesn't load, please ensure you are logged into a Google account or check your browser's privacy settings.
          </p>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-8 pt-12"
      >
        <div className="flex items-center space-x-3">
          <HelpCircle className="text-brand-gold w-6 h-6" />
          <h2 className="text-2xl font-serif font-bold">Frequently Asked Questions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
                <div className="space-y-2">
                  <h4 className="font-bold text-white/90">{faq.question}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

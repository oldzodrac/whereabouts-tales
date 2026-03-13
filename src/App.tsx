import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Book from './pages/Book';
import BlogList from './pages/BlogList';
import EpisodeDetail from './pages/EpisodeDetail';
import Listen from './pages/Listen';
import Store from './pages/Store';
import AdminCMS from './pages/AdminCMS';

function AppContent() {
  const location = useLocation();
  const isCMS = location.pathname.startsWith('/admin') || location.pathname.startsWith('/studio');

  return (
    <div className="flex flex-col min-h-screen">
      {!isCMS && <Navbar />}
      <main className={isCMS ? "" : "flex-grow pt-20"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listen" element={<Listen />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<EpisodeDetail />} />
          <Route path="/book" element={<Book />} />
          <Route path="/store" element={<Store />} />
          <Route path="/admin" element={<AdminCMS />} />
          <Route path="/studio/*" element={<div className="p-20 text-center bg-white text-black min-h-screen">Studio Placeholder</div>} />
          <Route path="*" element={<div className="p-20 text-center">Page Not Found</div>} />
        </Routes>
      </main>
      {!isCMS && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

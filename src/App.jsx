
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Preloader from "./components/Preloader"; // ✅ Import
import AllTools from "./pages/AllTools";
import ToolPage from "./pages/ToolPage";
import { AboutPage, PrivacyPage } from "./pages/StaticPages";


import { useState, useEffect } from "react"; // ← Add பண்ணு
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [loading, setLoading] = useState(true); // ✅ Add

  useEffect(() => {
    // 2 seconds preloader show ஆகும்
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Preloader show
  if (loading) return <Preloader />;

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<AllTools />} />
            <Route path="/tools/:slug" element={<ToolPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="text-6xl mb-4">404</div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Page Not Found</h2>
                  <a href="/" className="text-[#0d6e8c] underline text-sm">← Back to Home</a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // ✅ Import

export default function Footer() {
  return (
    <footer className="bg-[#0a3d55] py-8 px-4 text-center mt-auto">

      {/* ✅ Logo Added */}
      <div className="flex justify-center mb-3">
        <Link to="/">
          <img
            src={logo}
            alt="Free Tools Logo"
            className="h-20 w-auto object-contain border-2 border-white rounded-md"
          />
        </Link>
      </div>
      <p className="text-white/50 text-xs mb-4">
        Free Online Tools — No signup, No cost, Forever free!
      </p>
      <div className="flex justify-center gap-6 text-white/60 text-xs">
        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
      </div>
      <p className="text-white/30 text-xs mt-4">
        © 2026 FreeTools.com
      </p>
    </footer>
  );
}
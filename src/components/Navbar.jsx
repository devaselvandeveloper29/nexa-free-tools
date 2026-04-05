import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; // ✅ Import பண்ணு

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: "Home", path: "/" },
    { label: "All Tools", path: "/tools" },
    { label: "Blog", path: "/blog" },
    { label: "About", path: "/about" },
  ];

  return (
    <nav className="bg-[#0a3d55] sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Free Tool Logo"
            className="h-20 w-auto object-contain border-2 border-white rounded-md"
          />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm transition-colors ${
                location.pathname === l.path
                  ? "text-white font-semibold"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#083348] px-4 py-3 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-white text-sm"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

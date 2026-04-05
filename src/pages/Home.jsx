import { useState } from "react";
import { tools, categories, tagColors } from "../data/tools";
import ToolCard from "../components/ToolCard";
import AdBanner from "../components/AdBanner";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = tools.filter((t) => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-[#0d6e8c] py-14 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Free Online Tools for Everyone
        </h1>
        <p className="text-white/70 text-sm md:text-base mb-8">
          100+ free tools — Image, PDF, CSS, Text, Calculators & more!
        </p>
        <div className="flex max-w-lg mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
          <span className="pl-4 flex items-center text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search tools..."
            className="flex-1 px-3 py-3 text-sm outline-none text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-[#0a3d55] hover:bg-[#083348] text-white px-5 py-3 text-sm font-medium transition-colors">
            Search
          </button>
        </div>
        <div className="flex justify-center gap-8 mt-8">
          {[{ num: "100+", label: "Free Tools" }, { num: "50K+", label: "Users/Month" }, { num: "100%", label: "Free Forever" }].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-white text-2xl font-bold">{s.num}</div>
              <div className="text-white/60 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* AdSense Top */}
        <div className="mb-8"><AdBanner slot="horizontal" /></div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                activeCategory === cat
                  ? "bg-[#0d6e8c] text-white border-[#0d6e8c]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#0d6e8c] hover:text-[#0d6e8c]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {activeCategory === "All" ? "All Tools" : activeCategory + " Tools"}
          </h2>
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
            {filtered.length} Tools
          </span>
        </div>

        {/* Tools Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 text-sm">No tools found for "{search}"</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-4 text-[#0d6e8c] text-sm underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* AdSense Bottom */}
        <div className="mt-10"><AdBanner slot="horizontal" /></div>
      </div>
    </div>
  );
}

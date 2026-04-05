import { useState } from "react";
import { tools, categories } from "../data/tools";
import ToolCard from "../components/ToolCard";
import AdBanner from "../components/AdBanner";

export default function AllTools() {
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
      <div className="bg-[#0a3d55] py-10 px-4 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">All Free Tools</h1>
        <p className="text-white/60 text-sm">Browse all {tools.length}+ free online tools</p>
        <div className="flex max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow mt-5">
          <span className="pl-4 flex items-center text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search tools..."
            className="flex-1 px-3 py-3 text-sm outline-none text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <AdBanner slot="horizontal" />

        <div className="flex flex-wrap gap-2 my-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                activeCategory === cat
                  ? "bg-[#0d6e8c] text-white border-[#0d6e8c]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#0d6e8c]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-lg font-bold text-gray-800">
            {activeCategory === "All" ? "All Tools" : activeCategory + " Tools"}
          </h2>
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
            {filtered.length} Tools
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p>No tools found for "{search}"</p>
          </div>
        )}

        <div className="mt-8"><AdBanner slot="horizontal" /></div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { tagColors } from "../data/tools";

export default function ToolCard({ tool }) {
  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#0d6e8c] hover:shadow-md transition-all cursor-pointer group block"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${tool.color.split(" ")[0]}`}>
        {tool.icon}
      </div>
      <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-[#0d6e8c] transition-colors">
        {tool.name}
      </h3>
      <p className="text-gray-500 text-xs leading-relaxed mb-3">
        {tool.desc}
      </p>
      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${tagColors[tool.tag]}`}>
          {tool.tag}
        </span>
        <span className="text-[#0d6e8c] text-xs font-medium group-hover:underline">
          Use Tool →
        </span>
      </div>
    </Link>
  );
}

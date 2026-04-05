import { useParams, Link } from "react-router-dom";
import { tools } from "../data/tools";
import AdBanner from "../components/AdBanner";
import ToolCard from "../components/ToolCard";

// Tool Components (add more as you build them)
import ComingSoon from "./tools/ComingSoon";
import ImageCompressor from "./tools/ImageCompressor";
import PasswordGenerator from "./tools/PasswordGenerator";
import QRCodeGenerator from "./tools/QRCodeGenerator";
import AgeCalculator from "./tools/AgeCalculator";

const toolComponents = {
  "image-compressor": ImageCompressor,
  "password-generator": PasswordGenerator,
  "qr-code-generator": QRCodeGenerator,
  "age-calculator": AgeCalculator,
  // Add more tools here as you build them:
  // "qr-code-generator": QRCodeGenerator,
  // "css-gradient-generator": CSSGradientGenerator,
};

export default function ToolPage() {
  const { slug } = useParams();
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Tool Not Found</h2>
          <Link to="/" className="text-[#0d6e8c] underline text-sm">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const ToolComponent = toolComponents[slug] || ComingSoon;
  const relatedTools = tools.filter((t) => t.category === tool.category && t.slug !== slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Tool Header */}
      <div className="bg-[#0a3d55] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-white/60 text-sm hover:text-white mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${tool.color.split(" ")[0]}`}>
              {tool.icon}
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">{tool.name}</h1>
              <p className="text-white/60 text-sm mt-1">{tool.desc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Top Ad */}
        <div className="mb-6"><AdBanner slot="horizontal" /></div>

        {/* Tool Component */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <ToolComponent />
        </div>

        {/* Side Ad */}
        <div className="mb-8"><AdBanner slot="box" /></div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Related {tool.category} Tools
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTools.map((t) => <ToolCard key={t.id} tool={t} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

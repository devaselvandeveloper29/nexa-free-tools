import { useState, useRef } from "react";

export default function ImageCompressor() {
  const [original, setOriginal] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [quality, setQuality] = useState(70);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setOriginal({ url, size: file.size, name: file.name });
    setCompressed(null);
  };

  const compress = () => {
    if (!original) return;
    setLoading(true);
    const img = new Image();
    img.src = original.url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);
          setCompressed({ url, size: blob.size });
          setLoading(false);
        },
        "image/jpeg",
        quality / 100
      );
    };
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const saved = original && compressed
    ? Math.round(((original.size - compressed.size) / original.size) * 100)
    : 0;

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Image Compressor</h2>

      {/* Upload Area */}
      <div
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center cursor-pointer hover:border-[#0d6e8c] transition-colors mb-5"
      >
        <div className="text-4xl mb-3">🖼️</div>
        <p className="text-gray-600 text-sm font-medium">Click to upload image</p>
        <p className="text-gray-400 text-xs mt-1">JPG, PNG, WEBP supported</p>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      {/* Quality Slider */}
      <div className="mb-5">
        <div className="flex justify-between text-sm text-gray-700 mb-2">
          <span className="font-medium">Quality</span>
          <span className="text-[#0d6e8c] font-bold">{quality}%</span>
        </div>
        <input
          type="range" min="10" max="100" step="1"
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full accent-[#0d6e8c]"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Low Quality</span><span>High Quality</span>
        </div>
      </div>

      {/* Preview */}
      {original && (
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-200">
            <img src={original.url} alt="original" className="w-full h-28 object-contain mb-2" />
            <p className="text-xs text-gray-500">Original</p>
            <p className="text-sm font-bold text-gray-800">{formatSize(original.size)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-200">
            {compressed ? (
              <>
                <img src={compressed.url} alt="compressed" className="w-full h-28 object-contain mb-2" />
                <p className="text-xs text-gray-500">Compressed</p>
                <p className="text-sm font-bold text-green-600">{formatSize(compressed.size)}</p>
              </>
            ) : (
              <div className="h-28 flex items-center justify-center text-gray-300 text-3xl">📷</div>
            )}
          </div>
        </div>
      )}

      {/* Saved badge */}
      {compressed && saved > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-center mb-5">
          <span className="text-green-700 font-bold text-sm">
            ✅ {saved}% reduced — {formatSize(original.size - compressed.size)} saved!
          </span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={compress}
          disabled={!original || loading}
          className="flex-1 bg-[#0d6e8c] hover:bg-[#0a3d55] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
        >
          {loading ? "Compressing..." : "🗜️ Compress Image"}
        </button>
        {compressed && (
          <a
            href={compressed.url}
            download={`compressed_${original.name}`}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm text-center"
          >
            ⬇️ Download
          </a>
        )}
      </div>
    </div>
  );
}

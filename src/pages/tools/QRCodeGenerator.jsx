import { useState } from "react";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrUrl, setQrUrl] = useState("");
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    if (!text.trim()) return;
    const encoded = encodeURIComponent(text.trim());
    const fg = fgColor.replace("#", "");
    const bg = bgColor.replace("#", "");
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&color=${fg}&bgcolor=${bg}&margin=10`;
    setQrUrl(url);
    setGenerated(true);
  };

  const download = async () => {
    if (!qrUrl) return;
    const res = await fetch(qrUrl);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "qrcode.png";
    a.click();
  };

  const presets = [
    { label: "URL", value: "https://yourwebsite.com" },
    { label: "Email", value: "mailto:you@email.com" },
    { label: "Phone", value: "tel:+919876543210" },
    { label: "WhatsApp", value: "https://wa.me/919876543210" },
    { label: "Text", value: "Hello! Scan this QR code." },
    { label: "WiFi", value: "WIFI:S:MyNetwork;T:WPA;P:mypassword;;" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-6">QR Code Generator</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2 font-medium">Quick Presets</p>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button key={p.label} onClick={() => setText(p.value)}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-[#0d6e8c] hover:text-[#0d6e8c] transition-colors bg-white">
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Enter URL or Text</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)}
              placeholder="https://yourwebsite.com" rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#0d6e8c] resize-none"/>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-700 mb-2">
              <span className="font-medium">QR Size</span>
              <span className="text-[#0d6e8c] font-bold">{size}x{size}px</span>
            </div>
            <input type="range" min="128" max="512" step="32" value={size}
              onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-[#0d6e8c]"/>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">QR Color</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"/>
                <span className="text-sm text-gray-600 font-mono">{fgColor}</span>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">Background</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"/>
                <span className="text-sm text-gray-600 font-mono">{bgColor}</span>
              </div>
            </div>
          </div>
          <button onClick={generate} disabled={!text.trim()}
            className="w-full bg-[#0d6e8c] hover:bg-[#0a3d55] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
            📱 Generate QR Code
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[280px]">
            {generated && qrUrl ? (
              <>
                <img src={qrUrl} alt="QR Code" className="rounded-xl shadow-sm mb-4"
                  style={{ width: Math.min(size, 220), height: Math.min(size, 220) }}/>
                <p className="text-xs text-gray-400 mb-4 text-center break-all px-2">
                  {text.length > 40 ? text.slice(0, 40) + "..." : text}
                </p>
                <div className="flex gap-3 w-full">
                  <button onClick={download}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                    ⬇️ Download PNG
                  </button>
                  <button onClick={() => navigator.clipboard.writeText(text)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl transition-colors">
                    📋 Copy Text
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="text-5xl mb-3 opacity-30">📱</div>
                <p className="text-gray-400 text-sm">Your QR code will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
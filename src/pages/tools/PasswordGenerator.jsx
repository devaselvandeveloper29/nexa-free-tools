import { useState } from "react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true, lowercase: true, numbers: true, symbols: true,
  });
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let chars = "";
    if (options.uppercase) chars += upper;
    if (options.lowercase) chars += lower;
    if (options.numbers) chars += nums;
    if (options.symbols) chars += syms;
    if (!chars) return;
    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pwd);
    setCopied(false);
  };

  const copy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = () => {
    const active = Object.values(options).filter(Boolean).length;
    if (length < 8 || active < 2) return { label: "Weak", color: "bg-red-500", w: "25%" };
    if (length < 12 || active < 3) return { label: "Medium", color: "bg-yellow-500", w: "55%" };
    if (length < 16) return { label: "Strong", color: "bg-blue-500", w: "75%" };
    return { label: "Very Strong", color: "bg-green-500", w: "100%" };
  };

  const s = strength();

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Password Generator</h2>

      {/* Password Output */}
      <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-6">
        <span className="flex-1 font-mono text-gray-800 text-sm tracking-widest break-all">
          {password || "Click Generate to create password"}
        </span>
        <button
          onClick={copy}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            copied ? "bg-green-500 text-white" : "bg-[#0d6e8c] text-white hover:bg-[#0a3d55]"
          }`}
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>

      {/* Strength Bar */}
      {password && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Password Strength</span>
            <span className="font-medium">{s.label}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${s.color}`} style={{ width: s.w }} />
          </div>
        </div>
      )}

      {/* Length */}
      <div className="mb-5">
        <div className="flex justify-between text-sm text-gray-700 mb-2">
          <span className="font-medium">Password Length</span>
          <span className="text-[#0d6e8c] font-bold">{length}</span>
        </div>
        <input
          type="range" min="6" max="32" step="1"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-[#0d6e8c]"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>6</span><span>32</span>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { key: "uppercase", label: "Uppercase (A-Z)" },
          { key: "lowercase", label: "Lowercase (a-z)" },
          { key: "numbers", label: "Numbers (0-9)" },
          { key: "symbols", label: "Symbols (!@#$)" },
        ].map((opt) => (
          <label key={opt.key} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-[#0d6e8c] transition-colors">
            <input
              type="checkbox"
              checked={options[opt.key]}
              onChange={(e) => setOptions({ ...options, [opt.key]: e.target.checked })}
              className="accent-[#0d6e8c] w-4 h-4"
            />
            <span className="text-sm text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>

      {/* Generate Button */}
      <button
        onClick={generate}
        className="w-full bg-[#0d6e8c] hover:bg-[#0a3d55] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        🔑 Generate Password
      </button>
    </div>
  );
}

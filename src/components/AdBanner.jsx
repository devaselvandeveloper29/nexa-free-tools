export default function AdBanner({ slot = "horizontal" }) {
  return (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-400 text-sm ${
      slot === "horizontal" ? "p-6 w-full" : "p-4 w-full min-h-[250px] flex items-center justify-center"
    }`}>
      {/* Replace this div with your Google AdSense code */}
      {/* 
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <ins className="adsbygoogle" ...></ins>
      */}
      📢 Google AdSense — {slot === "horizontal" ? "728×90 Banner" : "300×250 Box"} Ad
    </div>
  );
}

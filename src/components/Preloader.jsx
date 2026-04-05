import logo from "../assets/logo.png";

export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-[#0a3d55] flex flex-col items-center justify-center z-50">

      {/* Logo */}
      <div className="animate-pulse mb-4">
        <img
          src={logo}
          alt="Free Tools"
          className="h-24 w-auto object-contain"
        />
      </div>


      {/* Bouncing Dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 bg-[#00e5ff] rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

    </div>
  );
}
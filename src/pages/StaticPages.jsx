export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 p-8">
       {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          {/* <img src={logo} alt="logo" className="h-14 w-auto" /> */}
          <h1 className="text-2xl font-bold text-gray-800">About Free Tools</h1>
        </div>

        {/* Change these paragraphs */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          👋 Welcome to Free Tools — உங்களுக்கு தேவையான எல்லா online tools-உம் 
          ஒரே இடத்துல, முற்றிலும் இலவசமாக!
        </p>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          🛠️ Image Compressor, Password Generator, QR Code Generator, 
          CSS Tools, Calculators — 100+ tools available!
        </p>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          🔒 உங்கள் data எங்கள் server-க்கு போவதில்லை — 
          எல்லாம் உங்கள் browser-லேயே run ஆகும். 100% Safe & Free!
        </p>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="bg-[#0a3d55] rounded-2xl p-8 text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/60 text-sm">Last updated: April 2026</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6">

          {/* Intro */}
          <p className="text-gray-600 text-sm leading-relaxed">
            Welcome to <strong>Free Tools</strong>. We are committed to protecting
            your privacy. This Privacy Policy explains how we handle information
            when you use our website.
          </p>

          {[
            {
              icon: "📋",
              title: "Information We Collect",
              content: `We do not collect any personal information from our users. 
              All tools on Free Tools run entirely in your browser. No data is 
              sent to our servers. We do not require account registration or login.`,
            },
            {
              icon: "🍪",
              title: "Cookies",
              content: `We use cookies only for Google AdSense advertising purposes. 
              These cookies help Google display relevant ads to you. You can disable 
              cookies at any time through your browser settings. Disabling cookies 
              will not affect the functionality of our tools.`,
            },
            {
              icon: "💰",
              title: "Google AdSense",
              content: `We use Google AdSense to display advertisements on our website. 
              Google may use cookies and web beacons to serve ads based on your 
              previous visits to our site or other sites on the Internet. You may 
              opt out of personalized advertising by visiting Google's Ads Settings.`,
            },
            {
              icon: "📊",
              title: "Google Analytics",
              content: `We use Google Analytics to understand how visitors interact 
              with our website. This data is completely anonymous and aggregated. 
              We use this information to improve our tools and user experience. 
              No personally identifiable information is collected.`,
            },
            {
              icon: "🔒",
              title: "Data Security",
              content: `All tools on Free Tools process data locally in your browser. 
              Your files, text, and other inputs never leave your device. We take 
              your privacy seriously and have designed our tools with privacy in mind.`,
            },
            {
              icon: "🔗",
              title: "Third-Party Links",
              content: `Our website may contain links to third-party websites. 
              We are not responsible for the privacy practices of these sites. 
              We encourage you to read the privacy policy of any website you visit.`,
            },
            {
              icon: "👶",
              title: "Children's Privacy",
              content: `Free Tools does not knowingly collect information from 
              children under 13 years of age. Our tools are designed for general 
              use and are safe for all ages.`,
            },
            {
              icon: "🔄",
              title: "Changes to This Policy",
              content: `We may update this Privacy Policy from time to time. 
              We will notify users of any significant changes by updating the 
              date at the top of this page. Continued use of our website after 
              changes constitutes acceptance of the new policy.`,
            },
            {
              icon: "📧",
              title: "Contact Us",
              content: `If you have any questions about this Privacy Policy, 
              please contact us at: privacy@freetools.com`,
            },
          ].map((item) => (
            <div key={item.title} className="border-b border-gray-100 pb-5 last:border-0">
              <h2 className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span>{item.icon}</span>
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
            </div>
          ))}

          {/* AdSense Compliance Note */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-blue-700 text-xs leading-relaxed">
              <strong>AdSense Compliance:</strong> 
              This site uses Google AdSense. 
              By using this site, you consent to the use of cookies by Google 
              for advertising purposes. For more information, visit{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google Privacy Policy
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!dob) return;

    const birth = new Date(dob);
    const today = new Date();

    if (birth > today) {
      setResult({ error: "Future date enter பண்ணீங்க! Correct date போடுங்க." });
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total calculations
    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= today) nextBirthday.setFullYear(today.getFullYear() + 1);
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    // Day of birth
    const days_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const birthDay = days_of_week[birth.getDay()];

    // Zodiac sign
    const zodiac = getZodiac(birth.getMonth() + 1, birth.getDate());

    setResult({
      years, months, days,
      totalDays, totalWeeks, totalMonths,
      totalHours, totalMinutes,
      daysUntilBirthday,
      birthDay, zodiac,
      nextBirthday: nextBirthday.toDateString(),
    });
  };

  const getZodiac = (month, day) => {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "♈ Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "♉ Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "♊ Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "♋ Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "♌ Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "♍ Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "♎ Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "♏ Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "♐ Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "♑ Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "♒ Aquarius";
    return "♓ Pisces";
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Age Calculator</h2>

      {/* Input */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Date of Birth
        </label>
        <input
          type="date"
          value={dob}
          max={today}
          onChange={(e) => { setDob(e.target.value); setResult(null); }}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#0d6e8c] bg-white mb-4"
        />
        <button
          onClick={calculate}
          disabled={!dob}
          className="w-full bg-[#0d6e8c] hover:bg-[#0a3d55] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
        >
          🎂 Calculate Age
        </button>
      </div>

      {/* Error */}
      {result?.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm mb-4">
          ⚠️ {result.error}
        </div>
      )}

      {/* Results */}
      {result && !result.error && (
        <>
          {/* Main Age */}
          <div className="bg-[#0a3d55] rounded-2xl p-6 text-center mb-5">
            <p className="text-white/60 text-sm mb-2">Your Exact Age</p>
            <div className="flex justify-center gap-4">
              {[
                { val: result.years, label: "Years" },
                { val: result.months, label: "Months" },
                { val: result.days, label: "Days" },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 rounded-xl px-5 py-3 text-center">
                  <div className="text-3xl font-bold text-white">{item.val}</div>
                  <div className="text-white/60 text-xs mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { icon: "📅", label: "Total Days", val: result.totalDays.toLocaleString() },
              { icon: "📆", label: "Total Weeks", val: result.totalWeeks.toLocaleString() },
              { icon: "🗓️", label: "Total Months", val: result.totalMonths.toLocaleString() },
              { icon: "⏰", label: "Total Hours", val: result.totalHours.toLocaleString() },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                  <div className="text-sm font-bold text-gray-800">{s.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Fun Facts */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-5">
            <p className="text-sm font-semibold text-blue-700 mb-3">🎉 Fun Facts</p>
            <div className="space-y-2">
              {[
                { label: "Born on", val: result.birthDay },
                { label: "Zodiac Sign", val: result.zodiac },
                { label: "Next Birthday", val: result.nextBirthday },
                { label: "Days Until Birthday", val: `${result.daysUntilBirthday} days 🎂` },
              ].map((f) => (
                <div key={f.label} className="flex justify-between items-center text-sm">
                  <span className="text-blue-600">{f.label}</span>
                  <span className="font-semibold text-blue-800">{f.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Birthday Message */}
          {result.daysUntilBirthday <= 7 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-center text-sm font-medium text-yellow-700">
              🎊 உன் Birthday வர {result.daysUntilBirthday} days மட்டுமே இருக்கு!
            </div>
          )}
        </>
      )}
    </div>
  );
}

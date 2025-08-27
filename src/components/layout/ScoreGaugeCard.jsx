import React from "react";
import ScoreGauge from "../ui/ScoreGauge";

const ScoreGaugeCard = ({ name, score, dateText }) => {
  return (
    <div className="w-full max-w-[640px] mx-auto rounded-2xl border border-[#D7E4F2] bg-white shadow-[0_1px_0_#E6EDF5] overflow-hidden">
      {/* header */}
      <div className="px-5 sm:px-8 pt-6">
        <h2 className="text-center text-[22px] sm:text-2xl font-semibold text-gray-900">
          Hello, {name}
        </h2>
      </div>

      {/* gauge */}
      <div className="px-3 sm:px-8">
        <ScoreGauge score={mockData.user.score} />
      </div>

      {/* big score & caption */}
      <div className="px-4 sm:px-8 -mt-1 pb-5 text-center">
        {/* <div className="text-5xl sm:text-6xl font-extrabold leading-none text-[#0F172A]">
          {score}
        </div> */}
        <div className="mt-2 text-sm sm:text-[15px] text-gray-600">
          is your{" "}
          <span className="text-sky-600 font-medium underline underline-offset-2">
            NB
          </span>{" "}
          Score as of {dateText}
        </div>
      </div>

      {/* footer gradient strip */}
      <div className="bg-white border-t border-[#E6EDF5]">
        <div className="px-4 sm:px-8 py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            className="text-sky-700 font-medium hover:underline"
          >
            Score Analysis
          </button>

          <button
            type="button"
            className="rounded-full bg-[#FFDD00] hover:bg-[#f2ce00] text-black px-6 sm:px-8 py-2 font-semibold shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)]"
          >
            Refresh Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreGaugeCard;

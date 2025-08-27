import React, { useEffect, useRef, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Customized } from "recharts";

/* ---------- Bands ---------- */
const BANDS = (maxScore) => [
  { to: 600, color: "#E15825" },
  { to: 680, color: "#F18200" },
  { to: 740, color: "#FCD800" },
  { to: 820, color: "#A9D161" },
  { to: maxScore, color: "#009900" },
];

/* ---------- Easing + tween ---------- */
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
function useTween(to, { duration = 1200 } = {}) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setVal(to * easeOutCubic(t));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [to, duration]);
  return val;
}

/* ---------- Needle ---------- */
const RAD = Math.PI / 180;
function renderNeedle({ value, total, cx, cy, iR, oR, color = "#1F2937" }) {
  const ang = 180 * (1 - value / total); // 300 -> 180°, 900 -> 0°
  const len = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RAD * ang);
  const cos = Math.cos(-RAD * ang);

  const r = 6;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + len * cos;
  const yp = y0 + len * sin;
  const dy = 12;

  return (
    <g>
      {/* pivot base */}
      <path
        d={`M ${x0 - (r + 16)} ${y0 + dy}
      A ${r + 16} ${r + 16} 0 0 1 ${x0 + (r + 16)} ${y0 + dy}
      L ${x0} ${y0 + dy}
      Z`}
        fill="#E6E6E6"
      />
      {/* needle */}
      <path d={`M${xba} ${yba} L${xbb} ${ybb} L${xp} ${yp} Z`} fill={color} />
      <circle cx={x0} cy={y0} r={r} fill={color} />
    </g>
  );
}

/* ---------- Component ---------- */
const ScoreGauge = ({
  score = 767,
  minScore = 300,
  maxScore = 900,
  name = "Rahul L.",
}) => {
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const safeScore = clamp(score, minScore, maxScore);

  const bands = BANDS(maxScore);
  const segments = bands.map((b, i) => ({
    value: b.to - (i === 0 ? minScore : bands[i - 1].to),
    color: b.color,
  }));
  const total = segments.reduce((s, v) => s + v.value, 0);

  // animated values (start from 0)
  const animatedNeedle = useTween(safeScore - minScore, { duration: 1200 });
  const animatedNumber = useTween(safeScore - minScore, { duration: 1200 }); // same timeline

  const INNER = 98; // slightly tighter to reduce whitespace
  const OUTER = 110;

  return (
    <div
      className="
        bg-white rounded-[8px] border border-gray-100
        shadow-[0_18px_38px_rgba(31,90,133,0.20)]
        p-4 sm:p-5 w-full max-w-[660px] mx-auto
      "
    >
      <div className="text-center">
        <h2 className="text-[22px] sm:text-[24px] font-bold text-gray-800 leading-tight pt-[18px]">
          Hello, {name}
        </h2>
      </div>

      {/* Gauge */}
      <div
        className="w-full mt-1"
        style={{ aspectRatio: "1.2/1", minHeight: 200, maxHeight: 248 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* defs for soft blur */}
            <defs>
              <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </defs>

            {/* background arc */}
            <Pie
              data={[{ value: total }]}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius={INNER}
              outerRadius={OUTER}
              fill="#E5E7EB"
              opacity={0.35}
              stroke="none"
              isAnimationActive={false}
            />
            {/* colored bands */}
            <Pie
              data={segments}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius={INNER}
              outerRadius={OUTER}
              paddingAngle={0.6}
              stroke="none"
              isAnimationActive={false}
            >
              {segments.map((s, i) => (
                <Cell key={i} fill={s.color} />
              ))}
            </Pie>

            {/* needle + labels */}
            <Customized
              component={({ width, height }) => {
                const cx = width / 2;
                const cy = height / 2;
                return (
                  <g>
                    {renderNeedle({
                      value: animatedNeedle,
                      total,
                      cx,
                      cy,
                      iR: INNER,
                      oR: OUTER,
                      color: "#1F2937",
                    })}
                    <text
                      x={cx - OUTER - 8}
                      y={cy + 14}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="600"
                      fill="#9CA3AF"
                    >
                      {minScore}
                    </text>
                    <text
                      x={cx + OUTER + 8}
                      y={cy + 14}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="600"
                      fill="#9CA3AF"
                    >
                      {maxScore}
                    </text>
                  </g>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Score - tightened spacing */}
      <div className="text-center mt-[-60px] mb-2">
        <div className="text-[42px] sm:text-[46px] font-extrabold text-gray-900 leading-none">
          {Math.round(minScore + animatedNumber)}
        </div>
        <div className="text-[13px] sm:text-[18px] text-[#262626] mt-1">
          is your <span className="text-[#1677FF] font-semibold">NB</span> Score
          as of 19th Apr &#x2019;22
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 pt-3 border-t-2 border-gray-100">
        <button className="text-[#066A9B] text-[16px] font-medium underline w-full sm:w-auto">
          Score Analysis
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#F7D20A] hover:brightness-95 text-black text-[16px] font-[500] px-4 py-3 rounded-full shadow-lg w-full sm:w-60"
        >
          Refresh Now
        </button>
      </div>
    </div>
  );
};

export default ScoreGauge;

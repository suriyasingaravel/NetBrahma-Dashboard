// Overview.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  HiTrendingUp,
  HiTrendingDown,
  HiArrowRight,
  HiChevronRight,
} from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { LiaFileDownloadSolid } from "react-icons/lia";
import introImg from "../assets/introImg.png";
import { LuTriangleAlert } from "react-icons/lu";
import { AiOutlineFileSearch, AiOutlineInfoCircle } from "react-icons/ai";
import Card from "../components/ui/Card";
import ScoreGauge from "../components/ui/ScoreGauge";
import mockData from "../data/mockData.json";
import Footer from "../components/layout/Footer";

/* ---------------- helpers ---------------- */

const TrendIcon = ({ trend, color }) => {
  const cls = `h-4 w-4 ${
    color === "green"
      ? "text-green-500"
      : color === "red"
      ? "text-red-500"
      : color === "blue"
      ? "text-blue-500"
      : "text-gray-400"
  }`;
  if (trend === "up") return <HiTrendingUp className={cls} />;
  if (trend === "down") return <HiTrendingDown className={cls} />;
  if (trend === "right") return <HiArrowRight className={cls} />;
  return <span className="text-gray-400 text-sm"> N/H </span>;
};

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
const monthsAll = months;

/* ---------------- Tooltip ---------------- */

const TooltipBox = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0]?.payload;
  if (p?.score == null) return null;
  return (
    <div
      style={{
        background: "#fff",
        boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
        borderRadius: 8,
        padding: "8px 10px",
        fontSize: 12,
        lineHeight: 1.2,
        color: "#0f172a",
      }}
    >
      <div style={{ opacity: 0.6, marginBottom: 2 }}>{label}</div>
      <div style={{ fontWeight: 700 }}>{p.score}</div>
    </div>
  );
};

/* --------- Dot + pill label ---------- */

const DotWithLabel = ({ cx, cy, value, payload }) => {
  if (value == null || !payload?.tag) return null;

  const outerR = 6;
  const innerR = 3;
  const donutColor = "#004364";

  const { text, icon, color, isFinal } = payload.tag;
  const fontSize = 12;
  const pillH = 22;
  const pillR = pillH / 2;
  const chipD = pillH;
  const textPadding = 14;
  const estChar = fontSize * 0.55;
  const textW = text.length * estChar + textPadding;
  const pillW = textW + chipD;

  // keep pills from overflowing too far right on very narrow screens
  const pillX = (cx ?? 0) + 10;
  const pillY = (cy ?? 0) - pillH - 6;

  const mainBg = color;
  const chipBg = isFinal ? "#00A6CA" : "#046899";
  const textColor = isFinal ? "#262626" : "#ffffff";
  const iconColor = "#ffffff";

  return (
    <g pointerEvents="none">
      {/* donut */}
      <g transform={`translate(${cx}, ${cy})`}>
        <circle r={outerR} fill={donutColor} />
        <circle r={innerR} fill="#fff" />
      </g>

      {/* pill base */}
      <rect
        x={pillX}
        y={pillY}
        width={pillW}
        height={pillH}
        rx={pillR}
        ry={pillR}
        fill={mainBg}
      />
      <circle
        cx={pillX + pillW - pillR}
        cy={pillY + pillR}
        r={pillR}
        fill={chipBg}
      />

      {/* text */}
      <text
        x={pillX + textW / 2}
        y={pillY + pillH / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fontWeight={700}
        fill={textColor}
      >
        {text}
      </text>

      {/* icon */}
      <text
        x={pillX + pillW - pillR}
        y={pillY + pillR}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={14}
        fontWeight={700}
        fill={iconColor}
      >
        {icon}
      </text>
    </g>
  );
};

/* -------- Where You Stand bar -------- */

const WhereYouStandBar = () => {
  const whereYouStand = mockData?.whereYouStand || {
    bands: [
      { range: "300-722", percentage: 15, color: "#E15825" },
      { range: "723-747", percentage: 22, color: "#F18200" },
      { range: "748-764", percentage: 26, color: "#FCD800" },
      { range: "765-777", percentage: 18, color: "#A9D161" },
      { range: "778-900", percentage: 20, color: "#009900" },
    ],
    userScore: 650,
  };

  const { bands, userScore } = whereYouStand;

  const calculateScorePosition = (score) => {
    let cumulativePercentage = 0;
    for (let i = 0; i < bands.length; i++) {
      const band = bands[i];
      const [min, max] = band.range.split("-").map(Number);
      if (score >= min && score <= max) {
        const positionWithinBand = (score - min) / (max - min);
        return cumulativePercentage + band.percentage * positionWithinBand;
      }
      cumulativePercentage += band.percentage;
    }
    const totalRange = 900 - 300;
    return Math.min(Math.max(((score - 300) / totalRange) * 100, 0), 100);
  };

  const userPosition = calculateScorePosition(userScore);

  return (
    <div className="w-full bg-[#FFFFFF] p-3 sm:p-4 md:p-6 rounded-[5px]">
      <div className="relative">
        <div className="flex h-10 sm:h-12 md:h-14 gap-0.5 sm:gap-1 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
          {bands.map((band, i) => (
            <div
              key={i}
              className="flex items-center justify-start pl-1 sm:pl-3 md:pl-5 text-white text-xs sm:text-sm font-bold relative"
              style={{
                width: `${band.percentage}%`,
                backgroundColor: band.color,
              }}
            >
              <span className="drop-shadow-sm hidden xs:inline sm:inline">
                {band.percentage}%
              </span>
              <span className="drop-shadow-sm xs:hidden sm:hidden">
                {band.percentage > 5 ? `${band.percentage}%` : ""}
              </span>
            </div>
          ))}
        </div>

        {/* Score Marker */}
        <div
          className="absolute -translate-x-1/2 z-10 top-[40px] md:top-[50px]"
          style={{ left: `${userPosition}%` }}
        >
          <div className="flex justify-center">
            <div className="w-0 h-0 border-l-[6px] sm:border-l-[8px] border-r-[6px] sm:border-r-[8px] border-b-[10px] sm:border-b-[12px] border-l-transparent border-r-transparent border-b-gray-800" />
          </div>
          <div className="text-center mt-1 sm:mt-2">
            <div className="text-xs md:text-sm text-[#262626] font-[700] mb-1">
              Your NB Score
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl text-[#262626] font-[700] leading-none">
              {userScore}
            </div>
          </div>
        </div>
      </div>

      <div className="h-16 sm:h-18 md:h-20" />
      <div className="h-px bg-gray-200 my-4 sm:my-6" />
      <div className="space-y-3 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center sm:justify-center gap-2 sm:gap-4 md:gap-6">
          <span className="text-sm text-[#262626] font-medium ">
            Score Range
          </span>
          {bands.map((band, i) => (
            <div key={i} className="flex items-center gap-2 min-w-fit">
              <span
                className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-sm shadow-sm flex-shrink-0"
                style={{ backgroundColor: band.color }}
              />
              <span className="text-xs sm:text-sm text-[#595959] font-bold whitespace-nowrap">
                {band.range}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------- Overview ---------------- */

const Overview = () => {
  const COLOR = {
    closedCC: "#7E79DD",
    closedLoan: "#FDE866",
    openCC: "#99DBEA",
    openLoan: "#67D995",
  };
  const RAW = [
    {
      key: "closedCC",
      label: "Closed credit cards",
      count: 4,
      color: COLOR.closedCC,
      kind: "closed",
    },
    {
      key: "closedLoan",
      label: "Closed loans",
      count: 1,
      color: COLOR.closedLoan,
      kind: "closed",
    },
    {
      key: "openCC",
      label: "Open credit cards",
      count: 2,
      color: COLOR.openCC,
      kind: "open",
    },
    {
      key: "openLoan",
      label: "Open loans",
      count: 6,
      color: COLOR.openLoan,
      kind: "open",
    },
  ];
  const [tab, setTab] = useState("all");
  const breakdown = useMemo(
    () => (tab === "all" ? RAW : RAW.filter((r) => r.kind === tab)),
    [tab]
  );
  const total = useMemo(
    () => breakdown.reduce((s, r) => s + r.count, 0),
    [breakdown]
  );

  // History + right list
  const scoreHistoryRaw = mockData?.scoreHistory || [
    { month: "JAN", score: null },
    { month: "FEB", score: null },
    { month: "MAR", score: null },
    { month: "APR", score: 520 },
    { month: "MAY", score: 580 },
    { month: "JUN", score: 493 },
    { month: "JUL", score: null },
    { month: "AUG", score: 510 },
    { month: "SEP", score: null },
    { month: "OCT", score: null },
    { month: "NOV", score: null },
    { month: "DEC", score: null },
  ];

  const scoreHistory = useMemo(() => {
    return monthsAll.map((m) => {
      const found = scoreHistoryRaw.find((d) => d.month === m) || {
        month: m,
        score: null,
      };
      let tag = null;
      if ([520, 580, 493].includes(found.score)) {
        tag = {
          color: "#00A6CA",
          text: `${found.score}`,
          icon: "+",
          isFinal: false,
        };
      }
      if (found.score === 510) {
        tag = { color: "#FDDC02", text: "510", icon: ">", isFinal: true };
      }
      return { ...found, tag };
    });
  }, [scoreHistoryRaw]);

  const recentScores = mockData?.recentScores || [
    { score: 493, date: "18/08/2022", trend: "up" },
    { score: 490, date: "16/08/2022", trend: "down" },
    { score: 510, date: "14/08/2022", trend: "up" },
    { score: 509, date: "12/08/2022", trend: "right" },
    { score: null, date: "09/08/2022", trend: "none" },
  ];

  const userScore = mockData?.user?.score || 650;

  /* ---------- Responsive X-axis ticks for the score chart ---------- */
  const chartWrapRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    if (!chartWrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setChartWidth(e.contentRect.width || 0);
    });
    ro.observe(chartWrapRef.current);
    return () => ro.disconnect();
  }, []);

  // Decide how many labels to show, based on available pixels per tick.
  const xTicks = useMemo(() => {
    const minLabelWidth = 28; // px per 'JAN' style label
    if (!chartWidth) return monthsAll;
    const required = monthsAll.length * minLabelWidth;
    const step = Math.max(1, Math.ceil(required / chartWidth)); // 1=all, 2=every other, etc.
    return monthsAll.filter((_, i) => i % step === 0);
  }, [chartWidth]);

  const chartHeight = chartWidth && chartWidth < 500 ? 260 : 320;
  const chartMargins =
    chartWidth && chartWidth < 500
      ? { top: 18, right: 24, bottom: 22, left: 42 }
      : { top: 30, right: 40, bottom: 30, left: 48 };

  return (
    <div className="space-y-6 ">
      {/* ----- Row 1 ---- */}
      <div className=" bg-[#F7F9FA] px-4 lg:px-6 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-stretch px-4 lg:px-6 py-4">
          {/* ScoreGauge */}
          <div className="lg:col-span-3">
            <ScoreGauge score={767} />
          </div>

          {/* side cards */}
          <div className="lg:col-span-4 space-y-6">
            {/* NB REPORT */}
            <div className="bg-white rounded-[8px] shadow-sm border border-gray-100 p-5 sm:p-6 lg:p-7">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 sm:gap-6">
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#046899] mb-2 sm:mb-3 tracking-tight">
                    NB REPORT
                  </h3>

                  <p className="text-[15px] sm:text-[15.5px] text-[#262626] mb-4 sm:mb-6 leading-relaxed max-w-none md:max-w-[420px]">
                    Get your personalized NB Report to plan your financial
                    future.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <a
                      href="#"
                      className="flex items-center text-[15px] font-medium text-[#066A9B] hover:text-[#01476b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#66b7d9] transition group"
                      aria-label="View your NB Report"
                    >
                      <IoEyeOutline className="w-5 h-5 mr-3 text-[#262626] shrink-0" />
                      <span className="underline underline-offset-2 break-words">
                        View Your NB Report
                      </span>
                      <HiChevronRight className="w-4 h-4 ml-2 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                      href="#"
                      className="flex items-center text-[15px] font-medium text-[#066A9B] hover:text-[#01476b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#66b7d9] transition group"
                      aria-label="Download your NB Report with summary"
                    >
                      <LiaFileDownloadSolid className="w-5 h-5 mr-3 text-[#262626] shrink-0" />
                      <span className="underline underline-offset-2 break-words">
                        Download Your NB Report With Summary
                      </span>
                      <HiChevronRight className="w-4 h-4 ml-2 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                <div className="md:ml-4">
                  <div className="mx-auto md:mx-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#1e7b82] to-[#0891b2] rounded-full flex items-center justify-center shadow-lg">
                    <div className="relative">
                      <div className="w-9 h-11 sm:w-10 sm:h-12 bg-white rounded-sm shadow-sm relative overflow-hidden">
                        <div className="absolute bottom-1 left-1 right-1 space-y-1">
                          <div className="h-0.5 bg-gray-300 rounded"></div>
                          <div className="h-0.5 bg-gray-300 rounded"></div>
                          <div className="h-0.5 bg-gray-300 rounded w-2/3"></div>
                        </div>
                        <div className="absolute top-1 left-1 w-5 h-5 sm:w-6 sm:h-6">
                          <div className="w-full h-full rounded-full overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 to-blue-400 rounded-full"></div>
                            <div className="absolute top-0 left-1/2 w-0 h-0 border-l-3 border-r-3 border-b-3 border-l-transparent border-r-transparent border-b-white -translate-x-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* subscription */}
            <div className="rounded-[8px] shadow-sm border border-[#FFF8D4] bg-gradient-to-l from-[#F7DC6F] to-[#edd05c] p-5 sm:p-6 lg:p-7">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#262626] font-normal max-w-none md:max-w-[520px]">
                    You currently have an active subscription. You will be able
                    to access Free Annual NB Score &amp; Report after the
                    subscription period expires.
                  </p>
                </div>
                <div className="shrink-0 md:ml-4">
                  <div className="mx-auto md:mx-0 w-40 h-26 sm:w-36 sm:h-24 md:w-[182px] md:h-[116px]">
                    <img
                      src={introImg}
                      alt="Subscription Illustration"
                      className="object-contain w-full h-full rounded-lg drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----- Row 2 ----- */}
      <div className="px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="bg-white rounded-2xl shadow-lg border border-sky-100 lg:col-span-2">
            <div className="flex items-center justify-between px-5 pt-4">
              <div className="flex items-center gap-1">
                <div className="relative group flex items-center gap-0 md:gap-1">
                  <h3 className="text-[16px] font-[700] text-[#046899]">
                    Your Accounts
                  </h3>
                  <AiOutlineInfoCircle className="h-5 w-5 text-[#046899]  cursor-pointer" />

                  <div className="absolute left-1/2 top-full z-20 mt-2 w-52 -translate-x-1/2 scale-0 transform rounded-md bg-gray-800 px-3 py-2 text-xs text-white shadow-lg transition-all duration-200 group-hover:scale-100">
                    Breakdown of your open & closed accounts (loans & credit
                    cards).
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 rounded-[8px] p-1 flex text-[13px] ml-3">
                {["all", "open", "closed"].map((k) => (
                  <button
                    key={k}
                    onClick={() => setTab(k)}
                    className={`px-3 py-1 rounded-[6px] font-[400] text-[14px] ${
                      tab === k
                        ? "bg-[#066A9B] text-white shadow"
                        : "text-slate-600"
                    }`}
                  >
                    {k === "all" ? "All" : k[0].toUpperCase() + k.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 pb-5">
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="relative flex items-center justify-center">
                  <div className="w-[240px] h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={breakdown}
                          dataKey="count"
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          startAngle={90}
                          endAngle={-270}
                          paddingAngle={2}
                          stroke="transparent"
                          isAnimationActive
                        >
                          {breakdown.map((d) => (
                            <Cell key={d.key} fill={d.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(v, n, p) => [
                            v,
                            p?.payload?.label ?? p?.name ?? n,
                          ]}
                          contentStyle={{
                            borderRadius: 8,
                            border: "none",
                            boxShadow: "0 4px 14px rgba(0,0,0,.12)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="absolute text-center select-none pointer-events-none">
                    <div className="text-[14px] text-[#262626] font-[700] leading-4">
                      Total
                    </div>
                    <div className="text-[14px] text-[#262626] font-[700] leading-4">
                      Accounts
                    </div>
                    <div className="text-[16px] font-[400] text-slate-800 mt-1">
                      {total}
                    </div>
                  </div>
                </div>

                <div className="pl-2 md:pl-0">
                  <ul className="space-y-3">
                    {RAW.map((r) => (
                      <li
                        key={r.key}
                        className="flex items-center space-y-3 justify-between text-[14px] text-[#262626] font-[700]"
                      >
                        <div className="flex items-center">
                          <span
                            className="w-3.5 h-3.5 rounded-full mr-2"
                            style={{ backgroundColor: r.color }}
                          />
                          <span className="text-slate-700">{r.label}</span>
                        </div>
                        <span className="font-semibold text-slate-700">
                          {tab === "all"
                            ? r.count
                            : r.kind === tab
                            ? r.count
                            : 0}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* small cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-sky-100">
              <div className="flex">
                <div className="w-14 bg-[#E0F9FF] rounded-l-xl flex items-center justify-center">
                  <LuTriangleAlert className="h-6 w-6 text-[#00A6CA]" />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[16px] font-bold text-[#046899] mt-2">
                        Total Disputes
                      </div>
                      <p className="text-[14px] text-slate-600 mt-5">
                        Learn more about credit reporting and related policies.
                      </p>
                      <a
                        href="#"
                        className="text-[13px] text-[#046899] border-b border-[#046899] font-medium mt-2 inline-block"
                      >
                        Read More
                      </a>
                    </div>
                    <div className="text-[18px] font-bold text-[#262626] ml-4 mt-2">
                      12
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-sky-100">
              <div className="flex">
                <div className="w-14 bg-[#E0F9FF] rounded-l-xl flex items-center justify-center">
                  <AiOutlineFileSearch className="h-6 w-6 text-[#00A6CA]" />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between my-2">
                    <div>
                      <div className="text-[16px] font-bold text-[#046899]">
                        Total Enquiries
                      </div>
                      <div className="text-[14px] font-[400] text-[#595959]">
                        (In last 3 years)
                      </div>
                    </div>
                    <div className="text-[18px] font-bold text-[#262626] ml-4">
                      05
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----- Row 3 — Score history  ----- */}
      <div className="px-4 md:px-8 lg:px-10">
        <div className="lg:col-span-3">
          <Card
            title="NB SCORE HISTORY"
            icon={<AiOutlineInfoCircle className="h-5 w-5 text-[#046899]" />}
          >
            <div className="flex flex-col lg:flex-row items-center gap-6 bg-[#F7F9FA] p-6 rounded-[12px]">
              <div className="flex-1 w-full">
                <p className="text-[16px] text-[#262626] mb-0 pl-2 md:pl-8">
                  Trended view of the changes in your NB Score with every
                  refresh.
                </p>

                <div
                  ref={chartWrapRef}
                  style={{ width: "100%", height: chartHeight }}
                >
                  <ResponsiveContainer>
                    <LineChart data={scoreHistory} margin={chartMargins}>
                      <CartesianGrid stroke="#e5eaef" strokeDasharray="4 4" />
                      <XAxis
                        dataKey="month"
                        ticks={xTicks}
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#667085",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                        tickMargin={10}
                        padding={{ left: 10, right: 10 }}
                      />
                      <YAxis
                        domain={[300, 900]}
                        ticks={[300, 400, 500, 600, 700, 800, 900]}
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#667085",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                        width={44}
                        tickMargin={8}
                        allowDecimals={false}
                      />
                      <Tooltip
                        content={<TooltipBox />}
                        cursor={{ stroke: "#94a3b8", strokeDasharray: "4 6" }}
                      />
                      <Line
                        type="linear"
                        dataKey="score"
                        stroke="#0F2941"
                        strokeWidth={2}
                        dot={<DotWithLabel />}
                        activeDot={<DotWithLabel />}
                        connectNulls
                        isAnimationActive
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right list */}
              <div className="w-full lg:w-64 flex-shrink-0 mt-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-4 text-sm border-b border-black pb-2">
                    August 2022
                  </h4>
                  <div className="space-y-3">
                    {recentScores.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-sm border-b border-gray-100 pb-1"
                      >
                        <div className="flex items-center gap-2 ">
                          <TrendIcon
                            trend={item.trend}
                            color={
                              item.trend === "up"
                                ? "green"
                                : item.trend === "down"
                                ? "red"
                                : item.trend === "right"
                                ? "blue"
                                : "gray"
                            }
                          />
                          <span className="font-semibold text-[16px] text-[#262626]">
                            {item.score ?? (
                              <span className="text-gray-400 text-sm">N/H</span>
                            )}
                          </span>
                        </div>
                        <span className="text-[#262626] text-[12px]">
                          {item.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ---- Row 4 ---- */}
      <div className="px-4 md:px-8 lg:px-10 ">
        <Card
          title="WHERE YOU STAND"
          icon={<AiOutlineInfoCircle className="h-5 w-5 text-[#046899]" />}
        >
          <div className="p-5 md:p-6 bg-[#F7F9FA] rounded-[12px]">
            <WhereYouStandBar />
            <div className="text-center mt-8">
              <p className=" text-[13px] md:text-[16px] text-[#262626] font-[400] mb-2">
                {mockData?.whereYouStand?.message ||
                  "Your NB Score lies in the top 70% in All Of India."}
              </p>
              <p className="text-[12px] md:text-[14px] text-[#262626 font-[400]">
                {mockData?.whereYouStand?.subMessage || "Based on the NB Data"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Overview;

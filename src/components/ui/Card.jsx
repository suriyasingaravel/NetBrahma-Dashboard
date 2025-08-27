import React from "react";
import { clsx } from "clsx";

const Card = ({ children, className, title, icon }) => {
  return (
    <div className={clsx("bg-white  ", className)}>
      {title && (
        <div className="px-4 py-3">
          <div className="flex items-center">
            <div className="flex items-center gap-1 relative group">
              <h3 className="text-lg font-semibold text-[#046899] uppercase tracking-wide mr-1">
                {title}
              </h3>
              {icon && <div className="mr-2 cursor-pointer">{icon}</div>}

              {/* Tooltip */}
              <div className="absolute left-1/2 top-full mt-2 w-52 z-20 -translate-x-1/2 scale-0 transform rounded-md bg-gray-800 px-3 py-2 text-xs text-white shadow-lg transition-all duration-200 group-hover:scale-100">
                {title === "NB SCORE HISTORY"
                  ? "View the month-by-month changes in your NB Score."
                  : "Shows how your NB Score compares to the overall population."}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;

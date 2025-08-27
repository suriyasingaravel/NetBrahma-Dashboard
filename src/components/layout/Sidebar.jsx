import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/netbrahma-logo.png";
import nbicon from "../../assets/logo.jpg";
import nbname from "../../assets/nb-logo.png";
import { GoHome } from "react-icons/go";
import { RxBell } from "react-icons/rx";
import { BsSpeedometer2 } from "react-icons/bs";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdUpgrade, MdOutlineCardGiftcard } from "react-icons/md";
import {
  HiChevronUp,
  HiChevronDown,
  HiOutlineDocumentReport,
} from "react-icons/hi";
import clsx from "clsx";

const Sidebar = ({ isOpen, onClose }) => {
  // NAV DATA
  const menuItems = [
    { name: "Score & Report", icon: GoHome, path: "/", isOverview: true },
    {
      name: "Summary",
      icon: HiOutlineDocumentReport,
      path: "/summary",
      isSubItem: true,
    },
    {
      name: "History",
      icon: HiOutlineDocumentReport,
      path: "/history",
      isSubItem: true,
    },
    {
      name: "Where You Stand",
      icon: HiOutlineDocumentReport,
      path: "/where-you-stand",
      isSubItem: true,
    },

    { name: "Your Report", icon: HiOutlineDocumentReport, path: "/reports" },
    { name: "Alerts", icon: RxBell, path: "/alerts", badge: "4" },
    { name: "Simulator", icon: BsSpeedometer2, path: "/simulator" },
    { name: "Education", icon: RiGraduationCapLine, path: "/education" },
    { name: "Upgrade My Plan", icon: MdUpgrade, path: "/upgrade" },
    { name: "Rewards Program", icon: MdOutlineCardGiftcard, path: "/rewards" },
  ];

  const location = useLocation();

  const overviewItem = menuItems.find((i) => i.isOverview);
  const overviewChildren = menuItems.filter((i) => i.isSubItem);
  const others = menuItems.filter((i) => !i.isOverview && !i.isSubItem);

  const isOverviewRouteActive = useMemo(() => {
    const paths = [
      overviewItem?.path,
      ...overviewChildren.map((c) => c.path),
    ].filter(Boolean);
    return paths.some(
      (p) => location.pathname === p || location.pathname.startsWith(p + "/")
    );
  }, [location.pathname, overviewItem, overviewChildren]);

  const [overviewOpen, setOverviewOpen] = useState(true);
  useEffect(() => {
    if (isOverviewRouteActive) setOverviewOpen(true);
  }, [isOverviewRouteActive]);

  return (
    <div
      className={clsx(
        "fixed inset-y-0 left-0 z-30 w-64 bg-nb-green transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-2 py-4 mt-4 border-b border-[#008A00]">
          <div className="flex items-center gap-2 justify-center px-2 py-1 pl-3 rounded text-black font-bold text-sm">
            <img
              className="w-[18px] h-[18px] object-cover"
              src={nbicon}
              alt="Netbramha Logo"
            />
            <img
              className="w-[147px] h-[17px] object-cover"
              src={nbname}
              alt="Netbramha Logo"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1  py-4 space-y-1">
          <div className={clsx("", overviewOpen ? "bg-[#00000026]" : "")}>
            <button
              onClick={() => setOverviewOpen((v) => !v)}
              className="flex items-center justify-between w-full px-4 py-2 pt-4 text-white rounded-md text-sm font-medium"
            >
              <div className="flex items-center">
                <GoHome className="mr-3 h-5 w-5" />
                Overview
              </div>
              {overviewOpen ? (
                <HiChevronUp className="h-4 w-4" />
              ) : (
                <HiChevronDown className="h-4 w-4" />
              )}
            </button>

            {overviewOpen && (
              <div className="pb-2">
                <div className="ml-4 pl-4 border-l border-white/20">
                  <NavLink
                    to={overviewItem.path}
                    onClick={onClose}
                    end
                    className={({ isActive }) =>
                      clsx(
                        "flex items-center px-3 py-2 text-sm rounded-md mt-1 transition-colors",
                        isActive
                          ? "text-white font-bold text-base"
                          : "text-green-100 hover:font-bold text-sm"
                      )
                    }
                  >
                    {overviewItem.name}
                  </NavLink>

                  {/* Other sub-items (NO ICONS here) */}
                  {overviewChildren.map((item, idx) => (
                    <NavLink
                      key={idx}
                      to={item.path}
                      onClick={onClose}
                      end
                      className={({ isActive }) =>
                        clsx(
                          "flex items-center px-3 py-2 text-sm rounded-md mt-1 transition-colors",
                          isActive
                            ? "text-white font-bold text-base"
                            : "text-green-100 hover:font-bold text-sm"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* OTHER TOP-LEVEL LINKS */}
          {others.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  "flex items-center px-4 py-2 text-sm rounded-md transition-colors",
                  isActive
                    ? "text-white font-bold text-base"
                    : "text-green-100 hover:font-bold text-sm"
                )
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
              {item.badge && (
                <span className="ml-4 md:ml-2 bg-nb-yellow text-black px-2 py-1 rounded-full text-xs font-bold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

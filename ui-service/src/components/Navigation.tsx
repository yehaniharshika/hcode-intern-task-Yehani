import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { FaCarSide, FaGear } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { RiCloseFill, RiMenu3Line } from "react-icons/ri";
import { GrDocumentDownload } from "react-icons/gr";

export const Navigation = () => {
  const [open, setOpen] = useState(window.innerWidth > 780);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);

  // Close sidebar when clicking a menu link (for small screens)
  const handleLinkClick = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  // Handle window resize to automatically hide/show sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 780) {
        setOpen(true);
        setIsMobile(false);
      } else {
        setOpen(false);
        setIsMobile(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="flex">
      {/* Menu Toggle Button (only for small screens) */}
      {isMobile && !open && (
        <div className="fixed top-0 left-0 w-full bg-[#3F51B5] p-3 flex justify-between items-center z-50">
          <RiMenu3Line
            size={26}
            className="cursor-pointer text-white"
            onClick={() => setOpen(true)}
          />
        </div>
      )}

      {/* Sidebar container */}
      {open && (
        <div
          style={{ backgroundColor: "#3F51B5" ,minHeight:"100vh" }}
          className={`z-40  text-gray-100 px-4 fixed top-0 transition-transform duration-500 w-64 ${
            isMobile ? "fixed" : "relative"
          }`}
        >
          {/* Close Button (Only visible when sidebar is open on mobile) */}
          {isMobile && (
            <div className="flex justify-end p-3">
              <RiCloseFill
                size={29}
                className="cursor-pointer text-white"
                onClick={() => setOpen(false)}
              />
            </div>
          )}

          {/* Logo Section */}
          <div
            className="py-4 flex justify-center items-center border-b border-gray-300"
            style={{ fontFamily: "'Lilita One', sans-serif", fontSize: "24px" }}
          >
            🚗Vehicore
          </div>

          <ul className="px-3 text-[0.9rem] py-5 flex flex-col gap-3 font-bold">
            {[
              {
                to: "/dashboard",
                icon: <AiOutlineAppstore size={24} />,
                label: "Dashboard",
              },
              {
                to: "/uploads",
                icon: <FaCarSide size={24} />,
                label: "Vehicles",
              },

              {
                to: "/reports",
                icon: <GrDocumentDownload size={24} />,
                label: "Reports",
              },

              { to: "/setting", icon: <FaGear size={24} />, label: "Settings" },
              {
                to: "/logout",
                icon: <FaSignOutAlt size={24} />,
                label: "Log Out",
              },
            ].map(({ to, icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={handleLinkClick}
                  className={({
                    isActive,
                  }) => `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-[15.5px] 
                        ${
                          isActive
                            ? "bg-[#6574c4] text-white shadow-md scale-105"
                            : "text-white"
                        } 
                        hover:bg-[#9fa8da] hover:border-2 hover:text-white hover:scale-105 hover:shadow-lg no-underline`}
                  style={{
                    textDecoration: "none",
                    fontFamily: "'Montserrat', serif",
                    fontSize:"15px",
                    color: "darkblue",
                    fontWeight: "600",
                  }}
                >
                  {icon} {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

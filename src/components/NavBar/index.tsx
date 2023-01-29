import "./assets/NavBar.scss";

import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import Profile from "./components/Profile";
import Dropdown from "./components/Dropdown";
import HomeIcon from "./assets/images/home.svg";
import MembersIcon from "./assets/images/members.svg";
import ContactIcon from "./assets/images/contact.svg";
import Logo from "./assets/images/logo.png";

const API_URL = import.meta.env.VITE_API_URL;

const NavBar = ({ userData, setUserData }: any) => {
  const profileRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinkClickEvent = (location: string) => {
    navigate(location);
    if (mobileMenuOpen) setMobileMenuOpen(false);
    if (mobileMenuRef.current) mobileMenuRef.current.classList.remove("open");
  };

  const clickOutSideToCloseDropdown = useCallback(
    (nativeEvent: any) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(nativeEvent.target)
      ) {
        setDropdownOpen(false);
      }
    },
    [profileRef]
  );

  useEffect(() => {
    document.addEventListener("click", clickOutSideToCloseDropdown);

    return function cleanup() {
      document.removeEventListener("click", clickOutSideToCloseDropdown);
    };
  }, [clickOutSideToCloseDropdown]);

  const selectorStyles: { [key: string]: { [key: string]: string } } = {
    "/": {},
    "/members": {},
    "/contact": {},
  };

  {
    const userMenu = document.querySelector(".userMenu") as HTMLDivElement;
    const profile = document.querySelector(".profile") as HTMLDivElement;
    if (userMenu != null && profile != null) {
      userMenu.style.width = profile.offsetWidth + "px";
    }
  }
  // if mobileMenuOpen, animate to right: 0, else animate to right: -60hw
  return (
    <>
      <motion.div
        animate={{ left: mobileMenuOpen ? "0" : "-60vw" }}
        className="mobile-navbar"
      >
        <ul>
          <li
            onClick={() => navLinkClickEvent("/")}
            className={location.pathname === "/" ? "selected" : ""}
          >
            <img src={HomeIcon} alt="home icon" />
            <p>Home</p>
          </li>
          <li
            onClick={() => navLinkClickEvent("/members")}
            className={location.pathname === "/members" ? "selected" : ""}
          >
            <img src={MembersIcon} alt="members icon" />
            <p>Members</p>
          </li>
          <li
            onClick={() => navLinkClickEvent("/contact")}
            className={location.pathname === "/contact" ? "selected" : ""}
          >
            <img src={ContactIcon} alt="contact icon" />
            <p>Contact Us</p>
          </li>
        </ul>
      </motion.div>

      <div className="nav-bar">
        <div className="nav-logo">
          <img src={Logo} alt="" />
        </div>

        <div>
          <div className="burger-container">
            <div className="burger" ref={mobileMenuRef} onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen)
              mobileMenuRef.current?.classList.toggle("open");
            }} />
          </div>
        </div>

        <div className="nav-links">
          <motion.div
            className="selector"
            style={selectorStyles[location.pathname]}
            animate={{ ...selectorStyles[location.pathname] }}
            transition={{
              duration: 0.1,
              type: "spring",
              stiffness: 60,
              damping: 15,
            }}
            initial={false}
          />

          <ul>
            <li
              onClick={() => navLinkClickEvent("/")}
              className={location.pathname === "/" ? "selected" : ""}
            >
              <img src={HomeIcon} alt="home icon" />
              <p>Home</p>
            </li>
            <li
              onClick={() => navLinkClickEvent("/members")}
              className={location.pathname === "/members" ? "selected" : ""}
            >
              <img src={MembersIcon} alt="members icon" />
              <p>Members</p>
            </li>
            <li
              onClick={() => navLinkClickEvent("/contact")}
              className={location.pathname === "/contact" ? "selected" : ""}
            >
              <img src={ContactIcon} alt="contact icon" />
              <p>Contact Us</p>
            </li>
          </ul>

        </div>

        {/* Check if userdata is empty, if true return sign in button, else return profile component */}
        <>
          {Object.keys(userData).length === 0 ? (
            <motion.div
              key="sign-in"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sign-in-button"
            >
              <button
                onClick={() => {
                  window.location.href = API_URL + "/login";
                }}
              >
                Sign in
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Profile
                userData={userData}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
                profileRef={profileRef}
                dropdownRef={dropDownRef}
              />
              <AnimatePresence>
                {/* DROPDOWN COMPONENT */}
                {dropdownOpen && (
                  <Dropdown
                    dropDownRef={dropDownRef}
                    profileRef={profileRef}
                    setUserData={setUserData}
                    setOpen={setDropdownOpen}
                    opened={dropdownOpen}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </>
      </div>
    </>
  );
};

export default NavBar;
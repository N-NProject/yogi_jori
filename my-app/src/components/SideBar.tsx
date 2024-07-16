"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import PostPreview from "./PostPreview";
import icons_chat from "@/assets/chat/icons_chat.svg";


const dummyData = {
  board_id: 1,
  user_id: 1,
  title: "커피챗",
  tag: ["커피챗"],
  date: "2023-08-17",
  time: "18:00",
  currentPerson: 22,
  maxPerson: 100,
  location: "경기도 시흥시",
};

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isTransitionDisabled, setIsTransitionDisabled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isMenuOpen) {
      closeMenu();
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (isMenuOpen && !(e.target as HTMLElement).closest(".menu-wrapper")) {
      closeMenu();
    }
  };

  const handleResize = () => {
    setIsTransitionDisabled(true);
    setTimeout(() => {
      setIsTransitionDisabled(false);
    }, 500);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={` top-nav  z-0 ${isTransitionDisabled ? "no-transition" : ""}`}
    >
      <div className={`menu-wrapper ${isMenuOpen ? "is-opened" : ""}`}>
      <div className="flex items-center p-5">
              <Image src={icons_chat} alt="채팅 아이콘"></Image>
              <h1 className="text-[1.5rem] font-semibold ml-[0.5rem]">CHAT</h1>
            </div>

        <ul className="px-[1rem] mx-[1em] ">
            

          <PostPreview
            key={dummyData.board_id}
            board_id={dummyData.board_id}
            title={dummyData.title}
            tag={dummyData.tag}
            date={dummyData.date}
            time={dummyData.time}
            currentPerson={dummyData.currentPerson}
            maxPerson={dummyData.maxPerson}
            location={dummyData.location}
          />
        </ul>
        <button
          className="menu-close"
          type="button"
          aria-label="close menu"
          onClick={closeMenu}
        >
          ✕
        </button>
      </div>

      <div className={`fixed-menu transition-colors rounded-lg shadow-md hover:bg-red-700 hover:text-white focus:outline-none focus:ring focus:ring-darkpink focus:ring-offset-white focus:ring-offset-2 text-gray-500 bg-darkpink
               ${
                 isMenuOpen
                   ? "text-white bg-primary"
                   : "text-gray-500 bg-white"
               }
            `}>
        <button
          className="menu-toggle"
          type="button"
          aria-label="toggle menu"
          onClick={toggleMenu}
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

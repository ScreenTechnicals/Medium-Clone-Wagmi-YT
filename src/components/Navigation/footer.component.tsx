import React from "react";
import {
  FaSquareGithub,
  FaSquareInstagram,
  FaSquareXTwitter,
  FaSquareYoutube,
} from "react-icons/fa6";

export const Footer = () => {
  return (
    <div className="w-full flex justify-center items-center p-5 border-t border-[#2d2d2d] gap-4">
      <a
        href="https://instagram.com/devverse.io"
        referrerPolicy="no-referrer"
        target="_blank"
      >
        <FaSquareInstagram size={40} />
      </a>
      <a
        href="https://github.com/ScreenTechnicals"
        referrerPolicy="no-referrer"
        target="_blank"
      >
        <FaSquareGithub size={40} />
      </a>
      <a
        href="https://twitter.com/ChinmaySa1"
        referrerPolicy="no-referrer"
        target="_blank"
      >
        <FaSquareXTwitter size={40} />
      </a>
      <a
        href="https://www.youtube.com/@Dev_Verse"
        referrerPolicy="no-referrer"
        target="_blank"
      >
        <FaSquareYoutube size={40} />
      </a>
    </div>
  );
};

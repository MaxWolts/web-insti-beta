import React, { useState, useEffect } from "react";
import { Pivot as HamburgerIcon } from "hamburger-react";
import { URLS } from "@/consts";

const Hamburger: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Puedes ajustar este valor según necesites
      const show = window.scrollY > 100;
      if (show !== isVisible) {
        setIsVisible(show);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);
  return (
    <div className="sticky bottom-0 w-full backdrop-blur-xl flex flex-col md:hidden transition-all duration-500 ease-in-out">
      <nav
        className={`flex flex-col items-center  w-full overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? "h-dvh opacity-100 bg-white bg-[url('/bg.png')] bg-no-repeat bg-center"
            : "h-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="my-auto flex flex-col gap-5 text-3xl text-center">
          {Object.entries(URLS).map(([key, value]) => (
            <li>
              <Link
                href={value.href}
                target="_blank"
                rel="noopener noreferrer"
                text={value.text}
              />
            </li>
          ))}
        </ul>
      </nav>

      {!isOpen && (
        <div className="py-4 px-5 transition-opacity duration-300">
          All rights reserved © 2023
        </div>
      )}

      <div className="z-50 absolute right-2 bottom-4">
        <HamburgerIcon toggled={isOpen} toggle={setOpen} />
      </div>
    </div>
  );
};

export default Hamburger;

const Link: React.FC<{
  href: string;
  target: string;
  rel: string;
  text: string;
}> = ({ href, target, rel, text }) => {
  // Verificar si la URL actual coincide con el href
  const isCurrent = typeof window !== 'undefined' && window.location.pathname === href;
  
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`animated-link ${isCurrent ? 'font-bold text-4xl' : ''}`}
    >
      {text}
    </a>
  );
};
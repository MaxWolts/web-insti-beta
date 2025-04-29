import React, { useState } from "react";
import { Pivot as HamburgerIcon } from "hamburger-react";

const Hamburger: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="sticky bottom-0 w-full bg-white flex flex-col md:hidden transition-all duration-500 ease-in-out">
      <nav
        className={`flex flex-col items-center bg-white w-full overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "h-screen opacity-100" : "h-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="my-auto">
          <li>
            <a href="#home">Inicio</a>
          </li>
          <li>
            <a href="#about">Acerca de</a>
          </li>
          <li>
            <a href="#services">Servicios</a>
          </li>
          <li>
            <a href="#contact">Contacto</a>
          </li>
        </ul>
      </nav>

      {!isOpen && (
        <div className="py-4 px-5 transition-opacity duration-300">
          All rights reserved © 2023
        </div>
      )}

      <div className="z-50 absolute right-2 bottom-0">
        <HamburgerIcon toggled={isOpen} toggle={setOpen} />
      </div>
    </div>
  );
};

export default Hamburger;

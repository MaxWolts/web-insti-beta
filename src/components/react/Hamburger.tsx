import React, { useState } from "react";
import { Pivot as HamburgerIcon } from "hamburger-react";

const Hamburger: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="sticky bottom-0 w-full bg-white flex md:hidden">
      {isOpen ? (
        <nav className="flex flex-col items-center bg-white h-screen w-full">
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
      ) : (
        <div className="py-4 px-5">All rights reserved © 2023</div>
      )}
      <div className="z-50 absolute right-2 bottom-0">
        <HamburgerIcon toggled={isOpen} toggle={setOpen} />
      </div>
    </div>
  );
};
export default Hamburger;

import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import s from "./style.module.css";

export const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [widthMenu, setWidthMenu] = useState(window.innerWidth >= 600 && window.screen.width >= 600);
  const [menuBurgerDeployed, setMenuBurgerDeployed] = useState(false);



  useEffect(() => {
    const handleResize = () => {
      setWidthMenu(window.innerWidth >= 600 && window.screen.width >= 600)
    };

    window.addEventListener("resize", handleResize)
    return()=>{window.removeEventListener("resize", handleResize)}
  }, []);

  const toggleMenu = () =>{setMenuBurgerDeployed(!menuBurgerDeployed)}

  return (
    <div>
        <div className={s.menuContainer} style={widthMenu ? {zIndex: 750} : {zIndex: 999}}>
            <div className={s.menu}>
                <nav className={s.nav}>
                  <ul className={`${widthMenu || menuBurgerDeployed ? s.menuOpen : ""} ${s.navList}`}>
                    <div className={location.pathname === "/Pr%C3%A9sentation" ? s.active : ""}>
                      <li onClick={() => {navigate("/Présentation"); toggleMenu()}}>Présentation</li>
                    </div>
                    <div className={location.pathname === "/Menu" ? s.active : ""}>
                      <li onClick={() => {navigate("/Menu"); toggleMenu()}}>Menu</li>
                    </div>
                    <div className={location.pathname === "/Gallerie" ? s.active : ""}>
                      <li onClick={() => {navigate("/Gallerie"); toggleMenu()}}>Gallerie</li>
                    </div>
                    <div className={location.pathname === "/Avis" ? s.active : ""}>
                      <li onClick={() => {navigate("/Avis"); toggleMenu()}}>Avis</li>
                    </div>
                    <div className={location.pathname === "/Contact" ? s.active : ""}>
                      <li onClick={() => {navigate("/Contact"); toggleMenu()}}>Contact</li>
                    </div>
                  </ul>
                </nav>
                <div className={s.burger_container}>
                  <img onClick={toggleMenu} className={s.burger} src="img/melted/menu_burger.svg" alt="menu burger" width="30px" />
                </div>
            </div>
        </div>
        <div className={s.outlet}>
          <Outlet />
        </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import Drawer from "./Drawer";
import logo from '../../assets/Img/logo.png'
const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [activeSection, setActiveSection] = useState("الرئيسية");

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }

    const sections = document.querySelectorAll("header, section");
    let currentSection = "الرئيسية";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 60) {
        currentSection = section.getAttribute("id");
      }
    });

    setActiveSection(currentSection);
  };

  const handleLinkClick = (sectionId) => {
    setActiveSection(sectionId);
    document
      .querySelector(`#${sectionId}`)
      .scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header id="الرئيسية">
        <nav
          className={`${
            isFixed ? "fixed-header" : "section__container nav__container"
          }`}
        >
          <div className="nav__logo" data-aos="fade-down">
            <img src={logo} alt="" />
          </div>
          <ul className="nav__links"  data-aos="fade-down">
            <li
              className={`link ${
                activeSection === "الرئيسية" ? "active-link" : ""
              }`}
              onClick={() => handleLinkClick("الرئيسية")}
            >
              <a href="#الرئيسية">الرئيسية</a>
            </li>
            <li
              className={`link ${
                activeSection === "تعرف_علينا" ? "active-link" : ""
              }`}
              onClick={() => handleLinkClick("تعرف_علينا")}
            >
              <a href="#تعرف علينا">تعرف علينا</a>
            </li>
            <li
              className={`link ${
                activeSection === "خدماتنا" ? "active-link" : ""
              }`}
              onClick={() => handleLinkClick("خدماتنا")}
            >
              <a href="#خدماتنا">خدماتنا</a>
            </li>
            <li
              className={`link ${
                activeSection === "اهتمامنا" ? "active-link" : ""
              }`}
              onClick={() => handleLinkClick("اهتمامنا")}
            >
              <a href="#اهتمامنا">اهتمامنا</a>
            </li>
            <li
              className={`link ${
                activeSection === "ما_يميزنا" ? "active-link" : ""
              }`}
              onClick={() => handleLinkClick("ما_يميزنا")}
            >
              <a href="#ما_يميزنا">ما يميزنا</a>
            </li>
          </ul>
          <button className="btn btn-bar" onClick={handleDrawerOpen}>
            <FaBars />
          </button>
        </nav>
        <Drawer isOpen={drawerOpen} onClose={handleDrawerClose} />
        <div className="section__container header__container">
          <div className="header__content" data-aos="fade-up" data-aos-delay="500">
            <h1>مرحبًا بكم في عالم الجمال والإبداع مع غرام سلطان</h1>
            <p>
             خبيرة المكياج المتميزة. 
            احصلي على إطلالة ساحرة ومذهلة في أتليه غرام، حيث يلتقي الفن والابتكار مع أحدث صيحات المكياج والأزياء.
            </p>
            <a className="btn" href="https://wa.me/+20109252712" target="_blank" data-aos="fade-up" data-aos-delay="300">
              تواصل معنا
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

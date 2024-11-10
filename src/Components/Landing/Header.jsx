import { useEffect, useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"; 
import Drawer from "./Drawer";
import logo from '../../assets/Img/logo.png';
import hero from '../../assets/Img/bg1.jpg';
import { useGetMainLandUserQuery } from "../../app/Feature/API/Land";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [activeSection, setActiveSection] = useState("الرئيسية");
  const [activeSlide, setActiveSlide] = useState(0);
  const { data: mainLand, isLoading, isError } = useGetMainLandUserQuery();

  const swiperRef = useRef(null); 

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

  if (isError) return;

  const backgroundImage =
    mainLand && mainLand[activeSlide]?.photo ? mainLand[activeSlide].photo : hero;

  // Handle next and previous slide manually
  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <>
      <header
        id="الرئيسية"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        }}
      >
        <nav
          className={`${
            isFixed ? "fixed-header" : "section__container nav__container"
          }`}
        >
          <div className="nav__logo" data-aos="fade-down">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="nav__links" data-aos="fade-down">
            <li
              className={`link ${
                activeSection === "الرئيسية" ? "active-link-land" : ""
              }`}
              onClick={() => handleLinkClick("الرئيسية")}
            >
              <a href="#الرئيسية">الرئيسية</a>
            </li>
            <li
              className={`link ${
                activeSection === "تعرف_علينا" ? "active-link-land" : ""
              }`}
              onClick={() => handleLinkClick("تعرف_علينا")}
            >
              <a href="#تعرف علينا">تعرف علينا</a>
            </li>
            <li
              className={`link ${
                activeSection === "خدماتنا" ? "active-link-land" : ""
              }`}
              onClick={() => handleLinkClick("خدماتنا")}
            >
              <a href="#خدماتنا">خدماتنا</a>
            </li>
            <li
              className={`link ${
                activeSection === "اهتمامنا" ? "active-link-land" : ""
              }`}
              onClick={() => handleLinkClick("اهتمامنا")}
            >
              <a href="#اهتمامنا">اهتمامنا</a>
            </li>
            <li
              className={`link ${
                activeSection === "ما_يميزنا" ? "active-link-land" : ""
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
        <div className="section__container header__container section__container-mt-100">
          {isLoading && "تحميل..."}
          <Swiper
            ref={swiperRef} // Assign ref to Swiper instance
            spaceBetween={30}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000 }}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }}
          >
            {mainLand?.map((data) => (
              <SwiperSlide key={data?.id}>
                <div
                  className="header__content pr-[30px]"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <h1>{data?.name || ""}</h1>
                  <p>{data?.desc || ""}</p>
                  <a
                    className="btn"
                    href={`${
                      data?.buttonLink !== "w"
                        ? data?.buttonLink
                        : "https://wa.me/Gharam"
                    }`}
                    target="_blank"
                    data-aos="fade-up"
                    data-aos-delay="300"
                    rel="noreferrer"
                  >
                    {data?.buttonName || ""}
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className="swiper-button-prev text-white text-xl p-2 bg-[goldenrod] rounded-full absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
            onClick={handlePrev}
          >
          </button>
          <button
            className="swiper-button-next text-white text-xl p-2 bg-[goldenrod] rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
            onClick={handleNext}
          >
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;

import { FaFacebookF, FaInstagram, FaTimes, FaYoutube } from "react-icons/fa";
import logo from '../../assets/Img/logo.png'
const Drawer = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="overlay-drawer" onClick={onClose}></div>}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer__header">
        <div className="nav__logo" data-aos="fade-down">
            <img src={logo} alt="" />
          </div>
          <button className="drawer__close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <ul className="nav__links"  data-aos="fade-down">
            <li
              className={`link `}
            >
              <a href="#الرئيسية">الرئيسية</a>
            </li>
            <li
              className={`link }`}
            >
              <a href="#تعرف علينا">تعرف علينا</a>
            </li>
            <li
              className={`link `}
            >
              <a href="#خدماتنا">خدماتنا</a>
            </li>
            <li
              className={`link `}
            >
              <a href="#اهتمامنا">اهتمامنا</a>
            </li>
            <li
              className={`link `}
            >
              <a href="#ما_يميزنا">ما يميزنا</a>
            </li>
          </ul>
        <div className="drawer__socials">
        <a href="" target="_blank">
                <FaFacebookF />
              </a>
          <a href="" target="_blank">
                <FaInstagram />
              </a>
          <a
                href=""
                target="_blank"
              >
                <FaYoutube />
              </a>        </div>
      </div>
    </>
  );
};

export default Drawer;

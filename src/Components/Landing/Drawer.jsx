import { FaFacebookF, FaInstagram, FaTimes, FaYoutube } from "react-icons/fa";

const Drawer = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer__header">
          <div className="nav__logo">
            احمد <span>شاما </span>
          </div>
          <button className="drawer__close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <ul>
          <li className={`link`} onClick={onClose}>
            <a href="#الرئيسية">الرئيسية</a>
          </li>
          <li
            className={`link `}
            onClick={onClose}
          >
            <a href="#تعرف_علينا">تعرف علينا</a>
          </li>
          <li
            className={`link`}
            onClick={onClose}
          >
            <a href="#خدماتنا">خدماتنا</a>
          </li>
          <li
            className={`link `}
            onClick={onClose}
          >
            <a href="#اهتمامنا">اهتمامنا</a>
          </li>
          <li
            className={`link `}
            onClick={onClose}
          >
            <a href="#المواعيد">المواعيد</a>
          </li>
          <li
            className={`link `}
            onClick={onClose}
          >
            <a href="#للتواصل_والحجز">للتواصل والحجز</a>
          </li>
        </ul>
        <div className="drawer__socials">
        <a href="https://www.facebook.com/drahmedshamaa" target="_blank">
                <FaFacebookF />
              </a>
          <a href="https://www.instagram.com/drahmedshamaa" target="_blank">
                <FaInstagram />
              </a>
          <a
                href="https://www.youtube.com/@drAhmedshamaa
"
                target="_blank"
              >
                <FaYoutube />
              </a>        </div>
      </div>
    </>
  );
};

export default Drawer;

import {
    FaInstagram,
    FaFacebookF,
    FaHeart,
    FaTwitter,
    FaMapPin,
    FaEnvelope,
    FaPhone,
    FaYoutube,
    FaWhatsapp,
  } from "react-icons/fa";
  import logo from '../../assets/Img/logo.png'
  const Footer = () => {
    return (
      <footer className="footer">
        <div className="section__container footer__container">
          <div className="footer__col">
          <div className="nav__logo" data-aos="fade-down">
            <img src={logo} alt="" />
          </div>
          <h1>مرحبًا بكم في عالم الجمال والإبداع مع غرام سلطان</h1>
            <p>
             خبيرة المكياج المتميزة. 
            احصلي على إطلالة ساحرة ومذهلة في أتليه غرام، حيث يلتقي الفن والابتكار مع أحدث صيحات المكياج والأزياء.
            </p>
          </div>
          <div className="footer__col">
            <h4>معلومات عنا</h4>
            <li className={`link`}>
              <a href="#الرئيسية">الرئيسية</a>
            </li>
            <li className={`link `}>
              <a href="#تعرف_علينا">تعرف علينا</a>
            </li>
            <li className={`link`}>
              <a href="#خدماتنا">خدماتنا</a>
            </li>
            <li className={`link `}>
              <a href="#اهتمامنا">اهتمامنا</a>
            </li>
            <li className={`link `}>
              <a href="#ما_يميزنا">ما يميزنا</a>
            </li>
          </div>
          <div className="footer__col">
            <h4>العناوين</h4>
            <a href="https://bit.ly/4aGudvf" target="_blank" className="flex">
              <FaMapPin /> دسوق-شارع الجيش
            </a>
          </div>
          <div className="footer__col">
            <h4>اتصل بنا</h4>
            <p  className="flex items-center gap-2">
              <FaPhone /> 0109252712
            </p>
            <p  className="flex items-center gap-2">
              <FaWhatsapp /> 0472570908
            </p>
          </div>
        </div>
        <div className="footer__bar">
          <div className="footer__bar__content">
            <p>حقوق النشر © 2024 جميع الحقوق محفوظة.</p>
            <div className="footer__socials">
              {/* <span  className="flex">
                <a href="https://www.instagram.com/drahmedshamaa" target="_blank">
                  <FaInstagram />
                </a>
              </span> */}
              <span  className="flex">
                <a href="https://www.facebook.com/Roma.Hsn" target="_blank">
                  <FaFacebookF />
                </a>
              </span>
              {/* <span  className="flex">
                <a
                  href="https://www.youtube.com/@drAhmedshamaa
  "
                  target="_blank"
                >
                  <FaYoutube />
                </a>
              </span> */}
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
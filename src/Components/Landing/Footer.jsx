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
    FaTiktok,
  } from "react-icons/fa";
  import logo from '../../assets/Img/logo.png'
import { FaThreads } from "react-icons/fa6";
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
            احصلي على إطلالة ساحرة ومذهلة في مركز غرام، حيث يلتقي الفن والابتكار مع أحدث صيحات الميك اب و التصوير.
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
            <a href="https://www.google.com/maps/place/%D8%BA%D8%B1%D8%A7%D9%85+%D8%B3%D9%84%D8%B7%D8%A7%D9%86+%D8%A8%D9%8A%D9%88%D8%AA%D9%8A+%D8%B3%D9%86%D8%AA%D8%B1+%D9%88%D8%B3%D8%AA%D9%88%D8%AF%D9%8A%D9%88%D8%8C+%D8%B4%D8%A7%D8%B1%D8%B9+%D8%A7%D9%84%D8%AC%D9%8A%D8%B4%D8%8C+%D9%85%D8%AF%D9%8A%D9%86%D8%A9+%D8%AF%D8%B3%D9%88%D9%82%D8%8C+%D8%AF%D8%B3%D9%88%D9%82%D8%8C+%D9%83%D9%81%D8%B1+%D8%A7%D9%84%D8%B4%D9%8A%D8%AE%D8%8C%D8%8C+%D9%85%D8%B1%D9%83%D8%B2+%D8%AF%D8%B3%D9%88%D9%82%D8%8C+%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9+%D9%83%D9%81%D8%B1+%D8%A7%D9%84%D8%B4%D9%8A%D8%AE%E2%80%AD/data=!4m2!3m1!1s0x14f65b4cd1f4431f:0xe279af3e228b0fea?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESCjExLjEzNy4xMDMYACCenQoqYyw5NDIwNzQ4Myw5NDIxMjQ5Niw5NDIwNzM5NCw5NDIwNzUwNiw5NDIwODUwNiw5NDIxNzUyMyw5NDIxODY1Myw5NDIyOTgzMyw0NzA4NzExOCw0NzA4NDM5Myw5NDIxMzIwMEICRUc%3D" target="_blank" className="flex">
              <FaMapPin /> دسوق-شارع الجيش
            </a>
          </div>
          <div className="footer__col">
            <h4>اتصل بنا</h4>
            <p  className="flex items-center gap-2">
              <FaPhone /> 01092527126
            </p>
            <p  className="flex items-center gap-2">
              <FaPhone /> 0472570908
            </p>
            <p  className="flex items-center gap-2">
              <FaWhatsapp /> 01092527126
            </p>
            <p className="flex gap-2  justify-end flex-row-reverse">
            <a href="https://www.facebook.com/Gharam.ml" target="_blank" rel="noopener noreferrer">
                                <svg
                                    stroke="#3b5998"
                                    fill="#3b5998"
                                    strokeWidth="0"
                                    viewBox="0 0 320 512"
                                    height="1.4em"
                                    width="1.4em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/gharamsoltan/" target="_blank" rel="noopener noreferrer">
                                <svg
                                    stroke="#C13584"
                                    fill="#C13584"
                                    strokeWidth="0"
                                    viewBox="0 0 448 512"
                                    height="1.4em"
                                    width="1.4em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                                </svg>
                            </a>
                            <a href="https://www.threads.net/@gharamsoltan" target="_blank" rel="noopener noreferrer">
    <FaThreads color="#000000" size="24" /> 
</a>
<a href="https://www.tiktok.com/@gharamsoltan" target="_blank" rel="noopener noreferrer">
    <FaTiktok color="#000000" size="24" />
</a>
            </p>
          </div>
        </div>
        <div className="footer__bar">
          <div className="footer__bar__content">
          <p>حقوق النشر © 2024 جميع الحقوق محفوظة. تم الإنشاء بواسطة               
            <a href="https://www.facebook.com/profile.php?id=100089884247544" target="_blank" rel="noopener noreferrer">
           {" "} Coding Corner {" "}
                            </a>.</p>
          <div className="footer__socials">
              
            <a href="https://www.facebook.com/profile.php?id=100089884247544" target="_blank" rel="noopener noreferrer">
                                <svg
                                    stroke="#fff"
                                    fill="#fff"
                                    strokeWidth="0"
                                    viewBox="0 0 320 512"
                                    height="1.4em"
                                    width="1.4em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                                </svg>
                            </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'aos/dist/aos.css'; 
import Aos from 'aos';
import host from '../../host/Host';
import { MdOutlinePlayLesson } from 'react-icons/md';
import { Link } from 'react-router-dom';
import a from '../../assets/Img/bg1.jpg';

const SecServices = () => {
  const [services, setServices] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [expanded, setExpanded] = useState({}); // State for expanded chapters

  useEffect(() => {
    Aos.init({ duration: 1000 });
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${host}/api/superAdmin/land/show`);
        if (response.data.status && response.data.category.length > 0) {
          setServices(response.data.category);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsDataLoaded(true);
      }
    };

    fetchServices();
  }, []);

  if (!isDataLoaded) {
    return null; // or a loading spinner
  }

  const isDarkMode = false; // Replace with your logic for dark mode

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <section id="خدماتنا" className="section__container service__container">
      <div className="service__header" data-aos="fade-down">
        <div className="service__header__content">
          <h2 className="section__header">خدمتنا</h2>
          <p>بعض العروض المتاحة للحجز الآن</p>
        </div>
        <a className="btn-sec" href="https://wa.me/+201092527126" target="_blank" rel="noopener noreferrer" data-aos="fade-up" data-aos-delay="300">
          للتواصل عبر الواتساب
        </a>
      </div>
      <div className="service__grid">
        {services.map((e) => (
          <div className={`flex flex-col gap-8`} data-aos="fade-up" data-aos-delay={10 * e.id} key={e.id}>
            <div className={`relative w-full flex flex-col ${isDarkMode ? 'dark-mode' : 'bg-white'} shadow-lg rounded-lg overflow-hidden`}>
              <div className='relative md:max-w-64'>
                <img src={e.photo} alt={e.name} className={`w-full h-40 object-cover object-top`} />
              </div>
              <div className="p-4 pt-8 flex-grow">
                <p className="text-lg font-semibold mb-2">
                  <span className={`${isDarkMode ? 'text-text-dark' : 'text-text-light'} hover:text-primary-yellow duration-300`}>
                    {e.name}
                  </span>
                </p>
                <p className={`${isDarkMode ? 'text-text-dark' : 'text-text-light'} text-sm pb-4`}>
                  {expanded[e.id] ? e.desc : truncateText(e.desc, 60)}
                  {e.desc.length > 60 && (
                    <span
                      className="text-primary-yellow cursor-pointer"
                      onClick={() => toggleReadMore(e.id)}
                    >
                      {expanded[e.id] ? " قراءة أقل" : " قراءة المزيد"}
                    </span>
                  )}
                </p>
              </div>
              <div className={`flex flex-row items-center justify-between pt-2 mt-auto px-3 py-2 border-t`}>
                <Link
                  to={`/lesson/${e.id}`}
                  className={`flex items-center text-nowrap w-[200px] px-3 w-[fit-content] py-1 bg-primary-yellow rounded-3xl ${isDarkMode ? 'text-text-dark' : 'text-text-light'} hover:bg-[#edb904] duration-300`}
                >
                  <p className={`text-bold text-md flex ${isDarkMode ? 'text-text-dark' : 'text-text-light'} duration-300`}>
                    <span className={`flex-grow`}>
                      مشاهده الأن
                    </span>
                    <div className={`bg-white mr-3 w-[25px] h-[25px] flex justify-center items-center rounded-3xl`}>
                      {`${e?.price ? `${e?.price.toLocaleString('ar-EG')} جنيه` : ''}`} 
                    </div>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecServices;

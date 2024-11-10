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
  const [expanded, setExpanded] = useState({});

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


  return (
    <section id="خدماتنا" className="section__container service__container">
      <div className="service__header" data-aos="fade-down">
        <div className="service__header__content">
          <h2 className="section__header">خدمتنا</h2>
          <p>بعض العروض المتاحة للحجز الآن</p>
        </div>
        <a className="btn-sec" href="https://wa.me/Gharam" target="_blank" rel="noopener noreferrer" data-aos="fade-up" data-aos-delay="300">
          للتواصل عبر الواتساب
        </a>
      </div>
      <div className="service__grid">
        {services.map((e) => (
          <div className={`flex flex-col gap-8`} data-aos="fade-up" data-aos-delay={10 * e.id} key={e.id}>
            <div className={`relative w-full flex flex-col ${isDarkMode ? 'dark-mode' : 'bg-white'} shadow-lg rounded-lg overflow-hidden`}>
              <div className='relative'>
                <img src={e.photo} alt={e.name} className={`w-full h-[260px] object-cover object-center`} />
              </div>
              <div className="p-4 pt-8 flex-grow">
                <p className="text-xl font-semibold mb-2">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {e.name}
              </h3>
                </p>
                <p className={`${isDarkMode ? 'text-text-dark' : 'text-text-light'} text-md pb-4`}>
                    <span
                      className="text-gray-600"
                    >
                      {e?.desc}
                    </span>
                </p>
              </div>
              <div className={`bg-[goldenrod] rounded-full w-[50px] mx-3 h-[50px] absolute top-[235px] text-lg text-white font-bold flex justify-center items-center`}>
                  {`${e?.price ? `${e?.price.toLocaleString('ar-EG')}` : ''}`} 
              </div>
              <div className={`flex flex-row items-center justify-between pt-2 mt-auto px-3 py-2 border-t`}>
              <a className="btn w-full text-center" href="https://wa.me/Gharam" target="_blank">
              تواصل معنا
            </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecServices;

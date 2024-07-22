import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'aos/dist/aos.css'; 
import Aos from 'aos';
import host from '../../host/Host';

const SecServices = () => {
  const [services, setServices] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1000 });
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${host}/api/superAdmin/land/show`);
        if (response.data.status && response.data.category.length > 0) {
          setServices(response.data.category);
        }
        setIsDataLoaded(true); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsDataLoaded(true);
      }
    };

    fetchServices();
  }, []);

  if (!isDataLoaded || services.length === 0) {
    return null;
  }

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
          <div className="service__card" data-aos="fade-up" data-aos-delay={10 * e.id} key={e.id}>
            <div className="image">
              <img src={e.photo} alt={e.name} />
            </div>
            <h4 className='text-start'>{e.name}</h4>
            <p className='text-start'>{e.desc}</p>
            <p className='text-start flex items-baseline gap-4'> <h4>السعر : </h4>{`${e?.price ? `${e?.price.toLocaleString('ar-EG')} جنيه` : ''}`}</p>
            <a className="btn" href="https://wa.me/+201092527126" target="_blank" rel="noopener noreferrer" data-aos="fade-up" data-aos-delay="300">
              تواصل معنا
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecServices;

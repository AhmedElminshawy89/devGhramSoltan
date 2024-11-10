  import React, { useEffect } from 'react';
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import img from '../../assets/Img/about.jpg';
  
  const Banner = () => {
    useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);
    return (
      <div className="md:px-12 p-4 max-w-screen-2xl mx-auto mt-24">
        <div
          className="rounded-xl rounded-br-[100px] px-4 py-9"
          style={{
            background: 'linear-gradient(45deg, rgba(218, 165, 32, 0.5), rgba(218, 165, 32))',
          }}
        >
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-10">
            <div data-aos="fade-down" data-aos-delay={100} style={{ opacity: 1, transform: 'none' }}>
              <img src={img} alt="" className="lg:h-[360px]" />
            </div>
            <div className="md:w-3/5" data-aos="fade-up" data-aos-delay={200} style={{ opacity: 1, transform: 'none' }}>
              <h2 className="md:text-7xl text-4xl font-bold text-white mb-6 leading-relaxed">
                لماذا تختارين غرام سلطان؟
              </h2>
              <p className="text-gray-700 text-2xl mb-6">
                خبرة واحترافية: سنوات من الخبرة في مجال التجميل تضمن لكِ نتائج مبهرة.
                منتجات عالية الجودة: نستخدم أفضل المنتجات العالمية لضمان سلامة بشرتكِ وجمالها.
                اهتمام بالتفاصيل: نحرص على تقديم تجربة مريحة وممتعة، مع التركيز على أدق التفاصيل لتحقيق إطلالة مثالية.
                كما ان سنتر غرام سلطان حاصل على البورد الامريكي و هي شهادة معتمدة دوليا.
              </p>
              <div className="space-x-6 space-y-4">
                <a className="btn-banner" href="https://wa.me/Gharam">للتواصل معنا</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Banner;

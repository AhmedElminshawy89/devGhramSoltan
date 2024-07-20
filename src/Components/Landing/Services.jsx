

import img from "../../assets/Img/bg1.jpg";
import img2 from "../../assets/Img/bg1.jpg";
import img3 from "../../assets/Img/bg1.jpg";
import img4 from "../../assets/Img/bg1.jpg";
import img5 from "../../assets/Img/bg1.jpg";
import img6 from "../../assets/Img/bg1.jpg";
import img7 from "../../assets/Img/bg1.jpg";
import img8 from "../../assets/Img/bg1.jpg";
import img9 from "../../assets/Img/bg1.jpg";

const SecServices = () => {
    const services = [
        {
          img: img,
          title: 'مكياج الزفاف',
          description: 'جلسة مكياج كاملة باستخدام أحدث تقنيات المكياج للحصول على إطلالة ساحرة في يوم زفافك.',
          price: '2000 جنيه'
        },
        {
          img: img,
          title: 'تسريحة الشعر',
          description: 'تسريحة شعر مميزة تناسب فستان الزفاف وتكمل إطلالتك المثالية.',
          price: '1500 جنيه'
        },
        {
          img: img,
          title: 'العناية بالبشرة',
          description: 'جلسة عناية بالبشرة لتحضيرها قبل يوم الزفاف وضمان بشرة نضرة ومشرقة.',
          price: '1000 جنيه'
        },
        {
          img: img,
          title: 'جلسة تجميل',
          description: 'جلسة تجميل متكاملة تشمل المكياج وتصفيف الشعر والعناية بالبشرة.',
          price: '3000 جنيه'
        },
        {
          img: img,
          title: 'جلسة تصوير',
          description: 'جلسة تصوير احترافية لإبراز جمالك وتألقك في يوم زفافك.',
          price: '2500 جنيه'
        }
      ];
  return (
    <section id="خدماتنا" className="section__container service__container">
      <div className="service__header" data-aos="fade-down" >
        <div className="service__header__content">
          <h2 className="section__header">خدمتنا</h2>
          <p>
  خبيرة المكياج المتميزة. 
  احصلي على إطلالة ساحرة ومذهلة في أتليه غرام، حيث يلتقي الفن والابتكار مع أحدث صيحات المكياج والأزياء.
</p>

        </div>
        <a className="btn-sec" href="https://wa.me/+20109252712" target="_blank" data-aos="fade-up" data-aos-delay="300">
              تواصل عبر الواتساب
            </a>
      </div>
      <div className="service__grid">
        {services.map((e)=>(
        <div className="service__card" data-aos="fade-up" data-aos-delay="100">
          <div className="image">
            <img src={e.img} alt="" />
          </div>
          <h4>{e.title}</h4>
          <p>
            {e.description}
          </p>
          <a className="btn" href="https://wa.me/+20109252712" target="_blank" data-aos="fade-up" data-aos-delay="300">
              تواصل معنا
            </a></div>
        ))}
      </div>
    </section>
  );
};

export default SecServices;

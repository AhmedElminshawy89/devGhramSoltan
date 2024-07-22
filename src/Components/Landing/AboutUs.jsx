import about from '../../assets/Img/about.jpg';


const AboutUS = () => {

  return (
    <section className="section__container about__container" id="تعرف_علينا">
<div className="about__content" data-aos="fade-left" data-aos-delay="400">
  <h2 className="section__header">معلومات عنا</h2>
  <ul>
  <li>
  نقدم خدمات متخصصة في عالم الجمال والإبداع، حيث نقدم أحدث صيحات المكياج والتصوير .
  </li>
  <li>
  ضمن لك الحصول على إطلالة ساحرة ومذهلة بفضل خبرتنا في فن المكياج، واستخدامنا لأفضل المنتجات والتقنيات الحديثة.
  </li>
  <li>
  خدماتنا تشمل جميع جوانب الجمال، بما في ذلك المكياج للمناسبات الخاصة، العناية بالبشرة والشعر .
  </li>
  </ul>
</div>

      <div className="about__image" data-aos="fade-right" data-aos-delay="400">
        <img src={about} alt="معلومات عنا" />
      </div>
    </section>
  );
};

export default AboutUS;

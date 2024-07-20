import React from 'react';
import img from '../../assets/Img/bg1.jpg'
const FeaturesSection = () => {
    return (
        <section className="section__container contact-us features" id="ما_يميزنا">
        <div className="service__header__content">
          <h2 className="section__header">ما يميزنا</h2>

        </div>            <div  style={{display:'flex',justifyContent:'center'}}>
            <div className="container">
                <div className="box quality">
                    <div className="img-holder">
                        <img src={img} alt="" />
                    </div>
                    <h2>الجوده</h2>
                    <p>وصف</p>
                    <a className="btn-sec" href="https://wa.me/+20109252712" target="_blank" data-aos="fade-up" data-aos-delay="300">
              تواصل معنا
            </a>                   </div>
                <div className="box time">
                    <div className="img-holder">
                        <img src={img} alt="" />
                    </div>
                    <h2>الوقت</h2>
<p>وصف</p>                    <a className="btn-sec" href="https://wa.me/+20109252712" target="_blank" data-aos="fade-up" data-aos-delay="300">
              تواصل معنا
            </a>                </div>
                <div className="box passion">
                    <div className="img-holder">
                        <img src={img} alt="" />
                    </div>
                    <h2>الخبره</h2>
                    <p>وصف</p>
                    <a className="btn-sec" href="https://wa.me/+20109252712" target="_blank" data-aos="fade-up" data-aos-delay="300">
              تواصل معنا
            </a>                  </div>
            </div>
            </div>
        </section>
    );
};

export default FeaturesSection;

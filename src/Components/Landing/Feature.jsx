import React from 'react';
import img2 from '../../assets/Img/t.jpg'
import { useGetAdvantageLandUserQuery } from '../../app/Feature/API/Land';
const FeaturesSection = () => {
    const {data:FeaturesSectionData , isLoading , isError} = useGetAdvantageLandUserQuery()
    return (
        <section className="section__container  features" id="ما_يميزنا">
        <div className="service__header__content">
          <h2 className="section__header">ما يميزنا</h2>

        </div>
        <div  style={{display:'flex',justifyContent:'center'}}>
            <div className="container">
            {FeaturesSectionData?.map((data,idx)=>(
                <div className="box time" key={idx}>
                            <div className="img-holder">
                                <img src={data?.photo} alt="" />
                            </div>
                            <h2>{data?.name }</h2>
        <p>{data?.desc}</p>           
        <a className="btn-sec" href="https://wa.me/Gharam" target="_blank" data-aos="fade-up" data-aos-delay="300">
                    تواصل معنا
                    </a>                
                </div>
            ))}




                {/* <div className="box quality">
                    <div className="img-holder">
                        <img src={img3} alt="" />
                    </div>
                    <h2>الجوده</h2>
                    <p>احترافية عالية: تقديم خدمات تجميل وتصوير بمستوى احترافي يضمن رضا العملاء.
استخدام منتجات عالية الجودة: الاعتماد على أفضل المنتجات والأدوات لضمان نتائج متميزة.
الاهتمام بالتفاصيل: التركيز على أدق التفاصيل لتحقيق مظهر مثالي.
التحديث المستمر: متابعة أحدث التقنيات والاتجاهات في مجالي التجميل والتصوير.
تجربة عملاء ممتازة: توفير تجربة مريحة وممتعة للعملاء من البداية إلى النهاية</p>
                    <a className="btn-sec" href="https://wa.me/+201092527126" target="_blank" data-aos="fade-up" data-aos-delay="300">
              تواصل معنا
            </a>                   </div>
             */}
                {/* <div className="box time">
                    <div className="img-holder">
                        <img src={img2} alt="" />
                    </div>
                    <h2>الوقت</h2>
<p>الالتزام بالمواعيد: تقديم الخدمات في الوقت المحدد دون تأخير.
المرونة في الجدولة: القدرة على التكيف مع جداول العملاء المختلفة.
السرعة والكفاءة: إنجاز العمل بسرعة مع الحفاظ على الجودة العالية.
الاستجابة السريعة: الرد على استفسارات العملاء وحجوزاتهم بسرعة.
إدارة الوقت بفعالية: تنظيم الوقت بشكل يضمن تقديم أفضل خدمة ممكنة.</p>                    <a className="btn-sec" href="https://wa.me/+201092527126" target="_blank" data-aos="fade-up" data-aos-delay="300">
              تواصل معنا
            </a>                </div> */}
                {/* <div className="box passion">
                    <div className="img-holder">
                        <img src={img} alt="" />
                    </div>
                    <h2>الخبره</h2>
                    <p>منذ عام 2017، نمتلك خبرة واسعة في مجال التجميل، مع شهادات معتمدة تعكس احترافيتنا. لقد واجهنا العديد من التحديات والضغوطات التي ساهمت في تعزيز خبرتنا وقدرتنا على التعامل مع مشكلات كل عميل بشكل فردي وفعال.</p>
                    <a className="btn-sec" href="https://wa.me/+201092527126" target="_blank" data-aos="fade-up" data-aos-delay="300">
              تواصل معنا
            </a>                  
            </div> */}
            </div>
            </div>
        </section>
    );
};

export default FeaturesSection;

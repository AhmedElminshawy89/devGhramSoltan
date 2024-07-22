import React, { useState } from 'react';
import { FaInstagram, FaPhoneAlt, FaWhatsapp, FaFacebookMessenger, FaYoutube, FaTiktok } from "react-icons/fa";
import { RiContactsBookUploadFill, RiCloseFill } from "react-icons/ri";
import { MdConnectWithoutContact } from "react-icons/md";
import { FaThreads } from 'react-icons/fa6';

const ContactPhone = () => {
  const [showContacts, setShowContacts] = useState(false);

  const toggleContacts = () => {
    setShowContacts(!showContacts);
  };

  return (
    <>
      <div className={`contact-btn-wrapper ${showContacts ? 'close' : ''}`} onClick={toggleContacts}>
        {showContacts ? <RiCloseFill /> : <MdConnectWithoutContact />}
      </div>
      <div className={`contact-list ${showContacts ? 'show' : ''}`}>
        <div className="phone">
          <a href="tel:012018182726" target="_blank" rel="noreferrer">
            <FaPhoneAlt />
          </a>
        </div>
        <div className="whatsapp">
          <a href="https://wa.me/+201092527126" target="_blank" rel="noreferrer">
            <FaWhatsapp />
          </a>
        </div>
        
        <div className="instagram">
          <a href="https://www.instagram.com/gharamsoltan/" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
        </div>
        <div className="messenger">
          <a href="https://m.me/Roma.Hsn" target="_blank" rel="noreferrer">
            <FaFacebookMessenger />
          </a>
        </div>
        <div className="youtube">
        <a href="https://www.threads.net/@gharamsoltan" target="_blank" rel="noopener noreferrer">
    <FaThreads color="#fff" size="24" /> 
</a>
        </div>
        <div className="tik-tok">
        <a href="https://www.tiktok.com/@gharamsoltan" target="_blank" rel="noopener noreferrer">
    <FaTiktok color="#fff" size="24" />
</a>
        </div>
      </div>
      <style jsx>{`
        .contact-btn-wrapper {
          position: fixed;
          right: 5px;
          bottom: 70px;
          background: goldenrod;
          width: 46px;
          height: 46px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ffffff;
          font-size: 34px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 555;
          transition: transform 0.3s ease-in-out;
        }
        .contact-btn-wrapper.close {
          transform: rotate(90deg);
        }
        .contact-list {
          position: fixed;
          right: 5px;
          bottom: 130px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        }
        .contact-list.show {
          transform: translateY(0);
          opacity: 1;
        }
        .phone, .whatsapp, .instagram, .messenger, .youtube ,.tik-tok {
          background: goldenrod;
          width: 46px;
          height: 46px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ffffff;
          font-size: 25px;
          border-radius: 50%;
          cursor: pointer;
          padding-top:0px
        }
        .whatsapp {
          background-color: #25D366;
        }
        .instagram {
          background: linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
        }
        .messenger {
          background-color: #0078FF;
        }
        .youtube {
          background-color: #000;
        }
                  .tik-tok {
          background-color: #000;
        }
      `}</style>
    </>
  );
};

export default ContactPhone;

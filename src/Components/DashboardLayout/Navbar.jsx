import React, { useCallback,useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../app/Feature/TabSlice';
import logo from '../../assets/Img/coding.jpg'
import { FaPhone } from 'react-icons/fa6';
import { SlSizeFullscreen } from "react-icons/sl";
import { AiOutlineFullscreenExit } from "react-icons/ai";


const Navbar = React.memo(() => {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const dispatch = useDispatch();
  const [fullscreen,setFullScreen] = useState(false)
  const handleTabChange = useCallback(() => {
    dispatch(setActiveTab(!activeTab));
  }, [dispatch, activeTab]);

  function toggleFullScreen() {
    if (!document.fullscreenElement &&   
        !document.webkitFullscreenElement && 
        !document.mozFullScreenElement && 
        !document.msFullscreenElement) { 
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { 
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.msRequestFullscreen) { 
        document.documentElement.msRequestFullscreen();
      }
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) { 
        document.msExitFullscreen();
      }
      setFullScreen(false);
    }
  }
  

  return (
    <div className="navbar-layout flex items-center justify-between">
      <div className="flex items-center justify-center gap-5">
          <div className="bar-sidebar" onClick={handleTabChange}>
            <FaBars />
          </div>
          <div className="bar-sidebar" onClick={toggleFullScreen}>
            {AiOutlineFullscreenExit?<SlSizeFullscreen/>:<AiOutlineFullscreenExit/>}
          </div>
      </div>
      <div >
        <a href="https://www.facebook.com/profile.php?id=100089884247544"
        style={{color:'#000',fontWeight:'bold'}} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2  flex-row-reverse'>
        <img src={logo} alt='' style={{
              width:'30px',
              height: '30px',
              borderRadius: '50px',
              objectFit: 'cover',
              objectPosition: 'center'
        }}/>
           <p>{" "} Coding Corner {" "}</p>
        </a>
        <div className='flex gap-2'>
        <p style={{fontWeight:'700'}}>
         01286552467 -
        </p>
        <p style={{fontWeight:'700'}}>
        01002337574
        </p>
          <p className='mt-1'><FaPhone/></p>
        </div>
      </div>
    </div>
  );
});

export default Navbar;

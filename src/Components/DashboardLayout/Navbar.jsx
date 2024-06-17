import React, { useCallback } from 'react';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../app/Feature/TabSlice';

const Navbar = React.memo(() => {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const dispatch = useDispatch();

  const handleTabChange = useCallback(() => {
    dispatch(setActiveTab(!activeTab));
  }, [dispatch, activeTab]);

  return (
    <div className="navbar-layout">
      <div className="bar-sidebar" onClick={handleTabChange}>
        <FaBars />
      </div>
    </div>
  );
});

export default Navbar;

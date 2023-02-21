import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const Layout = ({
  children,
  setNavToggle,
  navToggle,
  navHandler,
  searchToggleHandler,
}) => {
  return (
    <>
      <Header
        setNavToggle={setNavToggle}
        navToggle={navToggle}
        navHandler={navHandler}
        searchToggleHandler={searchToggleHandler}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

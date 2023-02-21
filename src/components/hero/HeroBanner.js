import React from 'react';
import styles from './HeroBanner.module.css';
import heroImg from '../../assets/HeroImg.jpg';
import blogLogo from '../../assets/BlogLogo.png';

const HeroBanner = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.imgContainer}>
        <img src={heroImg} alt='hero' className={styles.heroImg} />
        <div className={styles.logoContainer}>
          <img src={blogLogo} alt='logo' className={styles.heroImg} />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

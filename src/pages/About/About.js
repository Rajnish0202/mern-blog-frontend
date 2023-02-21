import React from 'react';
import styles from './About.module.css';

const About = () => {
  const visitGitHub = () => {
    window.location = 'https://github.com/Rajnish0202';
  };
  return (
    <div className={styles.aboutSection}>
      <div></div>
      <div className={styles.aboutSectionGradient}></div>
      <div className={styles.aboutSectionContainer}>
        <h1>About Us</h1>
        <div>
          <div>
            <img
              style={{ width: '10vmax', height: '10vmax', margin: '2vmax 0' }}
              src='https://res.cloudinary.com/dukdn1bpp/image/upload/v1675181620/y5cs6zkclqnkgrqs48yh.jpg'
              alt='Founder'
            />
            <p>Rajnish Kumar</p>
            <button onClick={visitGitHub}>Visit GitHub</button>
            <span>
              This is a sample wesbite made by @rajnishkumar. Only with the
              purpose to learn MERN Stack.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

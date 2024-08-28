import React, { useEffect, useState } from 'react';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const scrollToTopButton = document.getElementById('scrollToTopButton');

    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    window.addEventListener('scroll', handleScroll);

    if (scrollToTopButton) {
      scrollToTopButton.addEventListener('click', handleScrollToTop);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollToTopButton) {
        scrollToTopButton.removeEventListener('click', handleScrollToTop);
      }
    };
  }, []);

  return (
    <div
      id="scrollToTopButton"
      className="scroll-to-top scroll-to-target"
      data-target="html"
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <span className="flaticon-up-arrow"></span>
    </div>
  );
}

export default ScrollToTop;

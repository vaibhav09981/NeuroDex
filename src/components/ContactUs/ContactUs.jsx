import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactUs.css';

gsap.registerPlugin(ScrollTrigger);

function ContactUs() {
  const contactInfoRef = useRef(null);

  useEffect(() => {
    const contactItems = contactInfoRef.current.querySelectorAll('.contactItem');
    
    gsap.fromTo(contactItems, 
      { y: 100, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2, 
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: "top 80%"
        }
      }
    );
  }, []);

  return (
    <div className="contactContainer">
      <h1 className="contactHeading">Get In Touch</h1>
      <div className="contactContent">
        <div className="contactInfo" ref={contactInfoRef}>
          <div className="contactItem">
            <div className="contactIcon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="contactDetail">
              <h3>Email</h3>
              <p>pandeykunal2084@gmail.com</p>
            </div>
          </div>
          
          <div className="contactItem">
            <div className="contactIcon">
              <i className="fab fa-linkedin"></i>
            </div>
            <div className="contactDetail">
              <h3>LinkedIn</h3>
              <a href="https://linkedin.com/in/kunalpandey2084" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/kunalpandey2084
              </a>
            </div>
          </div>
          
          <div className="contactItem">
            <div className="contactIcon">
              <i className="fab fa-github"></i>
            </div>
            <div className="contactDetail">
              <h3>GitHub</h3>
              <a href="https://github.com/KunalPandey-675" target="_blank" rel="noopener noreferrer">
                github.com/KunalPandey-675
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
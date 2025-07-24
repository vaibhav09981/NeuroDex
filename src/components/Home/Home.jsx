import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ToolCard from '../ToolsCard/ToolCard'
import './home.css'
import { TOOLS_DATA } from '../../data/toolsData'
// import bgVideo from '../../assets/Videos/bg.mp4'

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const navigate = useNavigate();
  const heroRef = useRef();
  const tagRef = useRef();
  const herotext = useRef();
  const aboutheadRef = useRef();
  const abouttextRef = useRef();
  const toolsContainerRef = useRef();

  const [showPopup, setShowPopup] = useState(false);

  const navigateToTool = (toolName) => {
    if (toolName.toLowerCase() === 'todo app') {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
      return;
    }
    
    // Simplified route generation
    const toolRoute = toolName.toLowerCase().replace(/\s+/g, '');
    navigate(`/tools/${toolRoute}`);
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(heroRef.current, {
      y: -100,
      delay: 2,
      opacity: 0,
    }).from(tagRef.current, {
      y: 100,
      opacity: 0,
      stagger: 1,
    });

    gsap.to(herotext.current, {
      scale: 2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".hero",
        start: "top 20%",
        end: "bottom 20%",
        scrub: 1,
      }
    });

    gsap.from(aboutheadRef.current, {
      y: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: ".about",
        start: "-20% 90%",
        end: "10% 80%",
        scrub: 1,
      }
    });
    gsap.from(abouttextRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: ".about",
        start: "-10% 90%",
        end: "10% 70%",
        scrub: 1,
      }
    });

    gsap.from(".hometoolsContainer > *", {
      x: 300,
      opacity: 0,
      stagger: 0.5,
      duration: 3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hometoolsContainer",
        start: "top 85%",
        end: "top 60%",
        scrub: 2,
      }
    });
  });

  return (
    <div className="heroPage">
      {showPopup && (
        <div className="popup">
          Coming Soon!
        </div>
      )}
      <div className='hero'>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="heroVideo"
          onError={(e) => console.error('Video playback error:', e)}
        >
          <source src="/assets/Videos/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="vidOverlay" />
        <div ref={herotext} className="herotext">
          <div className="dexhead">
            <h1 ref={heroRef}>DigitalDex <img className='heroImg' src="/assets/Images/gear1.png" alt="gear icon" /></h1>
          </div>
          <p ref={tagRef}>Your All-In-One hub for Everyday Tools</p>
        </div>
      </div>

      <div className="about">
        <h2 ref={aboutheadRef}>What Is DigitalDex?</h2>
        <p ref={abouttextRef}>DigitalDex is a versatile web application that brings together a wide range of essential digital tools in one unified platform. From checking the weather, searching for images, and converting currencies to performing quick calculations, generating secure passwords, and managing tasks with a to-do list, DigitalDex simplifies everyday digital interactions. Designed with a clean and intuitive interface, the platform ensures seamless usability across devices. With plans to expand its toolset and integrate real-time data capabilities, DigitalDex aims to be the go-to hub for productivity, efficiency, and convenience in the digital space.</p>
      </div>

      <div className="tools">
        <h2>Tools</h2>
        <div className="hometoolsContainer" ref={toolsContainerRef}>
          {TOOLS_DATA.slice(0, 3).map(tool => (
            <ToolCard
              key={tool.id}
              logo={tool.logo}
              toolName={tool.name}
              toolDesc={tool.description}
              onClick={() => navigateToTool(tool.name)}
            />
          ))}
        </div>
        <div className="loadMore">
          <Link to="/tools">
            <button className="load">View More</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home
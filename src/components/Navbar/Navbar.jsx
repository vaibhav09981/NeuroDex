import React, { useRef, useState } from 'react'
import './navbar.css'
import { NavLink } from "react-router-dom";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import cross from '/assets/Images/cross.svg'
import ham from '/assets/Images/ham.svg'

function Navbar() {
  const navRef = useRef()
  const logoRef = useRef()
  const sidebarRef = useRef()

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      ease: "power2.out"
    })
      .from([logoRef.current, ".nav-item"], {
        y: 30,
        delay: 0.5,
        opacity: 0,
        stagger: 0.3,
        ease: "back.out(1.2)"
      })
  })

  const openSidebar = () => {
    gsap.to(sidebarRef.current, {
      left: 0,
      duration: 0.5,
      ease: "power2.out"
    })
  }

  const closeSidebar = () => {
    gsap.to(sidebarRef.current, {
      left: "-100%",
      duration: 0.5,
      ease: "power2.out"
    })
  }

  return (
    <>
      <nav className='sidebar' ref={sidebarRef}>
        <div className="hamLogo">
          <h1 ref={logoRef}>DigitalDex</h1>
          <img src={cross} alt="" onClick={closeSidebar} style={{ cursor: 'pointer' }} />
        </div>
        <div className="hamLinks">
          <ul>
            <li className="nav-item">
              <NavLink to="/" onClick={closeSidebar} className="links">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/tools" onClick={closeSidebar} className="links">Tools</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contactus" onClick={closeSidebar} className="links">ContactUs</NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <nav ref={navRef} className='navbar'>
        <div className="navleft">
          <h1 ref={logoRef}>DigitalDex</h1>
        </div>

        <div className="navright">
          <ul>
            <li className="nav-item">
              <NavLink to="/" className="links">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/tools" className="links">Tools</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contactus" className="links">ContactUs</NavLink>
            </li>
          </ul>
        </div>
        <div className="ham">
          <img src={ham} alt="" onClick={openSidebar} style={{ cursor: 'pointer' }} />
        </div>
      </nav>
    </>
  )
}

export default Navbar
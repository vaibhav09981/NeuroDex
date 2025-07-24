import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './toolCard.css'

const ToolCard = ({
    logo,
    toolName = "Tool",
    toolDesc = "desc",
    onClick,
}) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;

        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        return () => {
            card.removeEventListener('mouseenter', () => {});
            card.removeEventListener('mouseleave', () => {});
        };
    }, []);

    return (
        <div className="toolDiv">
            <div className="toolCard" ref={cardRef} onClick={onClick}>
                <div className="toolImage">
                    <img src={logo} alt="tool icon" />
                </div>
                <div className="toolInfo">
                    <h3>{toolName}</h3>
                    <p>{toolDesc}</p>
                </div>
            </div>
        </div>
    )
}

export default ToolCard